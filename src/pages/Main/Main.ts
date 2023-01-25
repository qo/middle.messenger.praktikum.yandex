import { compile } from "pug";
import Component from "../../services/Component";
import Link from "../../components/Link/Link";
import MainTemplate from "./Main.template";
import Text from "../../components/Text/Text";
import "./Main.scss";
import replaceElementWithComponent from "../../utils/replaceElementWithComponent";
import Chat from "../Chat/Chat";
import Error404 from "../Error/Error404/Error404";
import Error500 from "../Error/Error500/Error500";
import Profile from "../Profile/Profile";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";

export default class Main extends Component {

	constructor() {

		const title = new Text({ text: "Страницы" });
		const chatLink = new Link({ action: () => replaceElementWithComponent("#root", new Chat()), text: "Чат" });
		const error404Link = new Link({ action: () => replaceElementWithComponent("#root", new Error404()), text: "Ошибка 404" });
		const error505Link = new Link({ action: () => replaceElementWithComponent("#root", new Error500()), text: "Ошибка 500" });
		const profileLink = new Link({ action: () => replaceElementWithComponent("#root", new Profile()), text: "Профиль" });
		const signinLink = new Link({ action: () => replaceElementWithComponent("#root", new SignIn()), text: "Вход" });
		const signupLink = new Link({ action: () => replaceElementWithComponent("#root", new SignUp()), text: "Регистрация" });

		super("div", {
			"children": {
				"title": title,
				"chatLink": chatLink,
				"error404Link": error404Link,
				"error505Link": error505Link,
				"profileLink": profileLink,
				"signinLink": signinLink,
				"signupLink": signupLink
			}
		});
	}

	render() {
		return compile(MainTemplate)();
	}

}