import { compile } from "pug";
import Component from "../../services/Component";
import Text from "../Text/Text";
import "./Input.scss";
import InputProps from "./InputProps";
import InputTemplate from "./Input.template";

export default class Input extends Component {
	constructor(props: InputProps) {
		const inputLabel = new Text({ text: props.label || "", tagName: "label" });
		const inputPlaceholder = new Text({ text: props.placeholder || "" });

		super("div", {
			...props,
			children: {
				inputPlaceholder,
				inputLabel,
			},
		});
	}

	render() {
		return compile(InputTemplate)(this.props);
	}
}
