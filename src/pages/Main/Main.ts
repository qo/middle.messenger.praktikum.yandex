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
import ChangePassword from "../ChangePassword/ChangePassword";
import ChangeAvatar from "../ChangeAvatar/ChangeAvatar";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import router from "../../index";

export default class Main extends Component {

	constructor() {

		const title = new Text({ text: "Страницы" });
		const chatLink = new Link({ action: () => router.go('/chat'), text: "Чат" });
		const error404Link = new Link({ action: () => router.go('/error-404'), text: "Ошибка 404" });
		const error505Link = new Link({ action: () => router.go('/error-500'), text: "Ошибка 500" });
		const profileLink = new Link({ action: () => router.go('/profile'), text: "Профиль" });
		const changeAvatarLink  = new Link({ action: () => router.go('/change-avatar'), text: "Поменять аватар" });
		const changePasswordLink  = new Link({ action: () => router.go('/change-password'), text: "Поменять пароль" });
		const signinLink = new Link({ action: () => router.go('/sign-in'), text: "Вход" });
		const signupLink = new Link({ action: () => router.go('/sign-up'), text: "Регистрация" });

		super("div", {
			"children": {
				"title": title,
				"chatLink": chatLink,
				"error404Link": error404Link,
				"error505Link": error505Link,
				"profileLink": profileLink,
				"changeAvatarLink": changeAvatarLink,
				"changePasswordLink": changePasswordLink,
				"signinLink": signinLink,
				"signupLink": signupLink
			}
		});
	}

	render() {
		return compile(MainTemplate)();
	}

}