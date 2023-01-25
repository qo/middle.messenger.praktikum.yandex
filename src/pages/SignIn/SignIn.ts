import { compile } from "pug";
import Component from "../../services/Component";
import Text from "../../components/Text/Text";
import Button from "../../components/Button/Button";
import Link from "../../components/Link/Link";
import Field from "../../components/Field/Field";
import SignInTemplate from "./SignIn.template";
import "./SignIn.scss";
import validate from "../../utils/validate";
import AuthAPIController from "../../utils/controllers/auth-api-controller";
import router from "../../index";
import Store from "../../services/Store/Store";

export default class SignIn extends Component {
	constructor() {
		const titleText = new Text({ text: "Вход" });
		const loginField = new Field({ title: "Логин", type: "login" });
		const passwordField = new Field({ title: "Пароль", type: "password" });
		const submitButton = new Button({ text: "Авторизоваться", action: () => {} });
		const signupLink = new Link({ action: () => router.go("/sign-up"), text: "Нет аккаунта?" });

		super("div", {
			children: {
				titleText,
				submitButton,
				loginField,
				passwordField,
				signUpLink: signupLink,
			},
		});
	}

	render() {
		return compile(SignInTemplate)();
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
					invalidInputs.forEach(
						(input) => input.classList.remove("hasError"),
					);

					const formData = {
						login: inputs[0].value,
						password: inputs[1].value,
					};

					const controller = new AuthAPIController();
					controller.signIn(formData)
						.then((res) => {
							// @ts-ignore
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
