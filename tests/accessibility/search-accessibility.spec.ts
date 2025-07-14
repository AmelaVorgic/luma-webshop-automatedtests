import { test, expect } from '@playwright/test';
import { SearchPage } from '../../page-object-models/SearchPage';
import { Consents } from '../../page-object-models/Consents';
import { generateAccessibilityReport } from '../../utils/axe-utils';

test.describe('Search Accessibility Tests', () => {
    let searchPage: SearchPage;
    let consents: Consents;

    test.beforeEach(async ({ page }) => {
        searchPage = new SearchPage(page);
        consents = new Consents(page);
        await page.goto('/');
        await page.waitForLoadState('networkidle');
        await consents.handleAllConsents();
    });

    test('should have accessible homepage search', async ({ page }) => {
        await generateAccessibilityReport(page, 'Homepage Search');
    });

    test('should have accessible search results page', async ({ page }) => {
        await searchPage.searchForProduct('tee');
        await searchPage.assertSearchResultsContainTerm('tee');
        await generateAccessibilityReport(page, 'Search Results Page');
    });

    test('should have accessible no results page', async ({ page }) => {
        await searchPage.searchForProduct('nonexistentproduct123');
        await searchPage.assertNoResultsMessage();
        await generateAccessibilityReport(page, 'No Results Page');
    });
}); 