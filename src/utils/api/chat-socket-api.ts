import ChatsAPIController from "../controllers/chats-api-controller";
import Store from "../../services/Store/Store";
import IUser from "../../services/Store/store-interfaces/IUser";

const chatsAPIController = new ChatsAPIController();

export default class ChatSocketAPI {
	socket: WebSocket;

	timer: any;

	// https://gist.github.com/ndrbrt/4fb9af2084316ac0c0f9d3c46b9f2d02
	private waitForOpenConnection(socket: WebSocket): Promise<void> {
		return new Promise((resolve, reject) => {
			const maxNumberOfAttempts = 10;
			const intervalTime = 200; // ms

			let currentAttempt = 0;
			const interval = setInterval(() => {
				if (currentAttempt > maxNumberOfAttempts - 1) {
					clearInterval(interval);
					reject(new Error("Maximum number of attempts exceeded"));
				} else if (socket.readyState === socket.OPEN) {
					clearInterval(interval);
					resolve();
				}
				currentAttempt++;
			}, intervalTime);
		});
	}

	public async connect(chatID: number) {
		const { user } = Store.getState();
		if (!("id" in user)) throw "Данные о пользователе (user.id) не хранятся в сторе на момент подключения к чату";

		chatsAPIController.getToken(chatID)
			.then((tokenReq) => {
				const { token } = JSON.parse(tokenReq as string);
				const url = `wss://ya-praktikum.tech/ws/chats/${user.id}/${chatID}/${token}`;
				this.socket = new WebSocket(url);
				this.initSocketListeners(this.socket);
				if (this.socket.readyState !== this.socket.OPEN) {
					try {
						this.waitForOpenConnection(this.socket).then(() => this.getOldMessages(0));
					} catch (err) { console.error(err); }
				} else {
					this.getOldMessages(0);
				}
			});
	}

	private initSocketListeners(socket: WebSocket) {
		socket.addEventListener("open", () => {
			console.log("Соединение установлено");
			if (!this.timer) {
				this.timer = setInterval(() => {
					this.socket.send(
						JSON.stringify({
							type: "ping",
						}),
					);
				}, 5000);
			}
		});

		socket.addEventListener("close", (event) => {
			if (event.wasClean) {
				console.log("Соединение закрыто чисто");
			} else {
				console.log("Обрыв соединения");
			}

			if (this.timer) {
				clearInterval(this.timer);
				this.timer = undefined;
			}

			console.log(`Код: ${event.code} | Причина: ${event.reason}`);
		});

		socket.addEventListener("message", (event) => {
			const data = JSON.parse(event.data);

			// Игнорируем пинги
			if (data.type === "pong") return;

			console.log("Получены данные", data);

			const messages = Store.getState().messages || [];

			const myUID = (Store.getState().user as IUser).id;

			if (Array.isArray(data)) {
				data.forEach(
					(message) => messages.push({
						isMine: message.user_id === myUID,
						type: "text",
						content: message.content,
						time: message.time.substring(11, 16),
					}),
				);
			} else {
				messages.push({
					isMine: data.user_id === myUID,
					type: "text",
					content: data.content,
					time: data.time.substring(11, 16),
				});
			}

			Store.set("messages", messages);
		});

		socket.addEventListener("error", (event) => {
			// @ts-ignore
			console.log("Ошибка", event.message);
		});
	}

	private checkSocket() {
		if (!this.socket) throw "Сокет не создан на момент отправки сообщения";
		if (!this.socket.readyState) throw "Сокет не готов на момент отправки сообщения";
	}

	public async sendMessage(message: string) {
		this.checkSocket();
		this.socket.send(
			JSON.stringify({
				content: message,
				type: "message",
			}),
		);
	}

	public async getOldMessages(offset: number) {
		this.checkSocket();
		this.socket.send(JSON.stringify({
			content: offset.toString(),
			type: "get old",
		}));
	}
}
