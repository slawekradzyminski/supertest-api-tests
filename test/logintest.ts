import { apiServer } from '../utils/constants';
let { expect } = require('chai')

const wrongCredentialsMessage = 'Invalid username/password supplied'

describe('Login tests', () => {

    it('should successfully login', async () => {
        const loginResponse = await apiServer
            .post('/users/signin')
            .send({
                username: 'admin',
                password: 'admin'
            })
            
        expect(loginResponse.status).to.eq(200)
        expect(loginResponse.body.firstName).to.eq('Slawomir')
    });

    it('should fail to login if wrong password', async () => {
        const loginResponse = await apiServer
            .post('/users/signin')
            .send({
                username: 'admin',
                password: 'wrongPassword'
            })
            
        expect(loginResponse.status).to.eq(422)
        expect(loginResponse.body.message).to.eq(wrongCredentialsMessage)
    });

    it('should fail to login if wrong user', async () => {
        const loginResponse = await apiServer
            .post('/users/signin')
            .send({
                username: 'wrong',
                password: 'wrong'
            })
            
        expect(loginResponse.status).to.eq(422)
        expect(loginResponse.body.message).to.eq(wrongCredentialsMessage)
    });

    it('should return bad request with correct validation errors', async () => {
        const loginResponse = await apiServer
            .post('/users/signin')
            .send({
                username: '123',
                password: '123'
            })
            
        expect(loginResponse.status).to.eq(400)
        expect(loginResponse.body.username).to.eq('Minimum username length: 4 characters')
        expect(loginResponse.body.password).to.eq('Minimum password length: 4 characters')
    });

});