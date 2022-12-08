import { compile } from "pug";
import Component from "../../services/Component";
import TextProps from "./TextProps";
import TextTemplate from "./Text.template";
import "./Text.scss";

export default class Text extends Component {
	constructor(props: TextProps) {
		super(props.tagName || "p", props);
	}

	render() {
		return compile(TextTemplate)(this.props);
	}
}