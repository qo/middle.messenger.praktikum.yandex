import { compile } from "pug";
import Component from "../../services/Component";
import ErrorTemplate from "./Error.template";
import Link from "../../components/Link/Link";
import Text from "../../components/Text/Text";
import ErrorProps from "./ErrorProps";
import "./Error.scss";
import replaceElementWithComponent from "../../utils/replaceElementWithComponent";
import Chat from "../Chat/Chat";

export default class Error extends Component {

	constructor(props: ErrorProps) {

		const errorCode = new Text({ text: props.errorCode });
		const errorDescription = new Text({ text: props.errorDescription });
		const backToChatsLink = new Link({
			action: () => replaceElementWithComponent("#root", new Chat()),
			text: "Вернуться к чатам"
		});

		super("div", {
			"children": {
				"errorCode": errorCode,
				"errorDescription": errorDescription,
				"backToChatsLink": backToChatsLink
			}
		});
	}

	render() {
		return compile(ErrorTemplate)(this.props);
	}

}