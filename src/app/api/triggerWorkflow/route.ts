// src/app/api/triggerWorkflow/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Rate limiting: simple in-memory store (use Redis in production)
const requestCounts: Record<string, { count: number; resetTime: number }> = {};

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = requestCounts[ip];

  if (!limit || now > limit.resetTime) {
    requestCounts[ip] = { count: 1, resetTime: now + 60 * 1000 }; // 60 second window
    return true;
  }

  if (limit.count >= 5) { // Max 5 requests per minute
    return false;
  }

  limit.count++;
  return true;
}

// CSRF token validation
function isValidCSRFToken(token: string | null): boolean {
  // In production, validate against stored CSRF tokens in session
  // This is a simplified check - implement proper CSRF protection
  return !!token && token.length > 0;
}

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  // CSRF validation
  const csrfToken = req.headers.get('x-csrf-token');
  if (!isValidCSRFToken(csrfToken)) {
    return NextResponse.json({ error: 'CSRF token invalid or missing' }, { status: 403 });
  }

  const githubToken = process.env.GITHUB_TOKEN;
  const workflowId = 'mainTests.yml';
  const owner = 'henryrussell';
  const repo = 'self-testing-website';

  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflowId}/dispatches`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ref: 'main' }),
    });

    if (response.ok) {
      const runsResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflowId}/runs`, {
        headers: {
          'Authorization': `Bearer ${githubToken}`,
        },
      });

      if (runsResponse.ok) {
        const runsData = await runsResponse.json();
        const runId = runsData.workflow_runs[0]?.id;

        if (runId) {
          return NextResponse.json({ message: 'Workflow triggered successfully', run_id: runId }, { status: 200 });
        } else {
          return NextResponse.json({ error: { message: 'Failed to retrieve run ID' } }, { status: 500 });
        }
      } else {
        const runsError = await runsResponse.json();
        return NextResponse.json({ error: runsError }, { status: runsResponse.status });
      }
    } else {
      const error = await response.json();
      return NextResponse.json({ error: error }, { status: response.status });
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: { message: error.message } }, { status: 500 });
    } else {
      return NextResponse.json({ error: { message: "an unknown error occurred" } }, { status: 500 });
    }
  }
}
