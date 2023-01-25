import { compile } from "pug";
import Component from "../../services/Component";
import ChatTemplate from "./Chat.template";
import Link from "../../components/Link/Link";
import Delimiter from "../../components/Delimiter/Delimiter";
import Text from "../../components/Text/Text";
import Button from "../../components/Button/Button";
import "./Chat.scss";
import ChatPreview from "./components/ChatPreview/ChatPreview";
import Input from "../../components/Input/Input";
import ChatMessage from "./components/ChatMessage/ChatMessage";
import router from "../../index";
import ChatSocketAPIController from "../../utils/controllers/chat-socket-api-controller";
import Store from "../../services/Store/Store";
import ChatsAPIController from "../../utils/controllers/chats-api-controller";
import FormWindow from "../../components/FormWindow/FormWindow";

export default class Chat extends Component {
	constructor() {
		const profileLink = new Link({ action: () => router.go("/settings"), text: "Профиль ➜" });
		const searchbar = new Input({ placeholder: "🔎︎ Поиск", type: "text" });
		const horizontalDelimiter = new Delimiter({ direction: "horizontal" });
		const horizontalDelimiter2 = new Delimiter({ direction: "horizontal" });
		const createChat = new Button(
			{
				text: "+",
				action: () => {
					const chatsAPIController = new ChatsAPIController();
					chatsAPIController.createChat({
						title: "Новый чат",
					})
						.then(() => chatsAPIController.getChats())
						.then((updatedChats) => Store.set("chats", JSON.parse(updatedChats)));
				},
			},
		);
		const verticalDelimiter = new Delimiter({ direction: "vertical" });
		const chosenChatName = new Text({ text: "Имя чата" });
		const chosenChatActions = new Button({ text: "⋮", action: () => {} });
		const messagesDate = new Text({ text: "19 июня" });
		const attachButton = new Button({ text: "📎", action: () => {} });
		const messageInput = new Input({ placeholder: "Сообщение", type: "text" });
		const sendButton = new Button(
			{
				text: "➜",
				action: () => {
					// Текст инпута
					// @ts-ignore
					const messageInputValue = this._element
						.querySelector(".chat__right__message_toolbar__message_input")
						.getElementsByTagName("input")[0]
						.value;
					const chatSocketAPIController = new ChatSocketAPIController();
					chatSocketAPIController.sendMessage(messageInputValue);
				},
			},
		);

		const addUsersButton = new Button({
			text: "Добавить пользователей",
			action: () => {
				addUsersFormWindow.show();
			},
		});

		const removeUsersButton = new Button({
			text: "Удалить пользователей",
			action: () => {
				removeUsersFormWindow.show();
			},
		});

		const deleteChatButton = new Button({
			text: "Удалить чат",
			action: () => {
				deleteChatFormWindow.show();
			},
		});

		addUsersButton.hide();
		removeUsersButton.hide();
		deleteChatButton.hide();

		const addUsersFormWindow = new FormWindow({
			formTitle: "Добавить пользователей в чат",
			inputNames: ["ID пользователей (через запятую)"],
			action: () => {
				const formWindow = this._element.querySelector(".form_window__inputs") as HTMLElement;
				const inputs = Array.from(formWindow.getElementsByTagName("input"));
				const values = inputs.map(
					(input) => Number(input.value),
				);
				new ChatsAPIController().addUsers({
					users: values,
					chatId: Store.getState().currentChatID,
				});
			},
		});

		const removeUsersFormWindow = new FormWindow({
			formTitle: "Удалить пользователей из чата",
			inputNames: ["ID пользователей (через запятую)"],
			action: () => {
				const formWindow = this._element.querySelector(".form_window__inputs") as HTMLElement;
				const inputs = Array.from(formWindow.getElementsByTagName("input"));
				const values = inputs.map(
					(input) => Number(input.value),
				);
				new ChatsAPIController().removeUsers({
					users: values,
					chatId: Store.getState().currentChatID,
				});
			},
		});

		const deleteChatFormWindow = new FormWindow({
			formTitle: "Удалить чат",
			inputNames: [],
			action: () => {
				new ChatsAPIController().deleteChat({
					chatId: Store.getState().currentChatID,
				});
			},
		});

		super("div", {
			children: {
				profileLink,
				searchbar,
				horizontalDelimiter,
				horizontalDelimiter2,
				createChat,
				verticalDelimiter,
				chosenChatName,
				chosenChatActions,
				messagesDate,
				attachButton,
				messageInput,
				sendButton,
				addUsersButton,
				removeUsersButton,
				deleteChatButton,
				addUsersFormWindow,
				removeUsersFormWindow,
				deleteChatFormWindow,
			},
		});
	}

	render() {
		return compile(ChatTemplate)();
	}

	postRender() {
		const { chats } = Store.getState();

		const chatPreviewsWrapper = this._element.querySelector(".chat__left__chat_previews") as HTMLElement;
		// Убираем предыдущие чаты
		chatPreviewsWrapper.innerHTML = "";

		chats.forEach(
			(chat) => {
				const chatPreview = new ChatPreview({
					name: chat.title,
					lastMsg: chat.last_message ? chat.last_message.content.substring(0, 15) : "",
					lastMsgDate: chat.last_message ? chat.last_message.time.substring(11, 16) : "",
					msgAmt: chat.unread_count,
				});
				const chatPreviewElement = chatPreview.getContent();
				chatPreviewElement.addEventListener("click", () => {
					this.connectToChat(chat.title, chat.id);
					const actionButtonsClassNames = ["add_users", "remove_users", "delete_chat"];
					actionButtonsClassNames.forEach(
						(className) => {
							const button = this
								.getContent()
								.querySelector(`.chat__right__chosen_chat__actions__${
									className}`) as HTMLElement;
							button.style.display = "flex";
						},
					);
				});
				chatPreviewsWrapper.append(chatPreviewElement);
			},
		);

		const { messages } = Store.getState();
		const messagesWrapper = this._element.querySelector(".chat__right__messages") as HTMLElement;
		messagesWrapper.innerHTML = "";

		messages.forEach(
			(message) => {
				const messageComponent = new ChatMessage({
					isMine: message.isMine,
					time: message.time,
					type: "text",
					text: message.content,
				});
				const messageEl = messageComponent.getContent();
				// Юзаем prepend вместо append, чтобы новые сообщения были внизу
				messagesWrapper.prepend(messageEl);
			},
		);
	}

	private async connectToChat(title: string, id: number) {
		Store.set("currentChatID", id);
		Store.set("messages", []);
		const chatNameComponent = this._element.querySelector(".chat__right__chosen_chat__name") as HTMLElement;
		const chatName = chatNameComponent.querySelector(".text") as HTMLElement;
		chatName.textContent = title;
		await new ChatSocketAPIController().connect();
	}
}
