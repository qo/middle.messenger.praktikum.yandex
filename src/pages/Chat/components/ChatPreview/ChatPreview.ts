import { compile } from "pug";
import Component from "../../../../services/Component";
import "./ChatPreview.scss";
import ChatPreviewProps from "./ChatPreviewProps";
import ChatPreviewTemplate from "./ChatPreview.template";
import Text from "../../../../components/Text/Text";
import Delimiter from "../../../../components/Delimiter/Delimiter";

export default class ChatPreview extends Component {
	constructor(props: ChatPreviewProps) {

		const name = new Text({ text: props.name });
		const lastMsg = new Text({ text: props.lastMsg });
		const lastMsgDate = new Text({ text: props.lastMsgDate });
		const msgAmt = new Text({ text: props.msgAmt });
		const delimiter = new Delimiter({direction: "horizontal"});

		super("div", { ...props, children: { "name": name, "lastMsg": lastMsg, "lastMsgDate": lastMsgDate, "msgAmt": msgAmt, "delimiter": delimiter }});
	}

	render() {
		return compile(ChatPreviewTemplate)(this.props);
	}

	postRender() {
		// Если количество новых сообщений равно нулю, скрываем элемент,
		// показывающий количество новых сообщений
		if (!this.props.msgAmt) {
			const msgAmt = this._element.querySelector('.chat_preview__right__msg_amt') as HTMLElement;
			msgAmt.style.display = "none";
		}
	}
}