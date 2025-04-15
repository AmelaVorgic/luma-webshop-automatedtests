import { Page } from '@playwright/test';
import { CreateNewAccountForm } from '../page-object-models/CreateNewAccountForm';
import { CookiesBanner } from '../page-object-models/CookiesBanner';
import { faker } from '@faker-js/faker';

export let password: string;
export async function registerNewTestUser(page: Page) {
    await page.goto('https://magento.softwaretestingboard.com/customer/account/create/');
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
