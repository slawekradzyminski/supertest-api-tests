import { faker } from '@faker-js/faker';

export const getRandomUser = () => {
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        roles: [ 'ROLE_CLIENT', 'ROLE_ADMIN' ],
        email: faker.internet.email()
    }
}