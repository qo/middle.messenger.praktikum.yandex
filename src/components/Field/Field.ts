import { compile } from "pug";
import Component from "../../services/Component";
import Text from "../Text/Text";
import FieldProps from "./FieldProps";
import FieldTemplate from "./Field.template";
import "./Field.scss";
import Input from "../Input/Input";

export default class Field extends Component {
	constructor(props: FieldProps) {

		const fieldTitleText = new Text({ text: props.title });
		const fieldInput = new Input({ type: props.type });

		super("div", { ...props, children: { "fieldTitleText": fieldTitleText, "fieldInput": fieldInput } });
	}

	render() {
		return compile(FieldTemplate)(this.props);
	}
}