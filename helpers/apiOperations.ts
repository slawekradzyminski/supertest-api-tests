import { expect } from "chai"
import { apiServer } from "../utils/constants"
import { User } from "../utils/user"

export const registerUser = async (user: User) => {
    const response = await apiServer
        .post('/users/signup')
        .send(user)

    expect(response.status).to.eq(201)
}

export const loginUserAndReturnToken = async (user: User) => {
    const response = await apiServer
        .post('/users/signin')
        .send({ username: user.username, password: user.password });

    expect(response.status).to.eq(200)
    expect(response.body.token).to.not.be.undefined
    return response.body.token
}