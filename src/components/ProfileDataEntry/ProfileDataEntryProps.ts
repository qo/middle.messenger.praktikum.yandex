export default interface ProfileDataEntryProps {
    title: string,
    type: "email" | "login" | "password" | "tel" | "name" | "text",
    placeholder: string
};