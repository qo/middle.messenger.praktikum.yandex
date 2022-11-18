import UserAPI from "../api/user-api";
import UserRequest from "../api-interfaces/users/change-profile";
import PasswordRequest from "../api-interfaces/users/change-profile-password";

const userAPI = new UserAPI();

export default class UserAPIController {
    public changeProfile(req: UserRequest) {
        return userAPI.changeProfile(req);
    }
    public changePassword(req: PasswordRequest) {
        return userAPI.changePassword(req);
    }
}