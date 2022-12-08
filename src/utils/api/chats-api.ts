import HTTP from "../http";

const chatsAPIInstance = new HTTP('https://ya-praktikum.tech/api/v2/chats');

export default class ChatsAPI {
    public async getToken(): Promise<unknown> {
        const chatID = 4136;
        return chatsAPIInstance.post(
            `/token/${chatID}`
        );
    }
}