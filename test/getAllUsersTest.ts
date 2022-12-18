import { apiServer } from '../utils/constants';
import { User } from '../utils/users';
import { expect } from 'chai'

describe('GET /users tests', () => {

    it('should get all user', async () => {
        // given
        const loginResponse = await apiServer
            .post('/users/signin')
            .send({
                username: 'admin',
                password: 'admin'
            })
        const token = loginResponse.body.token

        // when
        const getAllUsersResponse = await apiServer
            .get('/users')
            .set('Authorization', `Bearer ${token}`)

        // then
        expect(getAllUsersResponse.status).to.eq(200)
        const obtainedData = getAllUsersResponse.body as User[]
        expect(obtainedData).to.have.length.greaterThan(2)
    });

});