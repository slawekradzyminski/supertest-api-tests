import { expect } from 'chai'
import { loginUserAndReturnToken, registerUser } from '../../helpers/apiOperations';
import { apiServer } from '../../utils/constants';
import { getAdminUser, getClientUser } from '../../utils/user';
import { faker } from '@faker-js/faker';

describe('PUT /users/{username}', () => {
    it('should allow admin to edit firstName, lastName, and email of a user', async () => {
        // given
        const userToEdit = getClientUser();
        await registerUser(userToEdit);

        const adminUser = getAdminUser();
        await registerUser(adminUser);
        const token = await loginUserAndReturnToken(adminUser);

        const editData = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            roles: userToEdit.roles,
            username: userToEdit.username
        };

        // when
        const response = await apiServer
            .put(`/users/${userToEdit.username}`)
            .set('Authorization', `Bearer ${token}`)
            .send(editData);

        // then
        expect(response.status).to.eq(200);
    });

});