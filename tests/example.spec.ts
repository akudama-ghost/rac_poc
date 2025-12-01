// tests/service-repair.spec.ts
import { expect, request, test } from '@playwright/test';
import { RacApprovedGaragesPage } from '../POM/approvedgarages/approvedgarages.page';
import { RacMotCheckerPage } from '../POM/car-care/mot-checker/mot-checker.page';
import { Cookies } from '../global/cookies';



let cookies: Cookies;


test.beforeEach(async ({ page }) => {
  cookies = new Cookies(page);
});

test.describe('Service & Repair section', () => {
  test('should navigate to Car Repairs page and verify title', async ({ page }) => {
    await page.goto('https://www.rac.co.uk/');
    await page.getByTestId('ensYesThatsFineBtn').click();
    await page.getByRole('button', { name: 'Service & Repair' }).click();
    await page.getByText('Service, repairs & MOT').click();
    await page.getByRole('button', { name: 'Service & Repair' }).click();
    await page.getByRole('link', { name: 'Book a car service' }).click();
    await page.getByRole('button', { name: 'Road test' }).nth(1).click();
    await page.getByRole('button', { name: 'Road test' }).nth(1).click();
    await page.getByRole('button', { name: 'Under the bonnet' }).nth(1).click();
    await page.getByRole('button', { name: 'Under the bonnet' }).nth(1).click();
    await page.getByRole('button', { name: 'Find out more' }).click();
    await page.getByRole('button', { name: 'We also cover' }).click();
    await page.getByRole('button', { name: 'Driving and Service resources' }).click();
    await page.getByRole('button', { name: 'Find a local mobile mechanic' }).click();
  });
});

test('Route planner endpoint should respond with 200', async ({ }) => {
  // Utwórz nowy klient HTTP Playwright
  const apiContext = await request.newContext();

  // Wywołaj publiczny endpoint
  const response = await apiContext.get('https://www.rac.co.uk/route-planner');

  // Sprawdź status odpowiedzi
  expect(response.status()).toBe(200);

  // Opcjonalnie: sprawdź czy treść zawiera kluczowe elementy
  const body = await response.text();
  expect(body).toContain('Route Planner');
});

test('User can search for approved garage', async ({ page }) => {
  const garagesPage = new RacApprovedGaragesPage(page);
  await garagesPage.gotoApprovedGarages();
  await cookies.acceptAll();
  await page.getByRole('link', { name: 'Find a garage ' }).click();
  await page.getByRole('textbox', { name: 'Enter Location...' }).click();
  await page.getByRole('textbox', { name: 'Enter Location...' }).fill('Swindon');
  await page.getByText('SwindonUK').click();
  await page.getByRole('button', { name: 'Search Now ' }).click();
});

test('User can check MOT status', async ({ page }) => {
  const motCheckerPage = new RacMotCheckerPage(page);
  await motCheckerPage.gotoMotChecker();
  await cookies.acceptAll();
  await motCheckerPage.checkMot('AB12CDE');
});

test.afterEach(async ({ browser }) => {
  for (const ctx of browser.contexts()) {
    try {
      await ctx.close();
    } catch (e) {
    }
  }

  await new Promise((r) => setTimeout(r, 50));
});