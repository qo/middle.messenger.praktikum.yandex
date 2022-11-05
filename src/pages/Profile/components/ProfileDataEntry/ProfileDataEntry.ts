import { compile } from "pug";
import Component from "../../../../services/Component";
import ProfileDataEntryProps from "./ProfileDataEntryProps";
import ProfileDataEntryTemplate from "./ProfileDataEntry.template";
import Text from "../../../../components/Text/Text";
import Delimiter from "../../../../components/Delimiter/Delimiter";
import "./ProfileDataEntry.scss";
import Input from "../../../../components/Input/Input";

export default class ProfileDataEntry extends Component {
	constructor(props: ProfileDataEntryProps) {

		const dataTitle = new Text({ text: props.title });
		const dataValue = new Input({ type: props.type, placeholder: props.placeholder });
		const delimiter = new Delimiter({ direction: "horizontal" });

		super("div", { ...props, children: { "dataTitle": dataTitle, "dataValue": dataValue, "delimiter": delimiter }});
	}

	render() {
		return compile(ProfileDataEntryTemplate)(this.props);
	}
}