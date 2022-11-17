export interface SignInRequest extends Record<string, unknown> {
    "login": string,
    "password": string
}

export interface SignInResponse extends Record<string, unknown> {

}