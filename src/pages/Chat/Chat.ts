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

export default class Chat extends Component {

	constructor() {

		const profileLink = new Link({ action: () => replaceElementWithComponent("#root", new Profile()), text: "Профиль ➜" });
		const searchbar = new Input({ placeholder: "🔎︎ Поиск", type: "text" });
		const horizontalDelimiter = new Delimiter({ direction: "horizontal" });
		const horizontalDelimiter2 = new Delimiter({ direction: "horizontal" });
		const chatPreviewAndrey = new ChatPreview({ name: "Андрей", lastMsg: "Изображение", lastMsgDate: "10:49", msgAmt: "2" });
		const chatPreviewAlexandr = new ChatPreview({  name: "Александр", lastMsg: "Спасибо", lastMsgDate: "Пт", msgAmt: "0" });
		const verticalDelimiter = new Delimiter({ direction: "vertical" });
		const chosenChatName = new Text({ text: "Вадим" });
		const chosenChatActions = new Button({ text: "⋮", action: () => {} });
		const messagesDate = new Text({ text: "19 июня" });
		const attachButton = new Button({ text: "📎", action: () => {} });
		const messageInput = new Input({ placeholder: "Сообщение", type: "text" });
		const sendButton = new Button({ text: "➜", action: () => {} });
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

		super("div", {
			"children": {
				"profileLink": profileLink,
				"searchbar": searchbar,
				"horizontalDelimiter": horizontalDelimiter,
				"horizontalDelimiter2": horizontalDelimiter2,
				"chatPreviewAndrey": chatPreviewAndrey,
				"chatPreviewAlexandr": chatPreviewAlexandr,
				"verticalDelimiter": verticalDelimiter,
				"chosenChatName": chosenChatName,
				"chosenChatActions": chosenChatActions,
				"messagesDate": messagesDate,
				"attachButton": attachButton,
				"messageInput": messageInput,
				"sendButton": sendButton,
				"chatMessage1": chatMessage1,
				"chatMessage2": chatMessage2,
				"chatMessage3": chatMessage3
			}
		});

		const chatSocketAPI = new ChatSocketAPI();
		chatSocketAPI.connect(4136);

	}

	render() {
		return compile(ChatTemplate)();
	}

}