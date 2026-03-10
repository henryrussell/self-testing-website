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
  const owner = 'henryrussell'; // Replace with your GitHub username
  const repo = 'self-testing-website'; // Replace with your repository name

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/actions/runs/${runId}/jobs`,
      {
        headers: {
          Authorization: `Bearer ${githubToken}`,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch workflow jobs' }, { status: response.status });
    }

    const data = await response.json();
    const jobs: Job[] = data.jobs.map((job: { name: string; status: string; steps: { name: string; status: string }[] }) => ({
        name: job.name,
        status: job.status,
        steps: job.steps.map((step: { name: string; status: string }) => ({
            name: step.name,
            status: step.status,
        })),
      }));

    return NextResponse.json({ jobs });

  } catch (error) {
    // Log error but don't expose details to client
    console.error('Workflow jobs fetch error:', error);
    return NextResponse.json(
      { error: "Failed to fetch workflow jobs" },
      { status: 500 }
    );
  }
}
