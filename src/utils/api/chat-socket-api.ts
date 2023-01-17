import ChatsAPIController from "../controllers/chats-api-controller";
import AuthAPIController from "../controllers/auth-api-controller";
import Store from "../../services/Store/Store";

const authAPIController = new AuthAPIController();
const chatsAPIController = new ChatsAPIController();

export default class ChatSocketAPI {
    public async connect(chatID: number) {

        const user = await authAPIController.getUser();
        // @ts-ignore
        const userID = JSON.parse(user).id;
        const tokenReq = await chatsAPIController.getToken(chatID);
        // @ts-ignore
        const token = JSON.parse(tokenReq).token;
        console.log(token);

        const url = `wss://ya-praktikum.tech/ws/chats/${userID}/${chatID}/${token}`;
        console.log(url);

        const socket = new WebSocket(url);

        socket.addEventListener('open', () => {
            console.log('Соединение установлено');

            socket.send(JSON.stringify({
                content: 'Моё первое сообщение миру!',
                type: 'message',
            }));
        });

        socket.addEventListener('close', event => {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');
            }

            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });

        socket.addEventListener('message', event => {
            console.log('Получены данные', event.data);

            const data = JSON.parse(event.data);

            const messages = Store.getState().messages || [];
            messages.push({
                isMine: false,
                text: data.content,
                time: data.time.substring(11, 16)
            });

            Store.set('messages', messages);
        });

        socket.addEventListener('error', event => {
            // @ts-ignore
            console.log('Ошибка', event.message);
        });
    }
}