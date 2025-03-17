import { faker } from '@faker-js/faker';

export let validName: string;
export let validLastName: string;
export let validEmail: string;
export let invalidEmail: string;
export let registeredEmail: string;
export let validPassword: string;
export let invalidPassword: string;

validName = faker.name.firstName();
validLastName = faker.name.lastName();
validEmail = faker.internet.email();
invalidEmail = "usermail"
registeredEmail = "test@test.com"
validPassword = "Password1!";
invalidPassword = "test1";

