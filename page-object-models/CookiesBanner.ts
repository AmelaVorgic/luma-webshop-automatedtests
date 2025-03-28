import { type Locator, type Page } from '@playwright/test';

export class CookiesBanner {
  cookieBanner: Locator;
  agreeButton: Locator;
  disagreeButton: Locator;

  constructor(page: Page) {
    this.cookieBanner = page.locator('#qc-cmp2-ui');
    this.agreeButton = page.getByRole('button', { name: 'AGREE', exact: true });
    this.disagreeButton = page.getByRole('button', { name: 'DISAGREE' });
  }

  async acceptCookies() {
    if (await this.cookieBanner.isVisible()) {
      await this.agreeButton.click();
    }
  }

  async rejectCookies() {
    if (await this.cookieBanner.isVisible()) {
      await this.disagreeButton.click();
    }
  }

}