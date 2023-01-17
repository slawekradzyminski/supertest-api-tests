import { expect } from 'chai'
import { registerUser } from '../helpers/apiOperations';
import { apiServer } from '../utils/constants';
import { getAdminUser } from '../utils/user';

describe('POST /users/signup', () => {
    it('should return 200 OK', async () => {
        // given
        const user = getAdminUser()

        // when
        const response = await apiServer
            .post('/users/signup')
            .send(user);

        // then
        expect(response.status).to.eq(201)
        expect(response.body.token).to.not.be.undefined
    });

    it('should return 422 if user already exists', async () => {
        // given
        const user = getAdminUser()
        await registerUser(user)

        // when
        const response = await apiServer
            .post('/users/signup')
            .send({
                ...getAdminUser(),
                username: user.username
            });

        // then
        expect(response.status).to.eq(422)
        expect(response.body.message).to.eq('Username is already in use')
    });

});