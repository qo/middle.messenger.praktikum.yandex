import HTTP from "../http";
import UserRequest from "../api-interfaces/users/change-profile";
import PasswordRequest from "../api-interfaces/users/change-profile-password";

const chatAPIInstance = new HTTP('https://ya-praktikum.tech/api/v2/user');

export default class UserAPI {
    public changeProfile(req: UserRequest): Promise<unknown> {
        return chatAPIInstance.put(
            '/profile',
            {
                data: req
            }
        );
    }
    public changePassword(req: PasswordRequest): Promise<unknown> {
        return chatAPIInstance.put(
            '/password',
            {
                data: req
            }
        );
    }
}

