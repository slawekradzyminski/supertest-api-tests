import { apiServer } from "../utils/constants"

export const loginUserAndGetToken = async (username: string, password: string) => {
    const loginResponse = await apiServer
            .post('/users/signin')
            .send({
                username: username,
                password: password
            })
        return loginResponse.body.token
}