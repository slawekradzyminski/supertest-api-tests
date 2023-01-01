import { Roles } from "./roles"

export type EditUserRequest = {
    firstName: string,
    lastName: string,
    roles: Roles[],
    email: string,
    username: string
}