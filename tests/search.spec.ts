import { test, expect } from '@playwright/test';
import { SearchPage } from '../page-object-models/SearchPage';
import { LoginPage } from '../page-object-models/LoginPage';
import { Consents } from '../page-object-models/Consents';

test.describe('Product Search Functionality', () => {
    let searchPage: SearchPage;
    let loginPage: LoginPage;
    let consents: Consents;

    test.beforeEach(async ({ page }) => {
        searchPage = new SearchPage(page);
        loginPage = new LoginPage(page);
        consents = new Consents(page);
        await page.goto('/');
        await page.waitForLoadState('networkidle');
        await consents.handleAllConsents();
    });

    test('should find products with valid search term', async () => {
        await searchPage.searchForProduct('tee');
        await searchPage.assertSearchResultsContainTerm('tee');
    });

    test('should show no results message for invalid search term', async () => {
        await searchPage.searchForProduct('nonexistentproduct123');
        await searchPage.assertNoResultsMessage();
    });
}); 