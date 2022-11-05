import { compile } from "pug";
import Component from "../../../../services/Component";
import ProfileActionsEntryProps from "./ProfileActionsEntryProps";
import ProfileActionsEntryTemplate from "./ProfileActionsEntry.template";
import Link from "../../../../components/Link/Link";
import Delimiter from "../../../../components/Delimiter/Delimiter";
import "./ProfileActionsEntry.scss";

export default class ProfileActionsEntry extends Component {
	constructor(props: ProfileActionsEntryProps) {

		const actionLink = new Link({ action: props.action, text: props.text });
		const delimiter = new Delimiter({direction: "horizontal"});

		super("div", { ...props, children: { "actionLink": actionLink, "delimiter": delimiter }});
	}

	render() {
		return compile(ProfileActionsEntryTemplate)(this.props);
	}
}