import { compile } from "pug";
import Component from "../../services/Component";
import DelimiterProps from "./DelimiterProps";
import DelimiterTemplate from "./Delimiter.template";
import "./Delimiter.scss";

export default class Delimiter extends Component {
	constructor(props: DelimiterProps) {
		super("div", props);
	}

	render() {
		return compile(DelimiterTemplate)(this.props);
	}
}