import HTTP from "../http";
import UserRequest from "../api-interfaces/users/change-profile";
import PasswordRequest from "../api-interfaces/users/change-profile-password";

const userAPIInstance = new HTTP('https://ya-praktikum.tech/api/v2/user');

export default class UserAPI {
    public changeProfile(req: UserRequest): Promise<unknown> {
        return userAPIInstance.put(
            '/profile',
            {
                data: req
            }
        );
    }
    public changeAvatar(req: FormData): Promise<unknown> {
        return userAPIInstance.put(
            '/profile/avatar',
            {
                data: req
            }
        );
    }
    public changePassword(req: PasswordRequest): Promise<unknown> {
        return userAPIInstance.put(
            '/password',
            {
                data: req
            }
        );
    }
}

