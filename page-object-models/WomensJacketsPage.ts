import { expect, type Locator, type Page } from '@playwright/test';

export class WomensJacketsPage {
    readonly sortingBy: Locator;
    readonly sortAscButton: Locator;
    readonly sortDescButton: Locator;
    readonly productList: Locator;
    readonly productItem: Locator;

    constructor(page: Page) {
        this.sortingBy = page.getByLabel('Sort By');
        this.sortDescButton = page.getByRole('link', { name: 'Set Ascending Direction' });
        this.sortAscButton = page.getByRole('link', { name: 'Set Descending Direction' });
        this.productList = page.locator('.products.list.items.product-items');        ;
        this.productItem = page.locator('.product-item');

    }

    async sortBy(optionValue: string) {
        await this.sortingBy.selectOption(optionValue);
    }

    async sortAscending() {
        await this.sortAscButton.click();
    }

    async sortDescending() {
        await this.sortDescButton.click();
    }

    async getAllProductPrices(): Promise<number[]> {
        const prices = await this.productItem.locator('.price').allTextContents();
        return prices.map(price => parseFloat(price.replace('$', '').trim()));
    }

    async getAllProductNames(): Promise<string[]> {
        return await this.productItem.locator('.product-item-link').allTextContents();
    }

    async assertAscendingPriceSort() {
        const prices = await this.getAllProductPrices();
        const isSorted = prices.every((val, i, arr) => !i || arr[i - 1] <= val);
        expect(isSorted).toBe(true);
    }

    async assertDescendingPriceSort() {
        const prices = await this.getAllProductPrices();
        const isSorted = prices.every((val, i, arr) => !i || arr[i - 1] >= val);
        expect(isSorted).toBe(true);
    }

    async assertAscendingNameSort() {
        const names = await this.getAllProductNames();
        const sorted = [...names].sort((a, b) => a.localeCompare(b));
        expect(names).toEqual(sorted);
    }

    async assertDescendingNameSort() {
        const names = await this.getAllProductNames();
        const sorted = [...names].sort((a, b) => b.localeCompare(a));
        expect(names).toEqual(sorted);
    }

    async assertProductCount(expectedCount: number) {
        const count = await this.productItem.count();
        expect(count).toBe(expectedCount);
    }

    async clickProductByIndex(index: number) {
        await this.productItem.nth(index).click();
    }
}
