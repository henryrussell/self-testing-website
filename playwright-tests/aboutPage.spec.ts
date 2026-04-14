import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/about');
});

test.describe('The About page is displayed', () => {

  test('the name Henry Russell is visible', async ({ page }) => {
    await expect(page.getByText('Henry Russell')).toBeVisible();
  });

  test('the profile picture is displayed', async ({ page }) => {
    const profileImage = page.locator('img[alt="Henry Russell"]');
    await expect(profileImage).toBeVisible();
  });

  test('career highlights are displayed', async ({ page }) => {
    await expect(page.getByText(/Career Highlights/)).toBeVisible();
  });

});

test.describe('About page skills and experience sections', () => {

  test('technical skills section is visible', async ({ page }) => {
    const technicalSkillsHeading = page.getByRole('heading', { name: /Technical Skills/i });
    await expect(technicalSkillsHeading).toBeVisible();
  });

  test('multiple technical skills are displayed', async ({ page }) => {
    const skillTags = page.locator('.skill-tag');
    const typescript = skillTags.filter({ hasText: /TypeScript/i }).first();
    const nodejs = skillTags.filter({ hasText: /Node.js/i }).first();
    const playwright = skillTags.filter({ hasText: /Playwright/i }).first();
    await expect(typescript).toBeVisible();
    await expect(nodejs).toBeVisible();
    await expect(playwright).toBeVisible();
  });

  test('testing expertise section is visible', async ({ page }) => {
    const testingExpertiseHeading = page.getByRole('heading', { name: /Testing Expertise/i });
    await expect(testingExpertiseHeading).toBeVisible();
  });

  test('testing expertise items are displayed', async ({ page }) => {
    const functionalTesting = page.getByText(/Functional Testing/i);
    const regressionTesting = page.getByText(/Regression Testing/i);
    await expect(functionalTesting).toBeVisible();
    await expect(regressionTesting).toBeVisible();
  });

  test('technical experience section exists', async ({ page }) => {
    const technicalExperienceHeading = page.getByRole('heading', { name: /Technical Experience/i });
    await expect(technicalExperienceHeading).toBeVisible();
  });

  test('professional qualities section is visible', async ({ page }) => {
    const qualitiesHeading = page.getByRole('heading', { name: /Professional Qualities/i });
    await expect(qualitiesHeading).toBeVisible();
  });

  test('professional qualities are listed', async ({ page }) => {
    const agileMethodology = page.getByText(/Agile methodologies/);
    const mentoring = page.getByText(/Technical mentoring/);
    await expect(agileMethodology).toBeVisible();
    await expect(mentoring).toBeVisible();
  });
});

test.describe('About page AI chatbot section', () => {

  test('chatbot link button is visible', async ({ page }) => {
    const chatbotButton = page.getByRole('link', { name: /Chat with my AI assistant/i });
    await expect(chatbotButton).toBeVisible();
  });

  test('chatbot link has correct href', async ({ page }) => {
    const chatbotLink = page.getByRole('link', { name: /Chat with my AI assistant/i });
    await expect(chatbotLink).toHaveAttribute('href', /portfolio-chatbot/);
  });
});

test.describe('About page navigation', () => {

  test('can navigate back to home from about page', async ({ page }) => {
    const homeLink = page.getByRole('link', { name: /Home/i });
    await homeLink.click();
    await page.waitForURL('/');
    await expect(page).toHaveURL('/');
  });

  test('can navigate to projects from about page', async ({ page }) => {
    const projectsLink = page.getByRole('link', { name: /Projects/i });
    await projectsLink.click();
    await page.waitForURL('/projects');
    await expect(page).toHaveURL(/\/projects/);
  });
});

test.describe('About page structure', () => {

  test('header is visible on about page', async ({ page }) => {
    const header = page.getByTestId('header');
    await expect(header).toBeVisible();
  });

  test('footer is visible on about page', async ({ page }) => {
    const footer = page.getByTestId('footer');
    await expect(footer).toBeVisible();
  });

  test('page contains years of experience reference', async ({ page }) => {
    const experienceText = page.getByText(/four years of experience/i);
    await expect(experienceText).toBeVisible();
  });
});
