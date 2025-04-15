import { Page } from '@playwright/test';
import { CreateNewAccountForm } from '../page-object-models/CreateNewAccountForm';
import { LoginPage } from '../page-object-models/LoginPage';
import { CookiesBanner } from '../page-object-models/CookiesBanner';
import { faker } from '@faker-js/faker';
import * as fs from 'fs';

export let password: string;

const COOKIE_FILE_PATH = 'cookies.json';

export async function registerNewTestUser(page: Page) {
    await page.goto('/customer/account/create/');
    const cookiesBanner = new CookiesBanner(page);
    await page.waitForLoadState('networkidle');
    await cookiesBanner.acceptCookies();

    const newAccountForm = new CreateNewAccountForm(page);

    const registeredUser = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: "Password1!"
    };

    await newAccountForm.registerNewUser(
        registeredUser.firstName,
        registeredUser.lastName,
        registeredUser.email,
        registeredUser.password
    );

    return registeredUser;

}

export async function loginTestUser(page: Page, registeredUser: { email: string; password: string }) {
    await page.goto('/customer/account/login/');
    const cookiesBanner = new CookiesBanner(page);
    await page.waitForLoadState('networkidle');
    await cookiesBanner.acceptCookies();

    const loginPage = new LoginPage(page);
    await loginPage.login(registeredUser.email, registeredUser.password);

    const cookies = await page.context().cookies();
    fs.writeFileSync(COOKIE_FILE_PATH, JSON.stringify(cookies, null, 2));
}


