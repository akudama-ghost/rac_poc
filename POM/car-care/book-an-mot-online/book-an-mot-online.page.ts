import { Page, Locator, expect } from '@playwright/test';

export class RacBookMotPage {
  readonly page: Page;

  // Header / navigation
  readonly siteHeader: Locator;
  readonly navBookMot: Locator;

  // Hero section
  readonly heroTitle: Locator;
  readonly heroBookNowBtn: Locator;
  readonly heroLearnMoreBtn: Locator;

  // MOT info cards
  readonly motTestCard: Locator;
  readonly motRetestCard: Locator;
  readonly motServiceCard: Locator;

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
    this.navBookMot = page.getByRole('link', { name: /Book an MOT/i });

    // Hero section
    this.heroTitle = page.getByRole('heading', { name: /Book an MOT/i });
    this.heroBookNowBtn = page.getByRole('link', { name: /Book now/i });
    this.heroLearnMoreBtn = page.getByRole('link', { name: /Learn more/i });

    // MOT info cards
    this.motTestCard = page.locator('section:has-text("MOT Test")');
    this.motRetestCard = page.locator('section:has-text("MOT Retest")');
    this.motServiceCard = page.locator('section:has-text("MOT Service")');

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
  async gotoBookMot() {
    await this.page.goto('https://www.rac.co.uk/car-care/book-an-mot-online', { waitUntil: 'domcontentloaded' });
  }

  // Hero actions
  async clickBookNow() {
    await this.heroBookNowBtn.click();
    await expect(this.page).toHaveURL(/book|mot/i);
  }

  async clickLearnMore() {
    await this.heroLearnMoreBtn.click();
    await expect(this.page).toHaveURL(/mot/i);
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
