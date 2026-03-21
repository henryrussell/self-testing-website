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
