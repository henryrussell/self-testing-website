import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('The main page is displayed', () => {

  test('the intro is in view', async ({ page }) => {
    const intro = page.getByTestId('intro');
    await expect(intro).toBeInViewport();
  });

  test('check the title content is correct', async ({ page }) => {
    await expect(page).toHaveTitle('Self Testing Website and Portfolio');
  });

});

test.describe('The Test Buttons are available', () => {

  test('The unit test button is displayed', async ({ page }) => {
    const unitTestButton = page.getByText('Run All Tests');
    await expect(unitTestButton).toBeVisible();
  });
});

test.describe('Header and Navigation are available', () => {

  test('the header is visible', async ({ page }) => {
    const header = page.getByTestId('header');
    await expect(header).toBeVisible();
  });

  test('home link is visible in navigation', async ({ page }) => {
    const homeLink = page.getByRole('link', { name: /Home/i });
    await expect(homeLink).toBeVisible();
  });

  test('about link is visible in navigation', async ({ page }) => {
    const aboutLink = page.getByRole('link', { name: /About Me/i });
    await expect(aboutLink).toBeVisible();
  });

  test('projects link is visible in navigation', async ({ page }) => {
    const projectsLink = page.getByRole('link', { name: /Projects/i });
    await expect(projectsLink).toBeVisible();
  });

  test('can navigate to about page via header link', async ({ page }) => {
    const aboutLink = page.getByRole('link', { name: /About Me/i });
    await aboutLink.click();
    await page.waitForURL('/about');
    await expect(page).toHaveURL(/\/about/);
  });

  test('can navigate to projects page via header link', async ({ page }) => {
    const projectsLink = page.getByRole('link', { name: /Projects/i });
    await projectsLink.click();
    await page.waitForURL('/projects');
    await expect(page).toHaveURL(/\/projects/);
  });
});

test.describe('Footer is present on main page', () => {

  test('the footer is visible', async ({ page }) => {
    const footer = page.getByTestId('footer');
    await expect(footer).toBeVisible();
  });

  test('linkedin link is present in footer', async ({ page }) => {
    const linkedinLink = page.getByRole('link', { name: /LinkedIn/i });
    await expect(linkedinLink).toBeVisible();
  });

  test('github link is present in footer', async ({ page }) => {
    const githubLink = page.getByRole('link', { name: /GitHub/i });
    await expect(githubLink).toBeVisible();
  });

  test('footer contains last updated text', async ({ page }) => {
    const footer = page.getByTestId('footer');
    await expect(footer.locator('text=/Last updated/')).toBeVisible();
  });
});

test.describe('Test Runner Section', () => {

  test('test runner section is visible', async ({ page }) => {
    const testRunnerSection = page.locator('#test-runner');
    await expect(testRunnerSection).toBeVisible();
  });
});

