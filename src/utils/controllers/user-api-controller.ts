import UserAPI from "../api/user-api";

interface UserRequest {
    "first_name": string,
    "second_name": string,
    "display_name": string,
    "login": string,
    "email": string,
    "phone": string
}

interface UserResponse {
    "id": number,
    "first_name": string,
    "second_name": string,
    "display_name": string,
    "login": string,
    "email": string,
    "phone": string,
    "avatar": string
}

export default class UserAPIController {
    public getUser(req: UserRequest): UserResponse {
        return UserAPI.getUser(req);
    }
}