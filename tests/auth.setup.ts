import { test as setup } from '@playwright/test';
import dotenv from 'dotenv';
import { LoginPage } from '../page-object-models/LoginPage';
import { Consents } from '../page-object-models/Consents';
import path from 'path';
import fs from 'fs';

dotenv.config();

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
    let loginPage: LoginPage;
    let consents: Consents;

    const username = process.env.VALID_USERNAME as string;
    const password = process.env.VALID_PASSWORD as string;

    await page.goto('/customer/account/login/');
    consents = new Consents(page);
    await page.waitForLoadState('networkidle');
    await consents.handleAllConsents();
    loginPage = new LoginPage(page);
    await loginPage.login(username, password);

    fs.mkdirSync(path.dirname(authFile), { recursive: true });
    await page.context().storageState({ path: authFile });
});