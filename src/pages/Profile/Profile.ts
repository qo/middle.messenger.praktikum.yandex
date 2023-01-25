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
import Store from "../../services/Store/Store";
import IUser from "../../services/Store/store-interfaces/IUser";
import UserRequest from "../../utils/api-interfaces/users/change-profile";
import UserAPIController from "../../utils/controllers/user-api-controller";
import PasswordRequest from "../../utils/api-interfaces/users/change-profile-password";
import Button from "../../components/Button/Button";

export default class Profile extends Component {

	constructor() {

		const user = Store.getState().user as IUser;

		const goBack = new GoBack({});
		const profileTitle = new Text({text: user.first_name});
		const profileAvatar = new Button({text: "", action: () => {

		}});

		const email = new ProfileDataEntry({title: "Почта", type: "email", placeholder: user.email});
		const login = new ProfileDataEntry({title: "Логин", type: "login", placeholder: user.login});
		const firstName = new ProfileDataEntry({title: "Имя", type: "name", placeholder: user.first_name});
		const lastName = new ProfileDataEntry({title: "Фамилия", type: "name", placeholder: user.second_name});
		const userName = new ProfileDataEntry({title: "Имя в чате", type: "text", placeholder: user.display_name});
		const phoneNumber = new ProfileDataEntry({title: "Телефон", type: "tel", placeholder: user.phone});
		const oldPassword = new ProfileDataEntry({title: "Старый пароль", type: "password", placeholder: "Скрыто"});
		const newPassword = new ProfileDataEntry({title: "Новый пароль", type: "password", placeholder: "Пусто"});

		const updateUserDataAction = new ProfileActionsEntry({
			text: "Изменить данные",
			action: () => {

				const inputs = this._element.querySelectorAll('input');

				let userData: UserRequest = {
					email: inputs[0].value || inputs[0].placeholder,
					login: inputs[1].value || inputs[1].placeholder,
					first_name: inputs[2].value || inputs[2].placeholder,
					second_name: inputs[3].value || inputs[3].placeholder,
					display_name: inputs[4].value || inputs[4].placeholder,
					phone: inputs[5].value || inputs[5].placeholder,
				};

				new UserAPIController().changeProfile(userData)
					.then(() => Store.set('user', userData))
					.then(() => {
						inputs.forEach(
							input => {
								input.value = "";
							}
						)
					})
					.then(() => {
						const updatedUser = Store.getState().user as IUser;
						inputs[0].placeholder = updatedUser.email;
						inputs[1].placeholder = updatedUser.login;
						inputs[2].placeholder = updatedUser.first_name;
						inputs[3].placeholder = updatedUser.second_name;
						inputs[4].placeholder = updatedUser.display_name;
						inputs[5].placeholder = updatedUser.phone;
						const profileTitleComponent = this._element.querySelector(".profile__title") as HTMLElement;
						const profileTitle = profileTitleComponent.querySelector(".text") as HTMLElement;
						profileTitle.innerText = updatedUser.first_name;
					})

				let passwordData: PasswordRequest = {
					oldPassword: inputs[6].value,
					newPassword: inputs[7].value
				}

				if (passwordData.oldPassword && passwordData.newPassword)
					new UserAPIController().changePassword(passwordData)
						.then(() => {
							inputs.forEach(
								input => {
									input.value = "";
								}
							)
						})
						.then(() => {
							inputs[6].value = "Скрыто";
							inputs[7].value = "Обновлен";
						});
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
						if (res === 'OK')
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
				"oldPassword": oldPassword,
				"newPassword": newPassword,

				"updateUserDataAction": updateUserDataAction,
				"logOutAction": logOutAction
			}
		});
	}

	render() {
		return compile(ProfileTemplate)();
	}

}