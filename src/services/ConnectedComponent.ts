import Store, { StoreEvents } from "./Store/Store";
import Component from "./Component";

export default class ConnectedComponent extends Component {
	constructor(props: any) {
		// не забываем передать все аргументы конструктора
		super(props);

		// подписываемся на событие обновления стора
		Store.on(StoreEvents.updated, () => {
			// вызываем обновление компонента, передав данные из хранилища
			this.setProps({ ...Store.getState() });
		});
	}
}
