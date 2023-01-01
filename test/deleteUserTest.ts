import { apiServer } from '../utils/constants';
import { getRandomUser } from '../utils/users';
import { expect } from 'chai'
import { loginUserAndGetToken } from '../helpers/loginHelper';

describe('DELETE /users/', () => {

    // 1. stworzyć uzytkownika ktorego usuniemy
    // 2. zalogować się jako uzytkownik który ma uprawnienia do usuwania
    // 3. usunięcie uzytkownika

    it('should successfully delete user', async () => {
        // given
        // 1
        const user = getRandomUser()
        await apiServer.post('/users/signup').send(user)

        // 2
        const token = await loginUserAndGetToken('admin', 'admin')

        // when 3
        const deleteUserRequest = await apiServer
            .delete(`/users/${user.username}`)
            .set('Authorization', `Bearer ${token}`)

        // then
        expect(deleteUserRequest.status).to.eq(204)
        const getSingleUserRequest = await apiServer
            .get(`/users/${user.username}`)
            // .query({ 
            //     val1: 'Test1',
            //     val2: 'Test2',
            //     val3: 'Test3'
            // })
            .set('Authorization', `Bearer ${token}`)

        expect(getSingleUserRequest.status).to.eq(404)
    });

    it("should return 404 if user doesn't exist", async () => {
        // given
        const token = await loginUserAndGetToken('admin', 'admin')

        // when 3
        const deleteUserRequest = await apiServer
            .delete('/users/invalidUser')
            .set('Authorization', `Bearer ${token}`)

        // then
        expect(deleteUserRequest.status).to.eq(404)
    });

});