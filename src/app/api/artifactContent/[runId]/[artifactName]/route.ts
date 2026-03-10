import { NextRequest, NextResponse } from 'next/server';
import JSZip from 'jszip';

function isValidRunId(runId: string | undefined): boolean {
  return !!runId && /^\d+$/.test(runId);
}

function isValidArtifactName(name: string): string | null {
  // Only allow specific artifact names for security
  if (name === 'playwright-report' || name === 'coverage-report') {
    return name;
  }
  return null;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ runId: string; artifactName: string }> }
) {
  const { runId, artifactName } = await params;

  // Input validation
  if (!isValidRunId(runId)) {
    return NextResponse.json({ error: 'Invalid run ID format' }, { status: 400 });
  }

  const validName = isValidArtifactName(artifactName);
  if (!validName) {
    return NextResponse.json({ error: 'Invalid artifact name' }, { status: 400 });
  }

  const githubToken = process.env.GITHUB_TOKEN;
  const owner = 'henryrussell';
  const repo = 'self-testing-website';

  try {
    // Fetch artifacts list
    const artifactsResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/actions/runs/${runId}/artifacts`,
      {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: 'application/vnd.github+json',
        },
      }
    );

    if (!artifactsResponse.ok) {
      return NextResponse.json({ error: 'Failed to fetch artifacts' }, { status: artifactsResponse.status });
    }

    const artifactsData = await artifactsResponse.json();
    const artifact = artifactsData.artifacts.find(
      (a: { name: string }) => a.name === validName
    );

    if (!artifact) {
      return NextResponse.json({ error: 'Artifact not found' }, { status: 404 });
    }

    if (artifact.expired) {
      return NextResponse.json({ error: 'Artifact has expired' }, { status: 410 });
    }

    // Download the artifact directly using the download URL
    // GitHub artifact download endpoint automatically handles the zip download
    const downloadUrl = `https://api.github.com/repos/${owner}/${repo}/actions/artifacts/${artifact.id}/zip`;
    
    const downloadResponse = await fetch(downloadUrl, {
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: 'application/vnd.github+json',
      },
      redirect: 'follow',
    });

    if (!downloadResponse.ok) {
      console.error('Download response status:', downloadResponse.status, downloadResponse.statusText);
      return NextResponse.json({ error: 'Failed to download artifact' }, { status: downloadResponse.status });
    }

    // Get the zip data
    const zipBuffer = await downloadResponse.arrayBuffer();
    
    if (zipBuffer.byteLength === 0) {
      return NextResponse.json({ error: 'Artifact is empty' }, { status: 400 });
    }

    // Parse the zip file
    const jszip = new JSZip();
    const zip = await jszip.loadAsync(zipBuffer);

    // For HTML reports, get the index.html file
    const indexFile = zip.file('index.html');
    if (!indexFile) {
      return NextResponse.json({ error: 'No index.html found in artifact' }, { status: 400 });
    }

    const htmlContent = await indexFile.async('string');

    // Return the HTML content with proper headers
    return new NextResponse(htmlContent, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Artifact content fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch artifact content' }, { status: 500 });
  }
}
