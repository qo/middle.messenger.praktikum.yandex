import HTTP from "../http";
import IChat from "../../services/Store/store-interfaces/IChat";
import ChatsRequest from "../api-interfaces/chats/chats";
import ICreateChatRequest from "../api-interfaces/chats/ICreateChatRequest";
import IUsersRequest from "../api-interfaces/chats/IUsersRequest";

const chatsAPIInstance = new HTTP('https://ya-praktikum.tech/api/v2/chats');

export default class ChatsAPI {

    public async getChats(req?: ChatsRequest): Promise<string> {
        return chatsAPIInstance.get(
            ``
        );
    }

    public async createChat(req: ICreateChatRequest): Promise<unknown> {
        return chatsAPIInstance.post(
            ``,
            {
                data: req
            }
        );
    }

    public async getToken(chatID: number): Promise<unknown> {
        return chatsAPIInstance.post(
            `/token/${chatID}`
        );
    }

    public async addUsers(req: IUsersRequest): Promise<unknown> {
        return chatsAPIInstance.put(
            `/users`,
            {
                data: req
            }
        )
    }

    public async removeUsers(req: IUsersRequest): Promise<unknown> {
        return chatsAPIInstance.delete(
            `/users`,
            {
                data: req
            }
        )
    }

    public async deleteChat(req: { chatId: number }): Promise<unknown> {
        return chatsAPIInstance.delete(
            ``,
            {
                data: req
            }
        )
    }

}