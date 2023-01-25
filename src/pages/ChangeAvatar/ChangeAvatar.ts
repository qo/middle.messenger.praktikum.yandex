import ChangeAvatarTemplate from "./ChangeAvatar.template";
import Text from "../../components/Text/Text";
import Link from "../../components/Link/Link";
import {compile} from "pug";
import Component from "../../services/Component";
import Button from "../../components/Button/Button";
import "./ChangeAvatar.scss";
import Input from "../../components/Input/Input";
import validate from "../../utils/validate";
import UserAPIController from "../../utils/controllers/user-api-controller";
import router from "../../index";

export default class ChangeAvatar extends Component {

    constructor() {

        super("div", {
            "children": {}
        });
    }

    render() {
        return compile(ChangeAvatarTemplate)();
    }

    postRender() {

        const form = this.getContent().querySelector("form");

        if (form) {
            form.addEventListener("submit", (e) => {

                    e.preventDefault();

                    const formData = new FormData(form);

                    for (let pair of formData.entries()) {
                        console.log(pair[0]+ ', ' + pair[1]);
                    }

                    new UserAPIController()
                        .changeAvatar(formData)
                        .then(() => router.go("/profile"));
                }
            )
        }
    }

}