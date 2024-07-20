import { expect, test } from '@playwright/test';

test('navigation test', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', {
      name: 'The most fun way to plan YOUR perfect getaway',
    }),
  ).toBeVisible();

  await expect(
    page.locator('h1:text("The most fun way to plan YOUR perfect getaway")'),
  ).toBeVisible;
});
