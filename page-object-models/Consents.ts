import { type Locator, type Page } from '@playwright/test';

export class Consents {
  cookieBanner: Locator;
  agreeButton: Locator;
  disagreeButton: Locator;
  consentButton: Locator;
  googleAdsCloseButton: Locator;

  constructor(page: Page) {
    this.cookieBanner = page.locator('#qc-cmp2-ui');
    this.agreeButton = page.getByRole('button', { name: 'AGREE', exact: true });
    this.disagreeButton = page.getByRole('button', { name: 'DISAGREE' });
    this.consentButton = page.locator('button.fc-button.fc-cta-consent.fc-primary-button');
    this.googleAdsCloseButton = page.locator('[aria-label="Close ad"], [aria-label="Close"], .adsbygoogle iframe');
  }

  async closeGoogleAds() {
    try {
      const closeButtons = this.googleAdsCloseButton.page().locator('[aria-label="Close ad"], [aria-label="Close"]');
      const count = await closeButtons.count();
      
      for (let i = 0; i < count; i++) {
        const button = closeButtons.nth(i);
        if (await button.isVisible()) {
          await button.click();
          await this.googleAdsCloseButton.page().waitForTimeout(1000);
        }
      }
    } catch (error) {
    }
  }

  async acceptConsent() {
    if (await this.consentButton.isVisible()) {
      await this.consentButton.click();
    }
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

  async handleAllConsents() {
    await this.acceptConsent();
    await this.acceptCookies();
    await this.closeGoogleAds();
  }
} 