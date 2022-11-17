export interface SignUpRequest extends Record<string, unknown> {
    "first_name": string,
    "second_name": string,
    "login": string,
    "email": string,
    "password": string,
    "phone": string
}

export interface SignUpResponse extends Record<string, unknown> {
    id: number
}