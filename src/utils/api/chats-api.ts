import HTTP from "../http";

const chatsAPIInstance = new HTTP('https://ya-praktikum.tech/api/v2/chats');

export default class ChatsAPI {
    public async getToken(chatID: number): Promise<unknown> {
        return chatsAPIInstance.post(
            `/token/${chatID}`
        );
    }
}