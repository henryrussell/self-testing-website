# Self-Testing Portfolio Website

A **meta portfolio website** built with Next.js that demonstrates a unique concept: it can trigger GitHub Actions to run tests on itself, fetch the results, and display them live on the website. The website showcases projects, professional experience, and serves as a self-validating application that tests itself.

## Project Overview

### Key Philosophy
The site uses GitHub Actions as a CI/CD pipeline that can be triggered by clicking a button on the website itself. Test results are streamed back to the frontend in real-time, creating a self-demonstrating portfolio of testing and development capabilities.

---

## Technology Stack

### Frontend
- **Framework**: Next.js 15.5.12 (with Turbopack)
- **UI Library**: React 19.0.0
- **Styling**: Tailwind CSS 3.4.1 (dark mode support via `class` strategy)
- **Language**: TypeScript 5
- **HTTP Client**: Fetch API (native browser)
- **Icon Library**: react-icons 5.4.0

### Backend/APIs
- **Runtime**: Node.js (Next.js App Router)
- **Server Framework**: Next.js API Routes (Route Handlers)
- **External API**: GitHub REST API v3

### Testing
- **Unit Testing**: Jest 29.7.0 with React Testing Library
- **E2E Testing**: Playwright 1.50.1
- **Coverage**: Jest with lcov reporter

### CI/CD
- **Platform**: GitHub Actions
- **Workflow Trigger**: Manual dispatch via custom `/api/triggerWorkflow` endpoint

### Utilities
- **Compression**: pako 2.1.0 (for decompressing GitHub Actions logs)
- **Fonts**: Inter from next/font/google (optimized font loading)

---

## Project Structure

```
/
├── src/
│   └── app/
│       ├── page.tsx                      # Home page (test runner + intro)
│       ├── layout.tsx                    # Root layout (Header, Footer, etc)
│       ├── globals.css                   # Global styles
│       ├── types.d.ts                    # TypeScript interfaces
│       ├── about/
│       │   └── page.tsx                  # About Me page (profile, career highlights)
│       ├── projects/
│       │   └── page.tsx                  # Projects page (portfolio showcase)
│       ├── api/
│       │   ├── health/route.ts          # Health check for workflow verification
│       │   ├── triggerWorkflow/route.ts # Triggers GitHub Actions workflow
│       │   ├── workflowStatus/[runId]/  # Polls workflow status
│       │   ├── workflowJobs/[runId]/    # Fetches job details and steps
│       │   └── workflowLogs/[runId]/    # Fetches compressed logs
│       └── components/
│           ├── Header.tsx               # Navigation (Home, About Me, Projects)
│           ├── Footer.tsx               # Footer (Updated date, social links)
│           ├── TestRunnerComponent.tsx  # Test trigger button
│           ├── TestOutput.tsx           # Real-time status & logs display
│           ├── DarkModeToggle.tsx       # Dark/light mode toggle
│           ├── AnimatedBackground.tsx   # Animated background pattern
│           ├── Intro.tsx                # Homepage introduction
│           ├── ProjectCard.tsx          # Individual project card
│           └── SkillItem.tsx            # Skill display component
├── __tests__/                           # Unit tests (Jest)
│   ├── page.test.tsx                    # Home page tests
│   └── darkMode.test.tsx                # Dark mode tests
├── playwright-tests/                    # E2E tests
│   ├── mainPage.spec.ts                 # Home page E2E tests
│   ├── aboutPage.spec.ts                # About page E2E tests
│   ├── projectsPage.spec.ts             # Projects page E2E tests
│   └── playwright.config.ts             # Playwright configuration
├── .github/workflows/
│   └── mainTests.yml                    # GitHub Actions workflow
├── coverage/                             # Jest coverage reports (generated)
├── playwright-report/                   # Playwright HTML report (generated)
├── jest.config.ts                       # Jest configuration
├── jest.setup.js                        # Jest environment setup
├── next.config.ts                       # Next.js configuration
├── tailwind.config.ts                   # Tailwind CSS configuration
├── tsconfig.json                        # TypeScript configuration
├── postcss.config.mjs                   # PostCSS configuration
├── eslint.config.mjs                    # ESLint configuration
└── package.json                         # Dependencies and scripts
```

---

## Core Features

### 1. Self-Testing Workflow

**User Action Flow:**
1. User clicks "Run All Tests" button on home page
2. Website triggers GitHub Actions via `/api/triggerWorkflow`
3. GitHub Actions runs unit tests, builds application, and runs E2E tests
4. Real-time logs and status are streamed back and displayed live
5. Final test report is fetched and displayed

**Key Endpoints:**
- `POST /api/triggerWorkflow` - Dispatch workflow to GitHub Actions
- `GET /api/workflowStatus/[runId]` - Poll workflow status
- `GET /api/workflowJobs/[runId]` - Fetch job details and steps
- `GET /api/workflowLogs/[runId]` - Fetch compressed workflow logs
- `GET /api/health` - Health check endpoint for workflow verification

