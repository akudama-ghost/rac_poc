import { Page, Locator, expect } from '@playwright/test';

export class RacMotCheckerPage {
  readonly page: Page;

  // Header / navigation
  readonly siteHeader: Locator;
  readonly navMotChecker: Locator;

  // Hero section
  readonly heroTitle: Locator;
  readonly heroCheckMotBtn: Locator;
  readonly heroLearnMoreBtn: Locator;

  // MOT checker form
  readonly regNumberInput: Locator;
  readonly checkMotBtn: Locator;

  // Info sections
  readonly motExpirySection: Locator;
  readonly motHistorySection: Locator;
  readonly motAdvisoriesSection: Locator;

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
    this.navMotChecker = page.getByRole('link', { name: /MOT Checker/i });

    // Hero section
    this.heroTitle = page.getByRole('heading', { name: /MOT Checker/i });
    this.heroCheckMotBtn = page.getByRole('button', { name: /Check MOT/i });
    this.heroLearnMoreBtn = page.getByRole('link', { name: /Learn more/i });




    // MOT checker form
    this.regNumberInput = page.locator('#registration');
    this.checkMotBtn = page.getByRole('button', { name: /Check MOT/i });

    // Info sections
    this.motExpirySection = page.locator('section:has-text("MOT expiry")');
    this.motHistorySection = page.locator('section:has-text("MOT history")');
    this.motAdvisoriesSection = page.locator('section:has-text("Advisories")');

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
  async gotoMotChecker() {
    await this.page.goto('https://www.rac.co.uk/car-care/mot-checker', { waitUntil: 'domcontentloaded' });
    await this.acceptCookiesIfPresent();
    await expect(this.heroTitle).toBeVisible();
  }

  // Hero actions
  async clickCheckMot() {
    await this.heroCheckMotBtn.click();
    await expect(this.page).toHaveURL(/mot-checker|results/i);
  }

  async clickLearnMore() {
    await this.heroLearnMoreBtn.click();
    await expect(this.page).toHaveURL(/mot-checker/i);
  }

  // MOT checker form
  async checkMot(regNumber: string) {
    await this.regNumberInput.fill(regNumber);
    await this.checkMotBtn.click();
    await expect(this.page).toHaveURL(/mot-checker|results/i);
  }

  // Utilities
  async acceptCookiesIfPresent() {
    if (await this.cookieAcceptBtn.count()) {
      await this.cookieAcceptBtn.click();
    }
  }
}
