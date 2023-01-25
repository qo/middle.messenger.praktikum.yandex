import { compile } from "pug";
import Component from "../../services/Component";
import Input from "../Input/Input";
import Button from "../Button/Button";
import FormWindowProps from "./FormWindowProps";
import Text from "../Text/Text";
import FormWindowTemplate from "./FormWindow.template";
import './FormWindow.scss';

export default class FormWindow extends Component {

    constructor(props: FormWindowProps) {

        const formTitle = new Text({ text: props.formTitle });
        const confirmButton = new Button({ text: "Подтвердить", action: () => { props.action(); this.hide(); } });
        const cancelButton = new Button({ text: "Отменить", action: () => this.hide() });

        super("div", { ...props, children: {
                "formTitle": formTitle,
                "confirmButton": confirmButton,
                "cancelButton": cancelButton
            }
        });
    }

    render() {
        return compile(FormWindowTemplate)(this.props);
    }

    postRender() {
        const inputsWrapper = this._element.querySelector('.form_window__inputs') as HTMLElement;
        this.props.inputNames.forEach(
            (inputName: string) => {
                const input = new Input({ label: inputName, type: "text", placeholder: "" });
                inputsWrapper.append(input.getContent());
            }
        );
    }

    show() {
        this.getContent().style.display = "flex";
    }

    hide() {
        this.getContent().style.display = "none";
    }
}