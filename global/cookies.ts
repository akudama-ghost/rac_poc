import { Page, Locator, expect } from '@playwright/test';

export class Cookies {
  readonly page: Page;

  readonly banner: Locator;
  readonly acceptAllBtn: Locator;
  readonly rejectNonEssentialBtn: Locator;
  readonly letMeChooseBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    // Cały baner
    this.banner = page.locator('#ensNotifyBanner');

    // Przyciski
    this.acceptAllBtn = page.locator('#ensAcceptAll'); // lub: page.getByTestId('ensYesThatsFineBtn')
    this.rejectNonEssentialBtn = page.locator('#ensRejectAll'); // lub: page.getByTestId('ensNoEssentialOnlyBtn')
    this.letMeChooseBtn = page.locator('#ensOpenModal'); // lub: page.getByTestId('ensLetMeChooseBtn')
  }

  async acceptAll() {
    await this.acceptAllBtn.waitFor({ state: 'visible' });
    await this.acceptAllBtn.click();
  }

  async rejectNonEssential() {
    await this.rejectNonEssentialBtn.waitFor({ state: 'visible' });
    await this.rejectNonEssentialBtn.click();
  }

  async letMeChoose() {
    await expect(this.letMeChooseBtn).toBeVisible();
    await this.letMeChooseBtn.click();
  }
}