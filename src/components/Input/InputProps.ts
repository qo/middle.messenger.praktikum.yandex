export default interface InputProps {
    type: "email" | "login" | "password" | "tel" | "name" | "text" | "file",
    placeholder?: string,
    label?: string
};