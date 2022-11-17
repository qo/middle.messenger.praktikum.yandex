import Component, {ComponentProps} from "../Component";
import Store, {StoreEvents} from "./Store";

export default function connect(ComponentClass: typeof Component) {

    abstract class ConnectedComponent extends ComponentClass {
        constructor(tagName = "div", props: ComponentProps) {
            // не забываем передать все аргументы конструктора
            super(tagName, props);

            // подписываемся на событие обновления стора
            Store.on(StoreEvents.updated, () => {
                // вызываем обновление компонента, передав данные из хранилища
                this.setProps({...Store.getState()});
            });
        }
        abstract render(): string;
    }

    return ConnectedComponent;

}