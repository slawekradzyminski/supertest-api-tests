import { expect } from 'chai'
import { registerUser } from '../../helpers/apiOperations';
import { apiServer } from '../../utils/constants';
import { getAdminUser } from '../../utils/user';

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

    it('should return 400 for too short username and wrongly formatted email', async () => {
        // given
        const user = getAdminUser();
        const modifiedUser = {
            ...user,
            username: 'usr', // too short username
            email: 'notanemail' // wrongly formatted email
        };
    
        // when
        const response = await apiServer
            .post('/users/signup')
            .send(modifiedUser);
    
        // then
        expect(response.status).to.eq(400);
        expect(response.body).to.deep.eq({
            email: "must be a well-formed email address",
            username: "Minimum username length: 4 characters"
        });
    });

});