import { Roles } from "./roles"
import { faker } from '@faker-js/faker';

export interface User {
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
    roles: Roles[]
}

export const getAdminUser = (): User => {
    return {
        username: faker.internet.userName(),
        password: faker.internet.password(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        roles: [Roles.ROLE_ADMIN]
    }
}

export const getClientUser = (): User => {
    return {
        ...getAdminUser(),
        roles: [Roles.ROLE_CLIENT]
    }
}