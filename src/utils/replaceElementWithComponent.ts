import Component from "../services/Component";

export default function replaceElementWithComponent(el: string, component: Component) {
	const domEl = document.querySelector(el);
	if (!domEl) {
		throw Error(`Отсутствует элемент ${el}`);
	}
	domEl.replaceChildren(component.getContent());
}