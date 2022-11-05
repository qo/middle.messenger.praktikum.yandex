import { compile } from "pug";
import Component from "../../services/Component";
import LinkProps from "./LinkProps";
import LinkTemplate from "./Link.template";
import Text from "../Text/Text";
import "./Link.scss";

export default class Link extends Component {
	constructor(props: LinkProps) {

		const linkText = new Text({ text: props.text });

		super("a", { ...props, children: { "linkText": linkText }});
	}

	render() {
		return compile(LinkTemplate)(this.props);
	}

	postRender() {
		this._element.addEventListener(
			"click",
			() => this.props.action()
		);
	}
}