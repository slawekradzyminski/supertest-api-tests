import { faker } from '@faker-js/faker';
import { Roles } from './roles';

export type User = {
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    roles: Roles[],
    email: string
}

export const getRandomUser = (): User => {
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        roles: [ Roles.ROLE_ADMIN, Roles.ROLE_CLIENT ],
        email: faker.internet.email()
    }
}