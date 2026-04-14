import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/projects');
});

test.describe('The Projects page is displayed', () => {

  test('the projects heading is visible', async ({ page }) => {
    await expect(page.getByText(/My Projects/)).toBeVisible();
  });

  test('at least one project card is displayed', async ({ page }) => {
    const projectCard = page.getByTestId('project-card');
    await expect(projectCard.first()).toBeVisible();
  });

});

test.describe('Project cards content', () => {

  test('AI Chatbot project is displayed', async ({ page }) => {
    const aiChatbotTitle = page.getByText(/AI Chatbot/i);
    await expect(aiChatbotTitle).toBeVisible();
  });

  test('AI Chatbot project has description', async ({ page }) => {
    const chatbotDescription = page.getByText(/web application that showcases an AI model/);
    await expect(chatbotDescription).toBeVisible();
  });

  test('Flocking Simulation project is displayed', async ({ page }) => {
    const flockingTitle = page.getByText(/Flocking Simulation/i);
    await expect(flockingTitle).toBeVisible();
  });

  test('Flocking Simulation project has Java reference', async ({ page }) => {
    const flockingJavaRef = page.getByText(/java project that simulates/);
    await expect(flockingJavaRef).toBeVisible();
  });

  test('This website project is displayed', async ({ page }) => {
    const websiteTitle = page.getByRole('heading', { name: /This website/i });
    await expect(websiteTitle).toBeVisible();
  });

  test('This website project description is visible', async ({ page }) => {
    const websiteDesc = page.getByText(/website you are currently on/);
    await expect(websiteDesc).toBeVisible();
  });
});

test.describe('Projects page structure and navigation', () => {

  test('header is visible on projects page', async ({ page }) => {
    const header = page.getByTestId('header');
    await expect(header).toBeVisible();
  });

  test('footer is visible on projects page', async ({ page }) => {
    const footer = page.getByTestId('footer');
    await expect(footer).toBeVisible();
  });

  test('can navigate to home from projects page', async ({ page }) => {
    const homeLink = page.getByRole('link', { name: /Home/i });
    await homeLink.click();
    await page.waitForURL('/');
    await expect(page).toHaveURL('/');
  });

  test('can navigate to about from projects page', async ({ page }) => {
    const aboutLink = page.getByRole('link', { name: /About Me/i });
    await aboutLink.click();
    await page.waitForURL('/about');
    await expect(page).toHaveURL(/\/about/);
  });
});

test.describe('Projects page external links', () => {

  test('AI Chatbot project has external link', async ({ page }) => {
    const chatbotLink = page.locator('a[href*="portfolio-chatbot"]');
    await expect(chatbotLink).toBeVisible();
  });

  test('external project links have correct href', async ({ page }) => {
    const externalLink = page.locator('a[href*="portfolio-chatbot"]');
    await expect(externalLink).toHaveAttribute('href', /portfolio-chatbot/);
  });
});

test.describe('Projects page project count', () => {

  test('displays multiple project cards', async ({ page }) => {
    const projectCards = page.getByTestId('project-card');
    const count = await projectCards.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });
});
