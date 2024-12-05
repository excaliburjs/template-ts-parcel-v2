import { test, expect } from '@playwright/test';

test('main page looks correct', async ({ page }) => {
  await page.goto('http://localhost:1234/');
  await page.click('#excalibur-play');
  await page.waitForTimeout(1500);
  await expect(page).toHaveScreenshot();
});