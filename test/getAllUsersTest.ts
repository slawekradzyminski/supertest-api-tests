import { apiServer } from '../utils/constants';
import { User } from '../utils/users';
import { expect } from 'chai'
import { loginUserAndGetToken } from '../helpers/loginHelper';

describe('GET /users tests', () => {

    it('should get all user', async () => {
        // given
        const token = await loginUserAndGetToken('admin', 'admin')

        // when
        const getAllUsersResponse = await apiServer
            .get('/users')
            .set('Authorization', `Bearer ${token}`)

        // then
        expect(getAllUsersResponse.status).to.eq(200)
        const obtainedData = getAllUsersResponse.body as User[]
        expect(obtainedData).to.have.length.greaterThanOrEqual(1)
    });

});