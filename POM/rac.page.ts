// racHomePage.ts
import { Page, Locator, expect } from '@playwright/test';

export class RacHomePage {
  readonly page: Page;

  // Top bar
  readonly myRacLoginLink: Locator;
  readonly salesPhoneLink: Locator;

  // Main navigation
  readonly navBreakdownCover: Locator;
  readonly navInsurance: Locator;
  readonly navServiceRepair: Locator;
  readonly navRoutePlanner: Locator;
  readonly navBuyingACar: Locator;
  readonly navShop: Locator;
  readonly navHelpAdvice: Locator;
  readonly navBrokenDownGetHelp: Locator;

  // Hero / primary CTAs
  readonly heroStartMyQuoteBtn: Locator;       // Breakdown cover -> Start my quote
  readonly heroBookNowBtn: Locator;            // Service/repairs -> Book now
  readonly heroCarInsuranceQuoteBtn: Locator;  // Car insurance -> Get a quote
  readonly myRacAppDownloadBtn: Locator;       // myRAC app -> Download now

  // Promo / sales banners
  readonly saleBanner: Locator;
  readonly saleCountdown: Locator;

  // Trustpilot / reviews section
  readonly trustpilotSection: Locator;

  // Footer columns (Useful links)
  readonly footerBreakdownLinks: Locator;
  readonly footerBusinessLinks: Locator;
  readonly footerInsuranceLinks: Locator;
  readonly footerServiceMotLinks: Locator;
  readonly footerRoutePlannerLinks: Locator;
  readonly footerNewsAdviceLinks: Locator;
  readonly footerAppsLinks: Locator;
  readonly footerBuyingACarLinks: Locator;
  readonly footerRacShopLinks: Locator;
  readonly footerCompanyInfoLinks: Locator;
  readonly footerProductsServicesLinks: Locator;

  // Utility selectors
  readonly cookieAcceptBtn: Locator;
  readonly siteHeader: Locator;
  readonly siteFooter: Locator;

  constructor(page: Page) {
    this.page = page;

    // Top bar
    this.myRacLoginLink = page.getByRole('link', { name: /myRAC Login/i });
    this.salesPhoneLink = page.locator('a[href*="tel:"][href*="0330"]');

    // Main navigation (using accessible names)
    this.navBreakdownCover = page.getByRole('link', { name: /Breakdown cover/i });
    this.navInsurance = page.getByRole('link', { name: /Insurance/i });
    this.navServiceRepair = page.getByRole('link', { name: /Service.*Repair|Service.*maintenance/i });
    this.navRoutePlanner = page.getByRole('link', { name: /Route planner/i });
    this.navBuyingACar = page.getByRole('link', { name: /Buying a car/i });
    this.navShop = page.getByRole('link', { name: /Shop/i });
    this.navHelpAdvice = page.getByRole('link', { name: /Help.*advice/i });
    this.navBrokenDownGetHelp = page.getByRole('link', { name: /Broken down\? Get help/i });

    // Hero / primary CTAs
    this.heroStartMyQuoteBtn = page.getByRole('link', { name: /Start my quote/i });
    this.heroBookNowBtn = page.getByRole('link', { name: /Book now/i });
    this.heroCarInsuranceQuoteBtn = page.getByRole('link', { name: /Get a quote/i });
    this.myRacAppDownloadBtn = page.getByRole('link', { name: /Download now/i });

    // Promo / sales banners
    this.saleBanner = page.locator('[class*="sale"], [data-component*="sale"], [aria-label*="sale"]');
    this.saleCountdown = page.locator('[class*="countdown"], [data-component*="countdown"]');

    // Trustpilot / reviews
    this.trustpilotSection = page.locator('[class*="reviews"], [class*="trustpilot"], [aria-label*="reviews"]');

    // Footer columns: target containers and links within
    this.siteFooter = page.locator('footer');
    this.footerBreakdownLinks = this.siteFooter.locator('section:has-text("Breakdown cover") a');
    this.footerBusinessLinks = this.siteFooter.locator('section:has-text("Business") a');
    this.footerInsuranceLinks = this.siteFooter.locator('section:has-text("Insurance") a');
    this.footerServiceMotLinks = this.siteFooter.locator('section:has-text("Service") a, section:has-text("MOT") a');
    this.footerRoutePlannerLinks = this.siteFooter.locator('section:has-text("Route Planner") a');
    this.footerNewsAdviceLinks = this.siteFooter.locator('section:has-text("News"), section:has-text("Advice") a');
    this.footerAppsLinks = this.siteFooter.locator('section:has-text("Apps") a');
    this.footerBuyingACarLinks = this.siteFooter.locator('section:has-text("Buying a car") a');
    this.footerRacShopLinks = this.siteFooter.locator('section:has-text("RAC Shop") a, section:has-text("Tyres") a');
    this.footerCompanyInfoLinks = this.siteFooter.locator('section:has-text("Company Information") a');
    this.footerProductsServicesLinks = this.siteFooter.locator('section:has-text("Products & Services") a');

    // Utility
    this.cookieAcceptBtn = page.getByRole('button', { name: /Accept.*cookies|Agree/i });
    this.siteHeader = page.locator('header');
  }

