import ChatsAPI from "../api/chats-api";

const chatsAPI = new ChatsAPI();

export default class ChatsAPIController {
    public async getToken() {
        return await chatsAPI.getToken();
    }
}