import ILastMessage from "./ILastMessage";

export default interface IChat {
    id: number;
    title: string;
    avatar: string | null;
    unread_count: string;
    last_message: ILastMessage;
}