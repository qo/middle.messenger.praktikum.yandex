import { compile } from "pug";
import GoBack from "../../components/GoBack/GoBack";
import Text from "../../components/Text/Text";
import ProfileDataEntry from "../../components/ProfileDataEntry";
import ChangePasswordTemplate from "./ChangePassword.template";
import Component from "../../services/Component";
import "./ChangePassword.scss";
import Button from "../../components/Button/Button";
import validate from "../../utils/validate";
import router from "../../index";
import UserAPIController from "../../utils/controllers/user-api-controller";

export default class ChangePassword extends Component {
	constructor() {
		const goBack = new GoBack({});

		const profileTitle = new Text({ text: "Автор" });

		const oldPassword = new ProfileDataEntry({ title: "Старый пароль", type: "password", placeholder: "" });
		const newPassword = new ProfileDataEntry({ title: "Новый пароль", type: "password", placeholder: "" });
		const newPasswordConfirm = new ProfileDataEntry({ title: "Повторите новый пароль", type: "password", placeholder: "" });

		const submitButton = new Button({ text: "Сохранить", action: () => {} });

		super("div", {
			children: {
				goBack,
				profileTitle,

				oldPassword,
				newPassword,
				newPasswordConfirm,

				submitButton,
			},
		});
	}

	render() {
		return compile(ChangePasswordTemplate)();
	}

	postRender() {
		const form = this._element.querySelector("form");

		if (form) {
			form.addEventListener("submit", (e) => {
				e.preventDefault();

				const inputs = Array.from(form.querySelectorAll("input"));
				const isValid = inputs.every(
					// @ts-ignore
					(input) => validate(input.type, input.value),
				);

				if (isValid) {
					const formData = {
						oldPassword: inputs[0].value,
						newPassword: inputs[1].value,
					};
					new UserAPIController()
						.changePassword(formData)
						.then(() => router.go("/profile"));
				} else { console.log("Форма заполнена неправильно"); }
			});
		}
	}
}
