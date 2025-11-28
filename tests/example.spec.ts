// tests/service-repair.spec.ts
import { expect, test } from '@playwright/test';

test.describe('Service & Repair section', () => {
  test('should navigate to Car Repairs page and verify title', async ({ page }) => {
    await page.goto('https://www.rac.co.uk/');
    await page.getByRole('link', { name: /Service & Repair/i }).click();
    await page.getByRole('link', { name: /Car Repairs/i }).click();

    await expect(page).toHaveURL(/.*car-repairs/);
    await expect(page).toHaveTitle(/Car Repairs/i);
    await expect(page.locator('h1')).toContainText(/Car Repairs/i);
  });

  test('should navigate to Service & MOT Plan page and verify title', async ({ page }) => {
    await page.goto('https://www.rac.co.uk/');
    await page.getByRole('link', { name: /Service & Repair/i }).click();
    await page.getByRole('link', { name: /Service & MOT Plan/i }).click();

    await expect(page).toHaveURL(/.*service-and-mot-plan/);
    await expect(page).toHaveTitle(/Service Plan/i);
    await expect(page.locator('h1')).toContainText(/Service & MOT Plan/i);
  });
});