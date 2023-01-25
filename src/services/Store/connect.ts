import Component, {ComponentProps} from "../Component";
import Store, {StoreEvents} from "./Store";

export default function connect(ComponentClass: typeof Component) {

    class ConnectedComponent extends ComponentClass {
        constructor(props: any) {

            // не забываем передать все аргументы конструктора
            super(props);

            // подписываемся на событие обновления стора
            Store.on(StoreEvents.updated, () => {
                // вызываем обновление компонента, передав данные из хранилища
                this.setProps({...Store.getState()});
            });
        }
    }

    return ConnectedComponent;

}