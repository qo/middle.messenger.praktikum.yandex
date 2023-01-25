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
import Profile from "../Profile/Profile";
import replaceElementWithComponent from "../../utils/replaceElementWithComponent";

// @ts-ignore
import mouse from  "../../assets/images/mouse.png";
import ChatSocketAPI from "../../utils/api/chat-socket-api";
import AuthAPIController from "../../utils/controllers/auth-api-controller";
import router from "../../index";
import ChatSocketAPIController from "../../utils/controllers/chat-socket-api-controller";
import Store from "../../services/Store/Store";
import ChatsAPIController from "../../utils/controllers/chats-api-controller";
import ChatsAPI from "../../utils/api/chats-api";
import FormWindow from "../../components/FormWindow/FormWindow";

export default class Chat extends Component {

	constructor() {

		const profileLink = new Link({ action: () => router.go('/settings'), text: "Профиль ➜" });
		const searchbar = new Input({ placeholder: "🔎︎ Поиск", type: "text" });
		const horizontalDelimiter = new Delimiter({ direction: "horizontal" });
		const horizontalDelimiter2 = new Delimiter({ direction: "horizontal" });
		const chatPreviewAndrey = new ChatPreview({ name: "Андрей", lastMsg: "Изображение", lastMsgDate: "10:49", msgAmt: "2" });
		const chatPreviewAlexandr = new ChatPreview({  name: "Александр", lastMsg: "Спасибо", lastMsgDate: "Пт", msgAmt: "0" });
		const createChat = new Button(
			{
				text: "+",
				action: () => {
					const chatsAPIController = new ChatsAPIController();
					chatsAPIController.createChat({
						"title": "Новый чат"
					})
						.then(() => chatsAPIController.getChats())
						.then(updatedChats => Store.set('chats', JSON.parse(updatedChats)));
				}
			});
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
						.querySelector('.chat__right__message_toolbar__message_input')
						.getElementsByTagName('input')[0]
						.value;
					const chatSocketAPIController = new ChatSocketAPIController();
					chatSocketAPIController.sendMessage(messageInputValue);
				},
			});
		const chatMessage1 = new ChatMessage({
			isMine: false,
			time: "11:56",
			type: "text",
			text: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.

            Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.`,
		});
		const chatMessage2 = new ChatMessage({
			isMine: false,
			time: "11:56",
			type: "image",
			image: mouse
		});
		const chatMessage3 = new ChatMessage({
			isMine: true,
			time: "12:00",
			type: "text",
			text: "Круто!",
			status: "read"
		});

		const addUsersButton = new Button({
			text: "Добавить пользователей",
			action: () => {
				addUsersFormWindow.show();
			}
		});

		const removeUsersButton = new Button({
			text: "Удалить пользователей",
			action: () => {
				removeUsersFormWindow.show();
			}
		})

		const deleteChatButton = new Button({
			text: "Удалить чат",
			action: () => {
				deleteChatFormWindow.show();
			}
		});

		const addUsersFormWindow = new FormWindow({
			formTitle: "Добавить пользователей в чат",
			inputNames: [ "ID пользователей (через запятую)" ],
			action: () => {
				const formWindow = this._element.querySelector('.form_window__inputs') as HTMLElement;
				const inputs = Array.from(formWindow.getElementsByTagName('input'));
				const values = inputs.map(
					input => Number(input.value)
				);
				new ChatsAPIController().addUsers({
					users: values,
					chatId: Store.getState().currentChatID
				})
			}
		});

		const removeUsersFormWindow = new FormWindow({
			formTitle: "Удалить пользователей из чата",
			inputNames: [ "ID пользователей (через запятую)" ],
			action: () => {
				const formWindow = this._element.querySelector('.form_window__inputs') as HTMLElement;
				const inputs = Array.from(formWindow.getElementsByTagName('input'));
				const values = inputs.map(
					input => Number(input.value)
				);
				new ChatsAPIController().removeUsers({
					users: values,
					chatId: Store.getState().currentChatID
				})
			}
		});

		const deleteChatFormWindow = new FormWindow({
			formTitle: "Удалить чат",
			inputNames: [],
			action: () => {
				new ChatsAPIController().deleteChat({
					chatId: Store.getState().currentChatID
				})
			}
		})

		super("div", {
			"children": {
				"profileLink": profileLink,
				"searchbar": searchbar,
				"horizontalDelimiter": horizontalDelimiter,
				"horizontalDelimiter2": horizontalDelimiter2,
				"chatPreviewAndrey": chatPreviewAndrey,
				"chatPreviewAlexandr": chatPreviewAlexandr,
				"createChat": createChat,
				"verticalDelimiter": verticalDelimiter,
				"chosenChatName": chosenChatName,
				"chosenChatActions": chosenChatActions,
				"messagesDate": messagesDate,
				"attachButton": attachButton,
				"messageInput": messageInput,
				"sendButton": sendButton,
				"chatMessage1": chatMessage1,
				"chatMessage2": chatMessage2,
				"chatMessage3": chatMessage3,
				"addUsersButton": addUsersButton,
				"removeUsersButton": removeUsersButton,
				"deleteChatButton": deleteChatButton,
				"addUsersFormWindow": addUsersFormWindow,
				"removeUsersFormWindow": removeUsersFormWindow,
				"deleteChatFormWindow": deleteChatFormWindow
			}
		});

	}

	render() {
		return compile(ChatTemplate)();
	}

	postRender() {

		const chats = Store.getState().chats;

		const chatPreviewsWrapper = this._element.querySelector('.chat__left__chat_previews') as HTMLElement;
		// Убираем предыдущие чаты
		chatPreviewsWrapper.innerHTML = "";

		chats.forEach(
			chat => {
				const chatPreview = new ChatPreview({
					name: chat.title,
					lastMsg: chat.last_message ? chat.last_message.content.substring(0, 15) : "",
					lastMsgDate: chat.last_message ? chat.last_message.time.substring(11, 16) : "",
					msgAmt: chat.unread_count
				});
				const chatPreviewElement = chatPreview.getContent();
				chatPreviewElement.addEventListener('click', () => this.connectToChat(chat.title, chat.id));
				chatPreviewsWrapper.append(chatPreviewElement);
			}
		);

		const messages = Store.getState().messages;
		const messagesWrapper = this._element.querySelector('.chat__right__messages') as HTMLElement;
		messagesWrapper.innerHTML = "";

		messages.forEach(
			message => {
				const messageComponent = new ChatMessage({
					isMine: message.isMine,
					time: message.time,
					type: "text",
					text: message.content
				});
				const messageEl = messageComponent.getContent();
				// Юзаем prepend вместо append, чтобы новые сообщения были внизу
				messagesWrapper.prepend(messageEl);
			}
		);

	}

	private async connectToChat(title: string, id: number) {
		Store.set('currentChatID', id);
		Store.set('messages', []);
		const chatNameComponent = this._element.querySelector('.chat__right__chosen_chat__name') as HTMLElement;
		const chatName = chatNameComponent.querySelector('.text') as HTMLElement;
		chatName.textContent = title;
		await new ChatSocketAPIController().connect();
	}

}