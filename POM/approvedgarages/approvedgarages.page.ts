import { Page, Locator, expect } from '@playwright/test';

export class RacApprovedGaragesPage {
  readonly page: Page;

  // Header / navigation
  readonly siteHeader: Locator;
  readonly navApprovedGarages: Locator;

  // Hero section
  readonly heroTitle: Locator;
  readonly heroFindGarageBtn: Locator;
  readonly heroLearnMoreBtn: Locator;

  // Garage search form
  readonly postcodeInput: Locator;
  readonly serviceTypeSelect: Locator;
  readonly findGarageBtn: Locator;

  // Info sections
  readonly whyChooseSection: Locator;
  readonly benefitsSection: Locator;
  readonly howItWorksSection: Locator;

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
    this.navApprovedGarages = page.getByRole('link', { name: /Approved Garages/i });

    // Hero section
    this.heroTitle = page.getByRole('heading', { name: /Approved Garages/i });
    this.heroFindGarageBtn = page.getByRole('link', { name: /Find a garage/i });
    this.heroLearnMoreBtn = page.getByRole('link', { name: /Learn more/i });

    // Garage search form
    this.postcodeInput = page.getByLabel(/Postcode/i);
    this.serviceTypeSelect = page.getByLabel(/Service type/i);
    this.findGarageBtn = page.getByRole('button', { name: /Find a garage/i });

    // Info sections
    this.whyChooseSection = page.locator('section:has-text("Why choose")');
    this.benefitsSection = page.locator('section:has-text("Benefits")');
    this.howItWorksSection = page.locator('section:has-text("How it works")');

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
  async gotoApprovedGarages() {
    await this.page.goto('https://www.rac.co.uk/approvedgarages/', { waitUntil: 'domcontentloaded' });
    await this.acceptCookiesIfPresent();
    await expect(this.heroTitle).toBeVisible();
  }

  // Hero actions
  async clickFindGarage() {
    await this.heroFindGarageBtn.click();
    await expect(this.page).toHaveURL(/approvedgarages|search/i);
  }

  async clickLearnMore() {
    await this.heroLearnMoreBtn.click();
    await expect(this.page).toHaveURL(/approvedgarages/i);
  }

  // Garage search form
  async searchGarage(postcode: string, serviceType: string) {
    await this.clickFindGarage();
    await this.postcodeInput.fill(postcode);
    await this.serviceTypeSelect.selectOption({ label: serviceType });
    await this.findGarageBtn.click();
    await expect(this.page).toHaveURL(/approvedgarages|results/i);
  }

  // Utilities
  async acceptCookiesIfPresent() {
    if (await this.cookieAcceptBtn.count()) {
      await this.cookieAcceptBtn.click();
    }
  }
}
