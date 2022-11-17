import AuthAPI from "../api/auth-api";
import {SignInRequest} from "../api-interfaces/auth/signin";
import {SignUpRequest} from "../api-interfaces/auth/signup";

const authAPI = new AuthAPI();

export default class AuthAPIController {
    public signIn(req: SignInRequest) {
        return authAPI.signIn(req)
    }
    public signUp(req: SignUpRequest) {
        return authAPI.signUp(req)
    }
    public getUser() {
        return authAPI.getUser()
    }
    public logout() {
        return authAPI.logOut()
    }
}