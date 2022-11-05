export default interface ChatMessageProps {
    isMine: boolean,
    time: string,
    type: "text" | "image",
    text?: string,
    image?: any,
    status?: "not sent" | "sent" | "read"
};