import { compile } from "pug";
import Component from "../../services/Component";
import Text from "../Text/Text";
import "./Input.scss";
import InputProps from "./InputProps";
import InputTemplate from "./Input.template";
import validate from "../../utils/validate";

export default class Input extends Component {
	constructor(props: InputProps) {

		const inputLabel = new Text({ text: props.label || "", tagName: "label" })
		const inputPlaceholder = new Text({ text: props.placeholder || "" });

		super("div", { ...props, children: {
			"inputPlaceholder": inputPlaceholder,
			"inputLabel": inputLabel
		}});
	}

	render() {
		return compile(InputTemplate)(this.props);
	}

	postRender() {

		// this._element.addEventListener(
		// 	"change",
		// 	() => {
		// 		// @ts-ignore
		// 		if (!validate(this.props.type, this._element.value || "")) {
		// 			this._element.focus();
		// 			this._element.classList.add("hasError");
		// 		}
		// 		else {
		// 			this._element.blur();
		// 			this._element.classList.remove("hasError");
		// 		}
		// 	}
		// );

	}
}