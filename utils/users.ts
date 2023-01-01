import { faker } from '@faker-js/faker';
import { Roles } from './roles';

export type LoginRequest = {
    username: string,
    password: string
}

export type User = {
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    roles: Roles[],
    email: string
}

export const getAdminUser = (): User => {
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        roles: [ Roles.ROLE_ADMIN ],
        email: faker.internet.email()
    }
}

export const getClientUser = (): User => {
    const admin = getAdminUser()
    return {
        ...admin,
        roles: [Roles.ROLE_CLIENT]
    }
}