import { compile } from "pug";
import Component from "../../../../services/Component";
import "./ChatMessage.scss";
import ChatMessageProps from "./ChatMessageProps";
import ChatMessageTemplate from "./ChatMessage.template";
import Text from "../../../../components/Text/Text";
import Image from "../../../../components/Image/Image";

export default class ChatMessage extends Component {
	constructor(props: ChatMessageProps) {

		let content = new Text({ text: "content" });

		if (props.type === "text" && props.text) {
			content = new Text({ text: props.text });
		}

		else if (props.type === "image") {
			content = new Image({ src: props.image });
		}

		const time = new Text({ text: props.time });

		let status = new Text({ text: "" });

		switch(props.status) {
		case "not sent":
			status = new Text({ text: "❗" });
			break;
		case "sent":
			status = new Text({ text: "✔" });
			break;
		case "read":
			status = new Text({ text: "✔✔" });
			break;
		}

		super("div", { ...props, children: { "content": content, "time": time, "status": status }});
	}

	render() {
		return compile(ChatMessageTemplate)(this.props);
	}
}