import { test, expect } from '@playwright/test';
import { CreateNewAccountForm } from '../../page-object-models/CreateNewAccountForm';
import { Consents } from '../../page-object-models/Consents';
import { generateAccessibilityReport } from '../../utils/axe-utils';

test.describe('Account Creation Accessibility Tests', () => {
    let newAccountForm: CreateNewAccountForm;
    let consents: Consents;

    test.beforeEach(async ({ page }) => {
        await page.goto('/customer/account/create/');
        consents = new Consents(page);
        await consents.handleAllConsents();
        newAccountForm = new CreateNewAccountForm(page);
    });

    test('should have accessible account creation form', async ({ page }) => {
        await generateAccessibilityReport(page, 'Account Creation Form');
    });

    test('should have accessible form validation', async ({ page }) => {
        await newAccountForm.submitForm();
        await newAccountForm.shouldRequireAllFields();
        await generateAccessibilityReport(page, 'Account Creation Form Validation');
    });

    test('should have accessible password strength error', async ({ page }) => {
        await newAccountForm.fillPassword('testpassword');
        await newAccountForm.submitForm();
        await newAccountForm.assertIsWeakPasswordMessageShown();
        await generateAccessibilityReport(page, 'Password Strength Error');
    });

    test('should have accessible email format error', async ({ page }) => {
        await newAccountForm.fillEmail('invalid-email');
        await newAccountForm.submitForm();
        await newAccountForm.assertIsEmailFormatErrorShown();
        await generateAccessibilityReport(page, 'Email Format Error');
    });

    test('should have accessible password mismatch error', async ({ page }) => {
        await newAccountForm.fillPassword('StrongPassword123!');
        await newAccountForm.fillConfirmPassword('DifferentPassword123!');
        await newAccountForm.submitForm();
        await newAccountForm.assertisPasswordMismatchErrorShown();
        await generateAccessibilityReport(page, 'Password Mismatch Error');
    });
}); 