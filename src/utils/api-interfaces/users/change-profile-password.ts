export default interface PasswordRequest extends Record<string, unknown> {
    "oldPassword": string,
    "newPassword": string
}