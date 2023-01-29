import { expect } from 'chai'
import { apiServer } from '../utils/constants';

describe('POST /users/signin', () => {
    it('should return 200 OK', async () => {
        // given
        const admin = 'admin'

        // when
        const response = await apiServer
            .post('/users/signin')
            .send({ username: admin, password: admin });

        // then
        expect(response.status).to.eq(200)
        expect(response.body.username).to.eq(admin)
    });

    it('should return 422 for wrong credentials', async () => {
        // when
        const response = await apiServer
            .post('/users/signin')
            .send({ username: 'wrong', password: 'wrong' });

        // then
        expect(response.status).to.eq(422)
        expect(response.body.message).to.eq('Invalid username/password supplied')
    });

    it('should return 400 for too short username', async () => {
        // when
        const response = await apiServer
            .post('/users/signin')
            .send({ username: 'w', password: 'wrong' });

        // then
        expect(response.status).to.eq(400)
        expect(response.body).to.deep.eq({
            username: "Minimum username length: 4 characters"
        })
    });
});