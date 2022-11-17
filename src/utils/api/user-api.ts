import HTTP from "../http";
import BaseAPI from "./base-api";

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

const chatAPIInstance = new HTTP('https://ya-praktikum.tech/api/v2/user');

export default class UserAPI extends BaseAPI {
    public getProfile(req: UserRequest): UserResponse {
        const res = chatAPIInstance.put(
            '/profile',
            {
                data: req
            }
        );
        return res;
    }
}

