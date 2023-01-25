import ChatsAPI from "../api/chats-api";
import ChatsRequest from "../api-interfaces/chats/chats";
import ICreateChatRequest from "../api-interfaces/chats/ICreateChatRequest";
import IUsersRequest from "../api-interfaces/chats/IUsersRequest";

const chatsAPI = new ChatsAPI();

export default class ChatsAPIController {
    public async getChats(req?: ChatsRequest) {
        return await chatsAPI.getChats(req);
    }
    public async createChat(req: ICreateChatRequest) {
        return await chatsAPI.createChat(req);
    }
    public async getToken(chatID: number) {
        return await chatsAPI.getToken(chatID);
    }
    public async addUsers(req: IUsersRequest) {
        return await chatsAPI.addUsers(req);
    }
    public async removeUsers(req: IUsersRequest) {
        return await chatsAPI.removeUsers(req);
    }
    public async deleteChat(req: { chatId: number }) {
        return await chatsAPI.deleteChat(req);
    }
}