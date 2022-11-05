import { compile } from "pug";
import Component from "../../services/Component";
import ButtonProps from "./ButtonProps";
import ButtonTemplate from "./Button.template";
import "./Button.scss";
import Text from "../Text/Text";

export default class Button extends Component {
	constructor(props: ButtonProps) {

		const buttonText = new Text({ text: props.text });

		super("button", { ...props, children: { "buttonText": buttonText }});
	}

	render() {
		return compile(ButtonTemplate)(this.props);
	}

	postRender() {
		this._element.addEventListener(
			"click",
			() => this.props.action()
		);
	}
}