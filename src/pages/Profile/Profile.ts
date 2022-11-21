import { compile } from "pug";
import Component from "../../services/Component";
import Text from "../../components/Text/Text";
import GoBack from "../../components/GoBack/GoBack";
import ProfileTemplate from "./Profile.template";
import ProfileActionsEntry from "./components/ProfileActionsEntry/ProfileActionsEntry";
import ProfileDataEntry from "../../components/ProfileDataEntry";
import "./Profile.scss";
import AuthAPIController from "../../utils/controllers/auth-api-controller";
import router from "../../index";

export default class Profile extends Component {

	constructor() {

		console.log(new AuthAPIController().getUser());

		const goBack = new GoBack({});
		const profileTitle = new Text({text: "Автор"});

		const email = new ProfileDataEntry({title: "Почта", type: "email", placeholder: "pochta@yandex.ru"});
		const login = new ProfileDataEntry({title: "Логин", type: "login", placeholder: "ivanivanov"});
		const firstName = new ProfileDataEntry({title: "Имя", type: "name", placeholder: "Иван"});
		const lastName = new ProfileDataEntry({title: "Фамилия", type: "name", placeholder: "Иванов"});
		const userName = new ProfileDataEntry({title: "Имя в чате", type: "text", placeholder: "Иван"});
		const phoneNumber = new ProfileDataEntry({title: "Телефон", type: "tel", placeholder: "+7 (909) 967 30 30"});

		const changeDataAction = new ProfileActionsEntry({
			text: "Изменить данные",
			action: () => {
				// Здесь нужно перекинуть на страницу редактирования профиля,
				// а там юзать ручку user/profile
			},
			color: "blue"
		});
		const changePasswordAction = new ProfileActionsEntry({
			text: "Изменить пароль",
			action: () => {
				// Здесь нужно перекинуть на страницу редактирования пароля,
				// а там юзать ручку user/password
			},
			color: "blue"
		});
		const logOutAction = new ProfileActionsEntry({
			text: "Выйти",
			action: () => {
				const controller = new AuthAPIController();
				controller.logOut()
					.then(res => {
						// @ts-ignore
						if (res.response === 'OK')
							router.go('/sign-in');
					});
			},
			color: "red"
		});

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