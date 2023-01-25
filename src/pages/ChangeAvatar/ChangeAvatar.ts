import { compile } from "pug";
import ChangeAvatarTemplate from "./ChangeAvatar.template";
import Component from "../../services/Component";
import "./ChangeAvatar.scss";
import UserAPIController from "../../utils/controllers/user-api-controller";
import router from "../../index";

export default class ChangeAvatar extends Component {
	constructor() {
		super("div", {
			children: {},
		});
	}

	render() {
		return compile(ChangeAvatarTemplate)();
	}

	postRender() {
		const form = this.getContent().querySelector("form");

		if (form) {
			form.addEventListener("submit", (e) => {
				e.preventDefault();

				const formData = new FormData(form);

				for (const pair of formData.entries()) {
					console.log(`${pair[0]}, ${pair[1]}`);
				}

				new UserAPIController()
					.changeAvatar(formData)
					.then(() => router.go("/profile"));
			});
		}
	}
}
