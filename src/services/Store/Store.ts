import EventBus from "../EventBus";
import set from "../../utils/set";
import IStore from "./store-interfaces/IStore";
import AuthAPIController from "../../utils/controllers/auth-api-controller";
import ChatsAPIController from "../../utils/controllers/chats-api-controller";

export enum StoreEvents {
    updated = "updated"
}

const authAPIController = new AuthAPIController();
const chatsAPIController = new ChatsAPIController();

class Store extends EventBus {
	private state: IStore = {
		user: {},
		chats: [],
		currentChatID: -1,
		messages: [],
	};

	getState() {
		return this.state;
	}

	set(path: string, value: unknown) {
		set(this.state, path, value);
		this.emit(StoreEvents.updated);
	}

	// Инициализация стора после логина
	async init() {
		// Юзаем обычный set, чтобы не вызывать коллбеки, слушающие событие 'updated'
		return authAPIController.getUser()
			.then((r) => set(this.state, "user", JSON.parse(r)))
			.then(() => chatsAPIController.getChats())
			.then((r) => set(this.state, "chats", JSON.parse(r)))
			.then(() => set(this.state, "currentChatID", this.state && this.state.chats && this.state.chats.length ? this.state.chats[0].id : -1))
			.then(() => set(this.state, "messages", []));
	}
}

// Способ сделать синглтон
export default new Store();