### 2. Real-Time Polling & Display

TestOutput component polls every 5 seconds for:
- Workflow status and conclusion
- Job names and step statuses
- Compressed gzip logs (decompressed client-side with pako)

Polling automatically stops when workflow reaches a conclusion (success/failure).

### 3. GitHub Actions Workflow

The `.github/workflows/mainTests.yml` executes:
1. Checkout code
2. Setup Node.js
3. Install dependencies
4. Run Jest unit tests
5. Build Next.js application
6. Start application in background
7. Verify app health via health check endpoint
8. Install Playwright browsers
9. Run Playwright E2E tests
10. Upload test report artifacts

### 4. Multi-Page Portfolio

**Home Page** - Introduction and test runner
**About Me Page** - Profile picture, career highlights, and technical skills
**Projects Page** - Portfolio of projects

---

## Pages & Components

### Home Page (`/`)
- Hero title with animated background
- Introduction section explaining the concept
- "Run All Tests" button to trigger GitHub Actions
- Real-time test output display

### About Me Page (`/about`)
- Profile picture in circular frame
- Professional headline and description
- Career highlights list
- Technical skills display
- Testing expertise categories

### Projects Page (`/projects`)
- Portfolio of project cards
- Project details, descriptions, and links

---

## Environment Variables

**Required** in `.env.local`:
- `GITHUB_TOKEN` - GitHub Personal Access Token with `repo` and `actions` scopes

**Hardcoded Values:**
- `owner: 'henryrussell'`
- `repo: 'self-testing-website'`
- `workflowId: 'mainTests.yml'`

---

## Testing Strategy

### Unit Tests (Jest)
Location: `__tests__/`
- Tests for home page content and functionality
- Tests for dark mode toggle

### E2E Tests (Playwright)
Location: `playwright-tests/`
- Main page feature tests
- About page display tests
- Projects page display tests

**Philosophy:** Tests are kept minimal for speed and flexibility (content may change frequently).

---

## NPM Scripts

```bash
npm run dev                    # Start dev server with Turbopack
npm run build                  # Build for production
npm run start                  # Start production server
npm run lint                   # Run ESLint
npm run unit-tests            # Run Jest unit tests
npm run e2e-tests             # Run Playwright with visible browser
npm run e2e-tests-headless    # Run Playwright headless
```

---

## Getting Started

### Installation
```bash
# Clone the repository
git clone https://github.com/henryrussell/self-testing-website.git
cd self-testing-website

# Install dependencies
npm install

# Create .env.local and add GITHUB_TOKEN
echo "GITHUB_TOKEN=your_token_here" > .env.local
```

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Tests Locally
```bash
# Unit tests
npm run unit-tests

# E2E tests (with browser visible)
npm run e2e-tests

# E2E tests (headless)
npm run e2e-tests-headless
```

---

## Key Technical Details

### Log Decompression
GitHub Actions logs are gzip-compressed. The workflowLogs API route decompresses using pako.inflate() before sending to frontend.

### Polling Strategy
- 5-second intervals provide real-time feel without excessive API calls
- Completion detected via `conclusion` field (not `status` field)
- Intervals cleaned up on component unmount

### Workflow Dispatch
- GitHub API accepts dispatch via 202 Accepted
- RunID retrieved immediately after dispatch from latest workflow runs
- Runs ordered by creation date (newest first)

---

## TypeScript Interfaces

```typescript
interface Project {
  title: string;
  description?: string;
  image?: string;
  video?: string;
  link?: string;
  technologies?: string[];
}

interface Skill {
  name: string;
  level: number | string;
}

interface Step {
  name: string;
  status: string;
}

interface Job {
  name: string;
  status: string;
  steps: Step[];
}
```

---

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| next | ^15.5.12 | React framework & routing |
| react | ^19.0.0 | UI library |
| tailwindcss | ^3.4.1 | CSS framework |
| typescript | ^5 | Type checking |
| jest | ^29.7.0 | Unit testing |
| @playwright/test | ^1.50.1 | E2E testing |
| pako | ^2.1.0 | Gzip decompression |
| react-icons | ^5.4.0 | Icon library |

---

## Security Considerations

- All API routes authenticate with GitHub token (stored server-side in `.env.local`)
- No sensitive data exposed on frontend
- GitHub token should never be committed to version control
- Ensure `.env.local` is in `.gitignore`

---

## Deployment

This project can be deployed to any Node.js hosting platform:
- **Vercel** (recommended for Next.js)
- **Railway**
- **Render**
- **AWS**
- **DigitalOcean**

For deployment, ensure `GITHUB_TOKEN` is set as an environment variable in your hosting platform.

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
