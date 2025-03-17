import { expect, type Locator, type Page } from '@playwright/test';

export class CreateNewAccountForm {
  private page: Page;
  firstNameInput: Locator;
  lastNameInput: Locator;
  emailInput: Locator;
  passwordInput: Locator;
  confirmPasswordInput: Locator;
  createAnAccountButton: Locator;

  firstNameError: Locator;
  lastNameError: Locator;
  emailError: Locator;
  passwordError: Locator;
  confirmPasswordError: Locator;

  errorMessages: Locator;
  passwordStrengthMeter: Locator;
  errorBanner: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('#firstname');
    this.lastNameInput = page.locator('#lastname');
    this.emailInput = page.locator('#email_address');
    this.passwordInput = page.locator('#password');
    this.confirmPasswordInput = page.locator('#password-confirmation');
    this.createAnAccountButton = page.locator('button[title="Create an Account"]');


    this.firstNameError = page.locator('#firstname-error');
    this.lastNameError = page.locator('#lastname-error');
    this.emailError = page.locator('#email_address-error');
    this.passwordError = page.locator('#password-error');
    this.confirmPasswordError = page.locator('#password-confirmation-error');


    this.errorMessages = page.locator('.mage-error');
    this.passwordStrengthMeter = page.locator('.password-strength-meter');
    this.errorBanner = page.locator('.message-error');
  }

  async fillAccountDetails(firstName: string, lastName: string, email: string, password: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async fillConfirmPassword(confirmPassword: string) {
    await this.confirmPasswordInput.fill(confirmPassword);
  }

  async submitForm() {
    await this.
    createAnAccountButton.click();
  }

  async clearForm() {
    await this.firstNameInput.clear();
    await this.lastNameInput.clear();
    await this.emailInput.clear();
    await this.passwordInput.clear();
    await this.confirmPasswordInput.clear();
  }  
  
}