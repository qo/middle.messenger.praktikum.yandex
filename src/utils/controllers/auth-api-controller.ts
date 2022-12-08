import AuthAPI from "../api/auth-api";
import {SignInRequest} from "../api-interfaces/auth/signin";
import {SignUpRequest} from "../api-interfaces/auth/signup";

const authAPI = new AuthAPI();

export default class AuthAPIController {
    async signIn(req: SignInRequest) {
        return await authAPI.signIn(req)
    }
    async signUp(req: SignUpRequest) {
        return await authAPI.signUp(req)
    }
    async getUser() {
        return await authAPI.getUser();
    }
    async logOut() {
        return await authAPI.logOut()
    }
}