import { compile } from "pug";
import Component from "../../services/Component";
import Text from "../../components/Text/Text";
import Button from "../../components/Button/Button";
import Link from "../../components/Link/Link";
import Field from "../../components/Field/Field";
import SignUpTemplate from "./SignUp.template";
import "./SignUp.scss";
import replaceElementWithComponent from "../../utils/replaceElementWithComponent";
import SignIn from "../SignIn/SignIn";
import validate from "../../utils/validate";

export default class SignUp extends Component {

	constructor() {

		const titleText = new Text({ text: "Регистрация" });
		const emailField = new Field({ title: "Почта", type: "email" });
		const loginField = new Field({ title: "Логин", type: "login" });
		const firstNameField = new Field({ title: "Имя", type: "name" });
		const lastNameField = new Field({ title: "Фамилия", type: "name" });
		const phoneNumberField = new Field({ title: "Телефон", type: "tel" });
		const passwordField = new Field({ title: "Пароль", type: "password"});
		const passwordConfirmField = new Field({ title: "Пароль (еще раз)", type: "password" });
		const submitButton = new Button({ text: "Зарегистрироваться", action: () => {} });
		const signinLink = new Link({ action: () => replaceElementWithComponent("#root", new SignIn()), text: "Есть аккаунт?" });

		super("div", {
			"children": {
				"titleText": titleText,
				"emailField": emailField,
				"loginField": loginField,
				"firstNameField": firstNameField,
				"lastNameField": lastNameField,
				"phoneNumberField": phoneNumberField,
				"passwordField": passwordField,
				"passwordConfirmField": passwordConfirmField,
				"submitButton": submitButton,
				"signinLink": signinLink
			}
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
					input => console.log(input.value)
				);
				const isValid = inputs.every(
					// @ts-ignore
					input => validate(input.type, input.value)
				);

				if (isValid)
					replaceElementWithComponent("#root", new SignIn());
				else
					console.log("Форма заполнена неправильно");
			});
		}

	}

}