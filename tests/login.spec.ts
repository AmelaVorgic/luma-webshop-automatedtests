import { BrowserContext, test } from '@playwright/test';
import { CreateNewAccountForm } from '../page-object-models/CreateNewAccountForm';
import { LoginPage } from '../page-object-models/LoginPage';
import { CookiesBanner } from '../page-object-models/CookiesBanner';
import { validEmail, invalidEmail, invalidPassword } from '../utils/auth_user_credentials';
import { registerNewTestUser } from '../utils/registered_user';

let registeredUser: { firstName: string; lastName: string; email: string; password: string };
let browserContext: BrowserContext;
let cookiesBanner: CookiesBanner;

test.describe('Login Tests', () => {
    let loginPage: LoginPage;

    test.beforeAll(async ({ browser }) => {
        browserContext = await browser.newContext();
        const page = await browserContext.newPage();
        registeredUser = await registerNewTestUser(page)
        await page.close();
    });

    test.beforeEach(async ({ page }) => {
        await page.goto('/customer/account/login/');
        cookiesBanner = new CookiesBanner(page);
        await page.waitForLoadState('networkidle');
        await cookiesBanner.acceptCookies(); loginPage = new LoginPage(page);
    });

    test('Verify required field validation', async ({ page: Page }) => {
        await loginPage.submit();
        await loginPage.assertAllFieldsHaveValidation();
    });

    test('Verify invalid login message', async ({ page }) => {
        await loginPage.login(validEmail, invalidPassword);
        await loginPage.assertInvalidLoginMessage();
    });

    test('Verify valid email format error', async ({ page }) => {
        await loginPage.fillEmail(invalidEmail);
        await loginPage.submit();
        await loginPage.shouldShowEmailFormatError();
    });

    test('Verify successful login', async ({ page }) => {
        await loginPage.login(registeredUser.email, registeredUser.password);
        await loginPage.assertIsOnCustomerAccount;
    });

});
