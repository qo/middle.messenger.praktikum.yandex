import HTTP from "../http";
import { SignInRequest } from "../api-interfaces/auth/signin";
import { SignUpRequest } from "../api-interfaces/auth/signup";

const authAPIInstance = new HTTP("https://ya-praktikum.tech/api/v2/auth");

export default class AuthAPI {
	public signIn(req: SignInRequest): Promise<unknown> {
		return authAPIInstance.post(
			"/signin",
			{
				data: req,
			},
		);
	}

	public signUp(req: SignUpRequest): Promise<unknown> {
		return authAPIInstance.post(
			"/signup",
			{
				data: req,
			},
		);
	}

	public getUser(): Promise<string> {
		return authAPIInstance.get(
			"/user",
		);
	}

	public logOut() {
		return authAPIInstance.post(
			"/logout",
		);
	}
}
