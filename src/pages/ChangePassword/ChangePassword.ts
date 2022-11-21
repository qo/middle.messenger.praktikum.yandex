import GoBack from "../../components/GoBack/GoBack";
import Text from "../../components/Text/Text";
import ProfileDataEntry from "../../components/ProfileDataEntry";
import ChangePasswordTemplate from "./ChangePassword.template";
import {compile} from "pug";
import Component from "../../services/Component";
import "./ChangePassword.scss";

export default class ChangePassword extends Component {

    constructor() {

        const goBack = new GoBack({});

        const profileTitle = new Text({text: "Автор"});

        const oldPassword = new ProfileDataEntry({title: "Старый пароль", type: "password", placeholder: ""});
        const newPassword = new ProfileDataEntry({title: "Новый пароль", type: "password", placeholder: ""});
        const newPasswordConfirm = new ProfileDataEntry({title: "Повторите новый пароль", type: "password", placeholder: ""});

        super("div", {
            "children": {
                "goBack": goBack,
                "profileTitle": profileTitle,

                "oldPassword": oldPassword,
                "newPassword": newPassword,
                "newPasswordConfirm": newPasswordConfirm
            }
        });
    }

    render() {
        return compile(ChangePasswordTemplate)();
    }

}