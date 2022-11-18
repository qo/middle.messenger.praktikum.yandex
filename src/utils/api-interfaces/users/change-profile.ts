export default interface UserRequest extends Record<string, unknown> {
    "first_name": string,
    "second_name": string,
    "display_name": string,
    "login": string,
    "email": string,
    "phone": string
}