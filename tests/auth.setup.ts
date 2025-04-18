import { test as setup } from '@playwright/test';
import dotenv from 'dotenv';
import { LoginPage } from '../page-object-models/LoginPage';
import { CookiesBanner } from '../page-object-models/CookiesBanner';
import path from 'path';
import fs from 'fs';

dotenv.config();

const authFile = path.join(__dirname, '../playwright/.auth/user.json');
let cookiesBanner: CookiesBanner;

setup('authenticate', async ({ page }) => {
    let loginPage: LoginPage;

    const username = process.env.VALID_USERNAME as string;
    const password = process.env.VALID_PASSWORD as string;

    await page.goto('/customer/account/login/');
    cookiesBanner = new CookiesBanner(page);
    await page.waitForLoadState('networkidle');
    await cookiesBanner.acceptCookies(); 
    loginPage = new LoginPage(page);    
    await loginPage.login(username, password);
    
    fs.mkdirSync(path.dirname(authFile), { recursive: true });
    await page.context().storageState({ path: authFile });
});