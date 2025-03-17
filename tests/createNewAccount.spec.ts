import { test, expect } from '@playwright/test';
import { CreateNewAccountForm } from '../page-object-models/CreateNewAccountForm';
import { CookiesBanner } from '../page-object-models/CookiesBanner';
import {validName, validLastName, validEmail, invalidEmail, registeredEmail, validPassword, invalidPassword } from '../utils/auth_user';

test.describe('Account Creation Tests', () => {
  let newAccountForm: CreateNewAccountForm;
  let cookiesBanner: CookiesBanner;

  test.beforeEach(async ({ page }) => {
    await page.goto('/customer/account/create/');
    cookiesBanner = new CookiesBanner(page);
    await page.waitForLoadState('networkidle');
    await cookiesBanner.acceptCookies();
    newAccountForm = new CreateNewAccountForm(page);
  });

  test('required fields in form cannot be left empty', async ({ page }) => {
    await newAccountForm.submitForm();
    const errorMessages = await newAccountForm.errorMessages.allTextContents();
    expect(errorMessages).toContain('This is a required field.');
  });

   test('password cannot contain only lowercase letters', async ({ page }) => {
     await newAccountForm.fillPassword('testpassword');
     await newAccountForm.submitForm();
     await expect(newAccountForm.passwordStrengthMeter).toBeVisible();
     await expect(newAccountForm.passwordStrengthMeter).toContainText('Weak');
     await expect(newAccountForm.passwordError).toHaveText('Minimum of different classes of characters in password is 3. Classes of characters: Lower Case, Upper Case, Digits, Special Characters.');
   });

   test('password cannot contain only uppercase letters', async ({ page }) => {
     await newAccountForm.fillPassword('TESTPASSWORD');
     await newAccountForm.submitForm();
     await expect(newAccountForm.passwordStrengthMeter).toBeVisible();
     await expect(newAccountForm.passwordStrengthMeter).toContainText('Weak');
     await expect(newAccountForm.passwordError).toHaveText('Minimum of different classes of characters in password is 3. Classes of characters: Lower Case, Upper Case, Digits, Special Characters.');
   });

   test('password cannot contain only lowercase and uppercase letters', async ({ page }) => {
     await newAccountForm.fillPassword('testPASSWORD');
     await newAccountForm.submitForm();
     await expect(newAccountForm.passwordStrengthMeter).toBeVisible();
     await expect(newAccountForm.passwordStrengthMeter).toContainText('Weak');
     await expect(newAccountForm.passwordError).toHaveText('Minimum of different classes of characters in password is 3. Classes of characters: Lower Case, Upper Case, Digits, Special Characters.');
   });

   test('valid password cannot have less than 8 valid characters or less than 3 character groups', async ({ page }) => {
     await newAccountForm.fillPassword('Test1');
     await newAccountForm.submitForm();
     await expect(newAccountForm.passwordStrengthMeter).toBeVisible();
     await expect(newAccountForm.passwordStrengthMeter).toContainText('Weak');
     await expect(newAccountForm.passwordError).toHaveText('Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored.');
   });

   test('password must have at least three of categories: uppercase letter, lowercase letter, number, special character, and length of 8 characters for account creation', async ({ page }) => {
     await newAccountForm.fillPassword(validPassword);
     await newAccountForm.submitForm();
     await expect(newAccountForm.passwordStrengthMeter).toBeVisible();
     await expect(newAccountForm.passwordStrengthMeter).toContainText('Strong');
   });

  test('confirm password must match the previously entered password', async ({ page }) => {
    await newAccountForm.fillPassword(validPassword);
    await newAccountForm.fillConfirmPassword(invalidPassword);
    await newAccountForm.submitForm();
    await expect(newAccountForm.confirmPasswordError).toHaveText('Please enter the same value again.');
  });

  test('email must be in valid email format', async ({ page }) => {
    await newAccountForm.fillEmail(invalidEmail);
    await newAccountForm.submitForm();
    await expect(newAccountForm.emailError).toHaveText('Please enter a valid email address (Ex: johndoe@domain.com).');
  });

  test('user can create an account with a new email address', async ({ page }) => {
    
    await newAccountForm.fillAccountDetails(validName, validLastName, validEmail, validPassword);
    await newAccountForm.submitForm();
    await expect(page).toHaveURL(/.*customer\/account/);
  });

  test('user cannot create an account with an already registered email', async ({ page }) => {

    await newAccountForm.fillAccountDetails(validName, validLastName, registeredEmail, validPassword);
    await newAccountForm.submitForm();
    await expect(newAccountForm.errorBanner).toHaveText('There is already an account with this email address. If you are sure that it is your email address, click here to get your password and access your account.');
  });

});