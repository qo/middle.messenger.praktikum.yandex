import { compile } from "pug";
import Component from "../../services/Component";
import Text from "../../components/Text/Text";
import Button from "../../components/Button/Button";
import Link from "../../components/Link/Link";
import Field from "../../components/Field/Field";
import SignUpTemplate from "./SignUp.template";
import "./SignUp.scss";
import validate from "../../utils/validate";
import AuthAPIController from "../../utils/controllers/auth-api-controller";
import router from "../../index";
import Store from "../../services/Store/Store";

export default class SignUp extends Component {
	constructor() {
		// Если пользователь уже вошел, кидаем его в мессенджер
		if ("id" in Store.getState().user) { router.go("/messenger"); }

		const titleText = new Text({ text: "Регистрация" });
		const emailField = new Field({ title: "Почта", type: "email" });
		const loginField = new Field({ title: "Логин", type: "login" });
		const firstNameField = new Field({ title: "Имя", type: "name" });
		const lastNameField = new Field({ title: "Фамилия", type: "name" });
		const phoneNumberField = new Field({ title: "Телефон", type: "tel" });
		const passwordField = new Field({ title: "Пароль", type: "password" });
		const passwordConfirmField = new Field({ title: "Пароль (еще раз)", type: "password" });
		const submitButton = new Button({ text: "Зарегистрироваться", action: () => {} });
		const signinLink = new Link({ action: () => router.go("/"), text: "Есть аккаунт?" });

		super("div", {
			children: {
				titleText,
				emailField,
				loginField,
				firstNameField,
				lastNameField,
				phoneNumberField,
				passwordField,
				passwordConfirmField,
				submitButton,
				signinLink,
			},
		});
	}

	render() {
		return compile(SignUpTemplate)();
	}

	postRender() {
		const form = this._element.querySelector("form");

		if (form) {
			form.addEventListener("submit", (e) => {
				e.preventDefault();

				const inputs = Array.from(form.querySelectorAll("input"));

				inputs.forEach(
					(input) => input.classList.remove("hasError"),
				);

				const invalidInputs = inputs.filter(
					// @ts-ignore
					(input) => !validate(input.getAttribute("type"), input.value),
				);

				if (!invalidInputs.length) {
					const formData = {
						first_name: inputs[2].value,
						second_name: inputs[3].value,
						login: inputs[1].value,
						email: inputs[0].value,
						password: inputs[5].value,
						phone: inputs[4].value,
					};
					const controller = new AuthAPIController();
					controller.signUp(formData)
						.then((res) => {
							if (res === "OK") {
								Store.init().then(() => {
									router.go("/messenger");
								});
							}
						});
				} else {
					invalidInputs.forEach(
						(input) => input.classList.add("hasError"),
					);
				}
			});
		}
	}
}
