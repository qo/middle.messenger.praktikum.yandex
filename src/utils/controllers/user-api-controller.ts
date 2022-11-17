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

export default UserAPIController {
    public getUser(req: UserRequest) {
        UserAPI.getUser()
    }
}