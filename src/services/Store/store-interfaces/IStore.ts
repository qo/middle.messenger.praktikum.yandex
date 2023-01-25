import IUser from "./IUser";
import IChat from "./IChat";
import IMessage from "./IMessage";

export default interface IStore {
    user: IUser | {};
    chats: IChat[];
    currentChatID: number;
    messages: IMessage[];
}