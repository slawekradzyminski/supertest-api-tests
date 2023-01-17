import { expect } from 'chai'
import { loginUserAndReturnToken, registerUser } from '../helpers/apiOperations';
import { apiServer } from '../utils/constants';
import { getAdminUser, getClientUser } from '../utils/user';

describe('GET /users', () => {
    it('should return 403 for queries without token', async () => {
        // when
        const response = await apiServer
            .get('/users')

        // then
        expect(response.status).to.eq(403)
    });

    it('should return 200 for admin', async () => {
        // given
        const user = getAdminUser()
        await registerUser(user)
        const token = await loginUserAndReturnToken(user)

        // when
        const response = await apiServer
            .get('/users')
            .set('Authorization', `Bearer ${token}`)

        // then
        expect(response.status).to.eq(200)
    });

    it('should return 200 for client', async () => {
        // given
        const user = getClientUser()
        await registerUser(user)
        const token = await loginUserAndReturnToken(user)

        // when
        const response = await apiServer
            .get('/users')
            .set('Authorization', `Bearer ${token}`)

        // then
        expect(response.status).to.eq(200)
    });

    it('should get 403 for invalid token', async () => {
        // when
        const response = await apiServer
            .get('/users')
            .set('Authorization', `Bearer fakeToken`)

        // then
        expect(response.status).to.eq(403)
    });

});