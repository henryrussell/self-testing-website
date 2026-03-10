// src/app/api/workflowStatus/[runId]/route.ts
import { NextRequest, NextResponse } from 'next/server';

function isValidRunId(runId: string | undefined): boolean {
  return !!runId && /^\d+$/.test(runId);
}

export async function GET(req: NextRequest) {

    const url = new URL(req.url); // Parse request URL
    const runId = url.pathname.split("/").pop();

    // Input validation
    if (!isValidRunId(runId)) {
      return NextResponse.json({ error: 'Invalid run ID format' }, { status: 400 });
    }
    const githubToken = process.env.GITHUB_TOKEN;
    const owner = 'henryrussell'; // Replace with your GitHub username
    const repo = 'self-testing-website'; // Replace with your repository name

    try {
        const response = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/actions/runs/${runId}`,
            {
                headers: {
                Authorization: `Bearer ${githubToken}`,
                },
            }
        );

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch workflow status' }, { status: response.status });
    }

    const data = await response.json();

    return NextResponse.json({
        status: data.status,
        conclusion: data.conclusion,
        created_at: data.created_at,
        updated_at: data.updated_at
    });

    } catch (error) {
        // Log error but don't expose details to client
        console.error('Workflow status fetch error:', error);
        return NextResponse.json({ error: "Failed to fetch workflow status" }, { status: 500 });
    }
}
