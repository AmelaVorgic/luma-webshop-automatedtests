import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-object-models/LoginPage';
import { Consents } from '../../page-object-models/Consents';
import { generateAccessibilityReport } from '../../utils/axe-utils';

test.describe('Login Accessibility Tests', () => {
    let loginPage: LoginPage;
    let consents: Consents;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        consents = new Consents(page);
        await page.goto('/customer/account/login/');
        await page.waitForLoadState('networkidle');
        await consents.handleAllConsents();
    });

    test('should have accessible login form', async ({ page }) => {
        await generateAccessibilityReport(page, 'Login Form');
    });

    test('should have accessible login form validation', async ({ page }) => {
        await loginPage.submit();
        await loginPage.assertAllFieldsHaveValidation();
        await generateAccessibilityReport(page, 'Login Form Validation');
    });

    test('should have accessible login error state', async ({ page }) => {
        await loginPage.login('invalid@email.com', 'wrongpassword');
        await loginPage.assertInvalidLoginMessage();
        await generateAccessibilityReport(page, 'Login Error State');
    });

    test('should have accessible email format error', async ({ page }) => {
        await loginPage.fillEmail('invalid-email');
        await loginPage.submit();
        await loginPage.assertIsEmailFormatErrorShown();
        await generateAccessibilityReport(page, 'Email Format Error');
    });
}); 