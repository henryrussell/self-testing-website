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

