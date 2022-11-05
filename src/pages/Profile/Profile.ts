import { compile } from "pug";
import Component from "../../services/Component";
import Text from "../../components/Text/Text";
import GoBack from "../../components/GoBack/GoBack";
import ProfileTemplate from "./Profile.template";
import ProfileActionsEntry from "./components/ProfileActionsEntry/ProfileActionsEntry";
import ProfileDataEntry from "./components/ProfileDataEntry/ProfileDataEntry";
import "./Profile.scss";
import replaceElementWithComponent from "../../utils/replaceElementWithComponent";
import SignIn from "../SignIn/SignIn";

export default class Profile extends Component {

	constructor() {

		const goBack = new GoBack({});
		const profileTitle = new Text({ text: "Иван" });

		const email = new ProfileDataEntry({ title: "Почта", type: "email", placeholder: "pochta@yandex.ru" });
		const login = new ProfileDataEntry({ title: "Логин", type: "login", placeholder: "ivanivanov" });
		const firstName = new ProfileDataEntry({ title: "Имя", type: "name", placeholder: "Иван" });
		const lastName = new ProfileDataEntry({ title: "Фамилия", type: "name", placeholder: "Иванов" });
		const userName = new ProfileDataEntry({ title: "Имя в чате", type: "text", placeholder: "Иван" });
		const phoneNumber = new ProfileDataEntry({ title: "Телефон", type: "tel", placeholder: "+7 (909) 967 30 30" });

		const changeDataAction = new ProfileActionsEntry({ text: "Изменить данные", action: () => {}, color: "blue" });
		const changePasswordAction = new ProfileActionsEntry({ text: "Изменить пароль", action: () => {}, color: "blue" });
		const logOutAction = new ProfileActionsEntry({ text: "Выйти", action: () => replaceElementWithComponent("#root", new SignIn()), color: "red" });

		super("div", {
			"children": {
				"goBack": goBack,
				"profileTitle": profileTitle,

				"email": email,
				"login": login,
				"firstName": firstName,
				"lastName": lastName,
				"userName": userName,
				"phoneNumber": phoneNumber,

				"changeDataAction": changeDataAction,
				"changePasswordAction": changePasswordAction,
				"logOutAction": logOutAction
			}
		});
	}

	render() {
		return compile(ProfileTemplate)();
	}

}