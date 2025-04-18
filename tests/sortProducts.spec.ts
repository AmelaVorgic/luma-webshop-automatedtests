import { test } from '@playwright/test';
import { WomensJacketsPage } from '../page-object-models/WomensJacketsPage';
import path from 'path';

test.use({ storageState: path.resolve(__dirname, '../playwright/.auth/user.json') });

let jacketsPage: WomensJacketsPage;


test.describe('Product Sorting on Jackets Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/women/tops-women/jackets-women.html');
    jacketsPage = new WomensJacketsPage(page);
  });

  test('sort by price ascending', async ({ page }) => {
    await jacketsPage.sortBy('price');
    await jacketsPage.sortAscending();
    await jacketsPage.assertAscendingPriceSort();
  });

});
