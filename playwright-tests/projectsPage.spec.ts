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
