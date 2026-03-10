// src/app/api/workflowLogs/[runId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import pako from "pako";

function isValidRunId(runId: string | undefined): boolean {
  return !!runId && /^\d+$/.test(runId);
}

// Sanitize logs to redact sensitive information
function sanitizeLogs(logsText: string): string {
  return logsText
    // Redact GitHub tokens (ghp_*)
    .replace(/ghp_[A-Za-z0-9_]+/g, '[REDACTED_GITHUB_TOKEN]')
    // Redact NPM tokens
    .replace(/npm_[A-Za-z0-9_]+/g, '[REDACTED_NPM_TOKEN]')
    // Redact generic API keys
    .replace(/api[_-]?key[:\s=]+[^\s\n]+/gi, 'api_key=[REDACTED]')
    // Redact passwords
    .replace(/password[:\s=]+[^\s\n]+/gi, 'password=[REDACTED]')
    // Redact database URLs with credentials
    .replace(/postgres:\/\/[^@]+@[^\s]+/g, 'postgres://[REDACTED]@[HOST]')
    // Redact MongoDB connection strings
    .replace(/mongodb\+srv:\/\/[^@]+@[^\s]+/g, 'mongodb+srv://[REDACTED]@[HOST]');
}

export async function GET(req: NextRequest) {
  
  const githubToken = process.env.GITHUB_TOKEN;
  const url = new URL(req.url); // Parse request URL
  const runId = url.pathname.split("/").pop();

  // Input validation
  if (!isValidRunId(runId)) {
    return NextResponse.json({ error: 'Invalid run ID format' }, { status: 400 });
  }
  const owner = 'henryrussell'; // Replace with your GitHub username
  const repo = 'self-testing-website'; // Replace with your repository name

  try {
    console.log(`Fetching logs for runId: ${runId}`); // Debugging

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/actions/runs/${runId}/logs`,
      {
        headers: {
          Authorization: `Bearer ${githubToken}`,
        },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch logs:", response.status, response.statusText);
      return NextResponse.json(
        { error: `Failed to fetch workflow logs: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }

    const compressedLogs = await response.arrayBuffer();

    try {
      const decompressedLogs = new TextDecoder().decode(pako.inflate(new Uint8Array(compressedLogs)));
      const sanitizedLogs = sanitizeLogs(decompressedLogs);
      console.log("Logs decompressed and sanitized successfully");
      return NextResponse.json({ logs: sanitizedLogs });
    } catch (pakoError) {
      console.error("Logs decompression error:", pakoError);
      return NextResponse.json({ error: "Failed to decompress logs" }, { status: 500 });
    }
  } catch (error) {
    console.error("Workflow logs fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch workflow logs" }, { status: 500 });
  }
}
