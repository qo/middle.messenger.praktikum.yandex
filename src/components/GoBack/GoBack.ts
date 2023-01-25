import { compile } from "pug";
import Component from "../../services/Component";
import GoBackProps from "./GoBackProps";
import GoBackTemplate from "./GoBack.template";
import Button from "../Button/Button";
import "./GoBack.scss";
import replaceElementWithComponent from "../../utils/replaceElementWithComponent";
import Chat from "../../pages/Chat/Chat";

export default class GoBack extends Component {
	constructor(props: GoBackProps) {

		const GoBackButton = new Button({ text: "➜", action: () => replaceElementWithComponent("#root", new Chat()) });

		super("div", { ...props, children: { "GoBackButton": GoBackButton }});
	}

	render() {
		return compile(GoBackTemplate)(this.props);
	}
}