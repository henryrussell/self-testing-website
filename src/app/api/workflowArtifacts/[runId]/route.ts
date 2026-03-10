import { NextRequest, NextResponse } from 'next/server';

function isValidRunId(runId: string | undefined): boolean {
  return !!runId && /^\d+$/.test(runId);
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const runId = url.pathname.split("/").pop();

  // Input validation
  if (!isValidRunId(runId)) {
    return NextResponse.json({ error: 'Invalid run ID format' }, { status: 400 });
  }

  const githubToken = process.env.GITHUB_TOKEN;
  const owner = 'henryrussell';
  const repo = 'self-testing-website';

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/actions/runs/${runId}/artifacts`,
      {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: 'application/vnd.github+json',
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch artifacts' }, { status: response.status });
    }

    const data = await response.json();
    const artifacts = data.artifacts.map((artifact: { 
      id: number; 
      name: string; 
      size_in_bytes: number; 
      download_url?: string;
      expired: boolean;
    }) => ({
      id: artifact.id,
      name: artifact.name,
      size: artifact.size_in_bytes,
      expired: artifact.expired,
      downloadUrl: artifact.download_url,
    }));

    return NextResponse.json({ artifacts });
  } catch (error) {
    console.error('Workflow artifacts fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch workflow artifacts' }, { status: 500 });
  }
}
