import "./EventBus";
import EventBus from "./EventBus";

export interface ComponentProps {
	[key: string]: any;
	children?: Record<string, Component>
}

export default class Component {
	static EVENTS = {
		INIT: "init",
		FLOW_CDM: "flow:component-did-mount",
		FLOW_CDU: "flow:component-did-update",
		FLOW_RENDER: "flow:render"
	};

	_element: HTMLElement;
	tagName: string;
	props: ComponentProps;
	eventBus: () => EventBus;

	constructor(tagName = "div", props: ComponentProps = {}) {

		this.tagName = tagName;
		this.props = this._makePropsProxy(props);

		const eventBus = new EventBus;
		this.eventBus = () => eventBus;

		this._registerEvents(this.eventBus);
		this.eventBus().emit(Component.EVENTS.INIT);
	}

	_registerEvents(eventBus: () => EventBus) {
		eventBus().on(Component.EVENTS.INIT, this.init.bind(this));
		eventBus().on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus().on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus().on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	_createResources() {
		this._element = this._createDocumentElement(this.tagName);
	}

	init() {
		this._createResources();

		this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
	}

	_componentDidMount() {
		this.componentDidMount(this.props);
	}

	componentDidMount(props: ComponentProps) {
		// Здесь можно делать что-нибудь с пропсами
		props;
	}

	dispatchComponentDidMount() {
		this.eventBus().emit(Component.EVENTS.FLOW_CDM);
	}

	_componentDidUpdate(oldProps: ComponentProps, newProps: ComponentProps) {
		const response = this.componentDidUpdate(oldProps, newProps);
		if (!response) {
			return;
		}
		this._render();
	}

	componentDidUpdate(oldProps: ComponentProps, newProps: ComponentProps) {

		// Здесь можно реализовать
		// сравнение старых и новых пропсов,
		// чтобы определить обновились ли пропсы
		if (oldProps !== newProps)

		// В нашем случае будем считать,
		// что они обновляются всегда
			return true;
	}

	setProps = (nextProps: ComponentProps) => {
		if (!nextProps) {
			return;
		}

		Object.assign(this.props, nextProps);
	};

	get element() {
		return this._element;
	}

	_render() {

		const html = this.render();

		if (!this._element.innerHTML)
			this._element.innerHTML = html.trim();

		// Если есть children
		if (this.props.children) {

			// Выбираем все DOM-элементы с аттрибутом component,
			// и если в props.children есть компонент с таким именем,
			// заменяем его на содержимое этого компонента

			this._element.querySelectorAll("[component]").forEach(
				(el) => {

					// Имя компонента и те аттрибуты, что присутствуют до замены
					const name = el.getAttribute("component");
					const attributes = el.attributes;

					// Если получили имя компонента и этот компонент есть в children
					if (name && this.props.children && this.props.children[name]) {

						// Получаем компонент
						const newEl = this.props.children[name].getContent();

						// Копируем старые аттрибуты (кроме "component")
						for (const attr of attributes) {
							if (attr.name !== "component")
								newEl.setAttribute(attr.name, attr.value);
						}

						// Заменяем старые элементы на новые
						el.replaceWith(newEl);
					}
				});

		}

		this._element = <HTMLElement>this._element.firstChild;

		this.postRender();

	}

	render(): string {
		return "Abstract Component";
	}

	postRender() {}

	getContent(): HTMLElement {
		return this.element;
	}

	_makePropsProxy(props: ComponentProps) {
		// Можно и так передать this
		// Такой способ больше не применяется с приходом ES6+
		const self = this;

		return new Proxy(props, {
			get(target: ComponentProps, prop: string) {
				const value = target[prop];
				return typeof value === "function" ? value.bind(target) : value;
			},
			set(target: ComponentProps, prop: string, value) {
				target[prop] = value;

				// Запускаем обновление компоненты
				// Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
				self.eventBus().emit(Component.EVENTS.FLOW_CDU, {...target}, target);
				return true;
			},
			deleteProperty() {
				throw new Error("Нет доступа");
			}
		});
	}

	_createDocumentElement(tagName: string): HTMLElement {
		// Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
		return document.createElement(tagName);
	}

	show() {
		this.getContent().style.display = "block";
	}

	hide() {
		this.getContent().style.display = "none";
	}
}