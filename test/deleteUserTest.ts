import { expect } from 'chai'
import { loginUserAndReturnToken, registerUser } from '../helpers/apiOperations';
import { apiServer } from '../utils/constants';
import { getAdminUser, getClientUser } from '../utils/user';

describe('DELETE /users/{username}', () => {
    it('should return 403 for queries without token', async () => {
        // when
        const response = await apiServer
            .delete('/users/anyUsername')

        // then
        expect(response.status).to.eq(403)
    });

    it('should get 403 for invalid token', async () => {
        // given
        const user = getClientUser()
        registerUser(user)

        // when
        const response = await apiServer
            .delete(`/users/${user.username}`)
            .set('Authorization', `Bearer fakeToken`)

        // then
        expect(response.status).to.eq(403)
    });

    it('should get 200 for admin', async () => {
        // given
        const userToDelete = getAdminUser()
        await registerUser(userToDelete)

        const userPerformingDelete = getAdminUser()
        await registerUser(userPerformingDelete)
        const token = await loginUserAndReturnToken(userPerformingDelete)

        // when
        const response = await apiServer
            .delete(`/users/${userToDelete.username}`)
            .set('Authorization', `Bearer ${token}`)

        // then
        expect(response.status).to.eq(204)
    });

    it('should get 403 for client', async () => {
        // given
        const userToDelete = getAdminUser()
        await registerUser(userToDelete)

        const userPerformingDelete = getClientUser()
        await registerUser(userPerformingDelete)
        const token = await loginUserAndReturnToken(userPerformingDelete)

        // when
        const response = await apiServer
            .delete(`/users/${userToDelete.username}`)
            .set('Authorization', `Bearer ${token}`)

        // then
        expect(response.status).to.eq(403)
    });

});