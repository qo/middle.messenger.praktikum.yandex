export default interface ProfileDataEntryProps {
    title: string,
    type: "email" | "login" | "text" | "tel" | "name",
    placeholder: string
};