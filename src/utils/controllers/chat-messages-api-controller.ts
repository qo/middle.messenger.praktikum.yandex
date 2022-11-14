import ChatMessagesAPI from "../api/chat-messages-api";
import Store from "../../services/Store";

export default class ChatAPIController {
    public getChat() {
        const chatMessagesAPI = new ChatMessagesAPI();
    }
}