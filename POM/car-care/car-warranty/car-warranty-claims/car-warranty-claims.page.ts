import { Page, Locator, expect } from '@playwright/test';

export class RacCarWarrantyClaimsPage {
  readonly page: Page;

  // Header / navigation
  readonly siteHeader: Locator;
  readonly navWarrantyClaims: Locator;

  // Hero section
  readonly heroTitle: Locator;
  readonly heroStartClaimBtn: Locator;
  readonly heroLearnMoreBtn: Locator;

  // Claims info sections
  readonly howToClaimSection: Locator;
  readonly whatsCoveredSection: Locator;
  readonly exclusionsSection: Locator;

  // Claim form
  readonly policyNumberInput: Locator;
  readonly regNumberInput: Locator;
  readonly mileageInput: Locator;
  readonly submitClaimBtn: Locator;

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
    this.navWarrantyClaims = page.getByRole('link', { name: /Warranty Claims/i });

    // Hero section
    this.heroTitle = page.getByRole('heading', { name: /RAC Warranty claims/i });
    this.heroStartClaimBtn = page.getByRole('link', { name: /Start your claim/i });
    this.heroLearnMoreBtn = page.getByRole('link', { name: /Learn more/i });

    // Claims info sections
    this.howToClaimSection = page.locator('section:has-text("How to claim")');
    this.whatsCoveredSection = page.locator('section:has-text("What\'s covered")');
    this.exclusionsSection = page.locator('section:has-text("Exclusions")');

    // Claim form
    this.policyNumberInput = page.getByLabel(/Policy number/i);
    this.regNumberInput = page.getByLabel(/Registration number/i);
    this.mileageInput = page.getByLabel(/Mileage/i);
    this.submitClaimBtn = page.getByRole('button', { name: /Submit claim/i });

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
  async gotoWarrantyClaims() {
    await this.page.goto('https://www.rac.co.uk/car-care/car-warranty/car-warranty-claims', { waitUntil: 'domcontentloaded' });
  }

  // Hero actions
  async clickStartClaim() {
    await this.heroStartClaimBtn.click();
    await expect(this.page).toHaveURL(/claim|warranty/i);
  }

  async clickLearnMore() {
    await this.heroLearnMoreBtn.click();
    await expect(this.page).toHaveURL(/warranty-claims/i);
  }

  // Claim form
  async submitClaim(policyNumber: string, regNumber: string, mileage: string) {
    await this.policyNumberInput.fill(policyNumber);
    await this.regNumberInput.fill(regNumber);
    await this.mileageInput.fill(mileage);
    await this.submitClaimBtn.click();
    await expect(this.page).toHaveURL(/confirmation|claim/i);
  }

  // Utilities
  async acceptCookiesIfPresent() {
    if (await this.cookieAcceptBtn.count()) {
      await this.cookieAcceptBtn.click();
    }
  }
}
