import ChatAPI from "../api/chat-api";
import Store from "../../services/Store";

export default class ChatAPIController {
    public getChat() {
        const chatAPI = new ChatAPI();
        chatAPI.request()
            .then(data => Store.set('chat', data));
    }
}