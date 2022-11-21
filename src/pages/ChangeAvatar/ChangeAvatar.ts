import ChangeAvatarTemplate from "./ChangeAvatar.template";
import Text from "../../components/Text/Text";
import Link from "../../components/Link/Link";
import {compile} from "pug";
import Component from "../../services/Component";
import Button from "../../components/Button/Button";
import "./ChangeAvatar.scss";

export default class ChangeAvatar extends Component {

    constructor() {

        const changeAvatarTitle = new Text({text: 'Загрузите файл'});
        const changeAvatarLink = new Link({
            action: () => {
                console.log("Здесь должно открываться окно выбора файла");
            },
            text: "Выбрать файл на компьютере"
        });
        const changeAvatarButton = new Button({
            text: "Поменять",
            action: () => {
            }
        });

        super("div", {
            "children": {
                "changeAvatarTitle": changeAvatarTitle,
                "changeAvatarLink": changeAvatarLink,
                "changeAvatarButton": changeAvatarButton
            }
        });
    }

    render() {
        return compile(ChangeAvatarTemplate)();
    }
}