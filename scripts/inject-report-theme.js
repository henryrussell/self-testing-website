#!/usr/bin/env node

/**
 * Inject light mode theme into Playwright HTML report
 * Run after Playwright tests generate the report
 * Modifies: playwright-report/index.html
 */

const fs = require('fs');
const path = require('path');

const REPORT_PATH = path.join(__dirname, '../playwright-report/index.html');

const LIGHT_MODE_CSS = `
<style>
  /* Override Playwright dark theme with light mode */
  :root {
    --color-bg-base: #ffffff !important;
    --color-bg-elevated: #f5f5f5 !important;
    --color-text-base: #212121 !important;
    --color-text-secondary: #424242 !important;
    --color-border: #e0e0e0 !important;
    --color-line-accent: #e0e0e0 !important;
    --color-highlight-bg: #fff3e0 !important;
    --color-link: #0066cc !important;
    --color-link-hover: #0052a3 !important;
    --color-error-bg: #ffebee !important;
    --color-error-text: #c62828 !important;
    --color-success-bg: #e8f5e9 !important;
    --color-success-text: #2e7d32 !important;
    --color-warning-text: #f57f17 !important;
  }

  body {
    background-color: #ffffff !important;
    color: #212121 !important;
  }

  /* Main containers */
  .main-content, .container {
    background-color: #ffffff !important;
    color: #212121 !important;
  }

  /* Text elements */
  p, span, div, h1, h2, h3, h4, h5, h6 {
    color: #212121 !important;
  }

  /* Links */
  a {
    color: #0066cc !important;
  }

  a:hover {
    color: #0052a3 !important;
  }

  /* Headers and navigation */
  header, nav {
    background-color: #f5f5f5 !important;
    color: #212121 !important;
    border-color: #e0e0e0 !important;
  }

  /* Buttons and interactive elements */
  button, .button {
    background-color: #f5f5f5 !important;
    color: #212121 !important;
    border-color: #e0e0e0 !important;
  }

  button:hover, .button:hover {
    background-color: #e0e0e0 !important;
  }

  /* Cards and panels */
  .card, .panel, .group {
    background-color: #ffffff !important;
    color: #212121 !important;
    border-color: #e0e0e0 !important;
  }

  /* Table styles */
  table {
    background-color: #ffffff !important;
    color: #212121 !important;
  }

  thead {
    background-color: #f5f5f5 !important;
  }

  tbody tr:nth-child(odd) {
    background-color: #fafafa !important;
  }

  tbody tr:hover {
    background-color: #f0f0f0 !important;
  }

  /* Input fields */
  input, textarea, select {
    background-color: #ffffff !important;
    color: #212121 !important;
    border-color: #e0e0e0 !important;
  }

  /* Code blocks */
  pre, code {
    background-color: #f5f5f5 !important;
    color: #212121 !important;
    border-color: #e0e0e0 !important;
  }

  /* Status indicators */
  .status-passed, .passed {
    color: #2e7d32 !important;
  }

  .status-failed, .failed {
    color: #c62828 !important;
  }

  .status-skipped, .skipped {
    color: #f57f17 !important;
  }

  /* Ensure text contrast and readability */
  .text-secondary, .muted {
    color: #424242 !important;
  }

  /* Remove any dark overlays or dark backgrounds that might override */
  [style*="background-color: #1a1a1a"],
  [style*="background-color: #222"],
  [style*="background-color: #333"],
  [style*="background: #1a1a1a"],
  [style*="background: #222"],
  [style*="background: #333"] {
    background-color: #ffffff !important;
    color: #212121 !important;
  }

  /* Scrollbar styling for light theme */
  ::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  ::-webkit-scrollbar-track {
    background: #f5f5f5;
  }

  ::-webkit-scrollbar-thumb {
    background: #bdbdbd;
    border-radius: 6px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #757575;
  }

  /* Ensure good contrast for all text */
  * {
    text-shadow: none !important;
  }
</style>
`;

function injectTheme() {
  try {
    // Check if report exists
    if (!fs.existsSync(REPORT_PATH)) {
      console.warn(`⚠️  Playwright report not found at ${REPORT_PATH}`);
      console.log('ℹ️  Skipping theme injection. Report may not have been generated yet.');
      process.exit(0);
    }

    // Read the report HTML
    let html = fs.readFileSync(REPORT_PATH, 'utf8');

    // Check if theme already injected
    if (html.includes('--color-bg-base')) {
      console.log('✓ Light mode theme already injected');
      process.exit(0);
    }

    // Inject CSS before closing body tag
    if (html.includes('</body>')) {
      html = html.replace('</body>', `${LIGHT_MODE_CSS}</body>`);
      fs.writeFileSync(REPORT_PATH, html, 'utf8');
      console.log('✓ Light mode theme successfully injected into Playwright report');
      process.exit(0);
    } else {
      // Fallback: append to end of file
      html += LIGHT_MODE_CSS;
      fs.writeFileSync(REPORT_PATH, html, 'utf8');
      console.log('✓ Light mode theme appended to Playwright report (no </body> tag found)');
      process.exit(0);
    }
  } catch (error) {
    console.error('✗ Error injecting light mode theme:', error.message);
    process.exit(1);
  }
}

// Run injection
injectTheme();
