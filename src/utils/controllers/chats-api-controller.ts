import ChatsAPI from "../api/chats-api";

const chatsAPI = new ChatsAPI();

export default class ChatsAPIController {
    public async getToken(chatID: number) {
        return await chatsAPI.getToken(chatID);
    }
}