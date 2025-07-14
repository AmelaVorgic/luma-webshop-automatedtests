import { test } from '@playwright/test';
import { WomensJacketsPage } from '../page-object-models/WomensJacketsPage';
import { Consents } from '../page-object-models/Consents';
import path from 'path';

test.use({ storageState: path.resolve(__dirname, '../playwright/.auth/user.json') });

let jacketsPage: WomensJacketsPage;
let consents: Consents;

test.describe('Product Sorting on Jackets Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/women/tops-women/jackets-women.html');
    consents = new Consents(page);
    await page.waitForLoadState('domcontentloaded');
    await consents.handleAllConsents();
    jacketsPage = new WomensJacketsPage(page);
  });

  test('sort by price descending', async ({ page }) => {
    await jacketsPage.sortDescending();
    await jacketsPage.sortBy('price');
    await jacketsPage.assertDescendingPriceSort();
  });
});