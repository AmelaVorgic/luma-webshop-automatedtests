import { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class SearchPage {
    searchInput: Locator;
    searchButton: Locator;
    productName: Locator;
    noResultsMessage: Locator;

    constructor(page: Page) {
        this.searchInput = page.locator('#search');
        this.searchButton = page.locator('button[title="Search"]');
        this.productName = page.locator('.product-item-name a');
        this.noResultsMessage = page.locator('.message.notice');
    }

    async searchForProduct(query: string) {
        await this.searchInput.fill(query);
        await this.searchButton.click();
        await this.searchInput.page().waitForLoadState('networkidle');
    }

    async getProductNames(): Promise<string[]> {
        const names = await this.productName.allTextContents();
        return names.map(name => name.trim());
    }

    async assertSearchResultsContainTerm(term: string) {
        const productNames = await this.getProductNames();
        await expect(productNames.some(name => name.toLowerCase().includes(term.toLowerCase()))).toBeTruthy();
    }

    async assertNoResultsMessage() {
        await expect(this.noResultsMessage).toBeVisible();
        await expect(this.noResultsMessage).toHaveText('Your search returned no results.');
    }
}
