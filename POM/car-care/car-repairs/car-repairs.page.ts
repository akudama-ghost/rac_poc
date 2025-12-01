import { Page, Locator, expect } from '@playwright/test';

export class RacCarRepairsPage {
  readonly page: Page;

  // Header / navigation
  readonly siteHeader: Locator;
  readonly navCarRepairs: Locator;

  // Hero section
  readonly heroTitle: Locator;
  readonly heroBookNowBtn: Locator;
  readonly heroLearnMoreBtn: Locator;

  // Repair options (cards)
  readonly brakeRepairCard: Locator;
  readonly clutchRepairCard: Locator;
  readonly exhaustRepairCard: Locator;
  readonly batteryReplacementCard: Locator;

  // Booking form
  readonly regNumberInput: Locator;
  readonly postcodeInput: Locator;
  readonly findGarageBtn: Locator;

  // Promo banners
  readonly promoBanner: Locator;

  // Trustpilot / reviews
  readonly trustpilotSection: Locator;

  // Footer
  readonly siteFooter: Locator;
  readonly footerLinks: Locator;

  // Cookie banner
  readonly cookieAcceptBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    // Header
    this.siteHeader = page.locator('header');
    this.navCarRepairs = page.getByRole('link', { name: /Car Repairs/i });

    // Hero section
    this.heroTitle = page.getByRole('heading', { name: /Car Repairs/i });
    this.heroBookNowBtn = page.getByRole('link', { name: /Book now/i });
    this.heroLearnMoreBtn = page.getByRole('link', { name: /Learn more/i });

    // Repair options (cards)
    this.brakeRepairCard = page.locator('section:has-text("Brake")');
    this.clutchRepairCard = page.locator('section:has-text("Clutch")');
    this.exhaustRepairCard = page.locator('section:has-text("Exhaust")');
    this.batteryReplacementCard = page.locator('section:has-text("Battery")');

    // Booking form
    this.regNumberInput = page.getByLabel(/Registration number/i);
    this.postcodeInput = page.getByLabel(/Postcode/i);
    this.findGarageBtn = page.getByRole('button', { name: /Find a garage/i });

    // Promo banners
    this.promoBanner = page.locator('[class*="promo"], [data-component*="promo"]');

    // Trustpilot / reviews
    this.trustpilotSection = page.locator('[class*="trustpilot"], [aria-label*="reviews"]');

    // Footer
    this.siteFooter = page.locator('footer');
    this.footerLinks = this.siteFooter.locator('a');

    // Cookie banner
    this.cookieAcceptBtn = page.getByRole('button', { name: /Accept.*cookies|Agree/i });
  }

  // Navigation
  async gotoCarRepairs() {
    await this.page.goto('https://www.rac.co.uk/car-care/car-repairs', { waitUntil: 'domcontentloaded' });
    await this.acceptCookiesIfPresent();
    await expect(this.heroTitle).toBeVisible();
  }

  // Hero actions
  async clickBookNow() {
    await this.heroBookNowBtn.click();
    await expect(this.page).toHaveURL(/book|repairs/i);
  }

  async clickLearnMore() {
    await this.heroLearnMoreBtn.click();
    await expect(this.page).toHaveURL(/car-repairs/i);
  }

  // Booking form
  async searchGarage(regNumber: string, postcode: string) {
    await this.regNumberInput.fill(regNumber);
    await this.postcodeInput.fill(postcode);
    await this.findGarageBtn.click();
    await expect(this.page).toHaveURL(/garage|booking/i);
  }

  // Utilities
  async acceptCookiesIfPresent() {
    if (await this.cookieAcceptBtn.count()) {
      await this.cookieAcceptBtn.click();
    }
  }
}
