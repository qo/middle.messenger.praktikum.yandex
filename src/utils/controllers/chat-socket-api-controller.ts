import ChatSocketAPI from "../api/chat-socket-api";
import Store from "../../services/Store/Store";
import chat from "../../pages/Chat";

const chatSocketAPI = new ChatSocketAPI();

export default class ChatSocketAPIController {

    public async connect() {

        // Здесь нужно получить чат-ид из стора

        // Будем использовать чат-ид последнего чата в качестве выбранного по умолчанию чата
        const chats = Store.getState().chats;

        if (!chats.length) {
            throw 'Чаты пока не созданы';
        }

        const lastChatID = chats[chats.length-1].id;

        const currentChatID = Store.getState().currentChatID || lastChatID;

        await chatSocketAPI.connect(currentChatID);

    }

    public async sendMessage(message: string) {
        await chatSocketAPI.sendMessage(message);
    }
}