import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
    emailInput: Locator;
    passwordInput: Locator;
    signInButton: Locator;
    errorMessage: Locator;
    generalErrorMessage: Locator;
    emailError: Locator;

    constructor(page) {
        this.emailInput = page.locator('#email');
        this.passwordInput = page.locator('[name="login[password]"]');
        this.signInButton = page.locator('.action.login.primary');
        this.errorMessage = page.locator('.mage-error');
        this.generalErrorMessage = page.locator('.message-error');
        this.emailError = page.locator('#email-error');
    }

    async fillEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async submit() {
        await this.signInButton.click();
    }

    async login(email, password) {
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.submit();
    }

    async assertAllFieldsHaveValidation() {
        const errorMessages = await this.errorMessage.allTextContents();
        await expect(errorMessages).toContain('This is a required field.');
    }

    async assertInvalidLoginMessage() {
        await expect(this.generalErrorMessage).toBeVisible();
        await expect(this.generalErrorMessage).toContainText('The account sign-in was incorrect');
    }

    async assertIsEmailFormatErrorShown() {
        await expect(this.emailError).toHaveText('Please enter a valid email address (Ex: johndoe@domain.com).');
    }

    async assertIsOnCustomerAccount(page: Page) {
        await expect(page).toHaveURL(/.*customer\/account/);
    }
}