  // Navigation
  async gotoHome() {
    await this.page.goto('https://www.rac.co.uk/', { waitUntil: 'domcontentloaded' });
    await this.acceptCookiesIfPresent();
    await expect(this.siteHeader).toBeVisible();
  }

  async openBreakdownCover() {
    await this.navBreakdownCover.click();
    await expect(this.page).toHaveURL(/\/breakdown-cover/i);
  }

  async openInsurance() {
    await this.navInsurance.click();
    await expect(this.page).toHaveURL(/\/insurance/i);
  }

  async openServiceRepair() {
    await this.navServiceRepair.click();
    await expect(this.page).toHaveURL(/service|repair|mobile-mechanic/i);
  }

  async openRoutePlanner() {
    await this.navRoutePlanner.click();
    await expect(this.page).toHaveURL(/\/route-planner/i);
  }

  async openBuyingACar() {
    await this.navBuyingACar.click();
    await expect(this.page).toHaveURL(/\/cars|vehicle-history-check/i);
  }

  async openShop() {
    await this.navShop.click();
    await expect(this.page).toHaveURL(/\/shop|tyres/i);
  }

  async openHelpAdvice() {
    await this.navHelpAdvice.click();
    await expect(this.page).toHaveURL(/help|advice|guides/i);
  }

  async openBrokenDownHelp() {
    await this.navBrokenDownGetHelp.click();
    await expect(this.page).toHaveURL(/broken-down/i);
  }

  // Hero CTAs
  async clickStartMyQuote() {
    await this.heroStartMyQuoteBtn.click();
    await expect(this.page).toHaveURL(/quote|breakdown-cover/i);
  }

  async clickBookNow() {
    await this.heroBookNowBtn.click();
    await expect(this.page).toHaveURL(/book|mobile-mechanic|service/i);
  }

  async clickCarInsuranceQuote() {
    await this.heroCarInsuranceQuoteBtn.click();
    await expect(this.page).toHaveURL(/car-insurance|quote/i);
  }

  async clickMyRacDownload() {
    await this.myRacAppDownloadBtn.click();
    await expect(this.page).toHaveURL(/app|download/i);
  }

  // Footer validations
  async expectFooterLinkGroupsVisible() {
    await expect(this.siteFooter).toBeVisible();
    await expect(this.footerBreakdownLinks.first()).toBeVisible();
    await expect(this.footerBusinessLinks.first()).toBeVisible();
    await expect(this.footerInsuranceLinks.first()).toBeVisible();
    await expect(this.footerServiceMotLinks.first()).toBeVisible();
    await expect(this.footerRoutePlannerLinks.first()).toBeVisible();
    await expect(this.footerNewsAdviceLinks.first()).toBeVisible();
    await expect(this.footerAppsLinks.first()).toBeVisible();
    await expect(this.footerBuyingACarLinks.first()).toBeVisible();
    await expect(this.footerRacShopLinks.first()).toBeVisible();
    await expect(this.footerCompanyInfoLinks.first()).toBeVisible();
    await expect(this.footerProductsServicesLinks.first()).toBeVisible();
  }

  // Utilities
  async acceptCookiesIfPresent() {
    if (await this.cookieAcceptBtn.count()) {
      await this.cookieAcceptBtn.click();
    }
  }
}
