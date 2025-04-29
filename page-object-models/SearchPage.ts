import { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class SearchPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private searchInput = '#search';
    private searchButton = 'button[title="Search"]';
    private productName = '.product-item-name a';
    private noResultsMessage = '.message.notice';

    async searchForProduct(query: string) {
        await this.page.waitForLoadState('networkidle');
        await this.page.fill(this.searchInput, query);
        await this.page.waitForSelector(this.searchButton, { state: 'visible' });
        await this.page.click(this.searchButton);
        await this.page.waitForLoadState('networkidle');
    }

    async getProductNames(): Promise<string[]> {
        const names = await this.page.locator(this.productName).allTextContents();
        return names.map(name => name.trim());
    }

    async isNoResultsMessageVisible(): Promise<boolean> {
        return await this.page.locator(this.noResultsMessage).isVisible();
    }

    async getNoResultsMessage(): Promise<string> {
        return await this.page.locator(this.noResultsMessage).textContent() || '';
    }

    async assertSearchResultsContainTerm(term: string) {
        const productNames = await this.getProductNames();
        await expect(productNames.some(name => name.toLowerCase().includes(term.toLowerCase()))).toBeTruthy();
    }

    async assertNoResultsMessage() {
        await expect(this.page.locator(this.noResultsMessage)).toBeVisible();
        await expect(this.page.locator(this.noResultsMessage)).toHaveText('Your search returned no results.');
    }
}
