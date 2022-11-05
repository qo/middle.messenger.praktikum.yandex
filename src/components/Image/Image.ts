import { compile } from "pug";
import Component from "../../services/Component";
import ImageProps from "./ImageProps";
import ImageTemplate from "./Image.template";
import "./Image.scss";

export default class Image extends Component {
	constructor(props: ImageProps) {
		super("img", props);
	}

	render() {
		return compile(ImageTemplate)(this.props);
	}
}