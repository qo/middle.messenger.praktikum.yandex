import UserAPI from "../api/user-api";
import UserRequest from "../api-interfaces/users/change-profile";
import PasswordRequest from "../api-interfaces/users/change-profile-password";

const userAPI = new UserAPI();

export default class UserAPIController {
    async changeProfile(req: UserRequest) {
        return await userAPI.changeProfile(req);
    }
    async changeAvatar(req: FormData) {
        return await userAPI.changeAvatar(req);
    }
    async changePassword(req: PasswordRequest) {
        return await userAPI.changePassword(req);
    }
}