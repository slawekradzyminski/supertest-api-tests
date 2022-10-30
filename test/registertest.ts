import { apiServer } from '../utils/constants';
import { getRandomUser } from '../utils/users';
let { expect } = require('chai')

describe('Register tests', () => {

    it('should successfully register', async () => {
        const registerRequest = await apiServer
            .post('/users/signup')
            .send(getRandomUser())
            
        expect(registerRequest.status).to.eq(201)
        expect(registerRequest.body.token).not.be.empty
    });

});