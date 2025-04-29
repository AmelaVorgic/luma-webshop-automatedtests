import { expect, type Locator, type Page } from '@playwright/test';

export class WomensJacketsPage {
  readonly page: Page;
  readonly sortingBy: Locator;
  readonly sortAscButton: Locator;
  readonly sortDescButton: Locator;
  readonly productList: Locator;
  readonly productItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortingBy = page.getByLabel('Sort By');
    this.sortDescButton = page.getByRole('link', { name: ' Set Descending Direction' });
    this.sortAscButton = page.getByRole('link', { name: ' Set Ascending Direction' });
    this.productList = page.locator('.products.list.items.product-items');
    this.productItem = page.locator('.product-item');

  }

  async sortBy(optionValue: string) {
    await this.page.waitForLoadState('networkidle');
    await this.sortingBy.selectOption(optionValue);
    await this.productItem.first().locator('.price').first().waitFor({ state: 'visible' });

  }

  async sortDescending() {
    await this.page.waitForLoadState('networkidle');
    await this.sortDescButton.click();
    await this.productItem.first().locator('.price').first().waitFor({ state: 'visible' });

  }

  async getAllProductPrices(): Promise<number[]> {
    const prices: number[] = [];

    const productCards = this.page.locator('.products-grid .product-item');
    const count = await productCards.count();

    for (let i = 0; i < count; i++) {
      const priceLocator = productCards.nth(i).locator('.price').first();

      if (await priceLocator.count()) {
        const priceText = await priceLocator.innerText();
        const cleaned = priceText.replace(/[^0-9.]/g, '').trim();
        const price = parseFloat(cleaned);
        prices.push(price);
      }
    }
    return prices;
  }

  async assertDescendingPriceSort() {
    const prices = await this.getAllProductPrices();
    const isSortedDesc = prices.every((val, i, arr) => i === 0 || val <= arr[i - 1]);
    expect(isSortedDesc).toBe(true);
  }
}