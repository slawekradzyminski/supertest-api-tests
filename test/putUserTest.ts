import { apiServer } from '../utils/constants';
import { getAdminUser } from '../utils/users';
import { expect } from 'chai'
import { loginUserAndGetToken } from '../helpers/loginHelper';
import { faker } from '@faker-js/faker';

describe('PUT /users/{}', () => {

    // 1. stworzyć uzytkownika ktorego zaktualizujemy
    // 2. logujemy się jako uzytkownik ktorego wyedytujemy
    // 3. aktualizacja uzytkownika (PUT)
    // 4. upewnienie się ze dane zostaly zapisane za pomoca geta albo próby zalogowania się na zmienione hasło

    it('should successfully edit user', async () => {
        // given
        // 1
        const user = getAdminUser()
        await apiServer.post('/users/signup').send(user)

        // 2
        const token = await loginUserAndGetToken(user.username, user.password)
        const newFirstName = faker.name.firstName()

        // when 3
        const editUserRequest = await apiServer
            .put(`/users/${user.username}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                firstName: newFirstName,
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                roles: user.roles,
                username: user.username
            })

        // then
        expect(editUserRequest.status).to.eq(200)
        const getSingleUserRequest = await apiServer
            .get(`/users/${user.username}`)
            .set('Authorization', `Bearer ${token}`)

        expect(getSingleUserRequest.status).to.eq(200)
        expect(getSingleUserRequest.body.firstName).to.eq(newFirstName)
    });

});