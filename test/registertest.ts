import { apiServer } from '../utils/constants';
import { getAdminUser } from '../utils/users';
import { expect } from 'chai'

describe('Register tests', () => {

    it('should successfully register', async () => {
        const registerRequest = await apiServer
            .post('/users/signup')
            .send(getAdminUser())
            
        expect(registerRequest.status).to.eq(201)
        expect(registerRequest.body.token).not.be.empty
    });

});