import { ComponentProps } from "./Component";
import replaceElementWithComponent from "../utils/replaceElementWithComponent";
import ConnectedComponent from "./ConnectedComponent";

class Route {
	_pathname: string;

	_blockClass: typeof ConnectedComponent;

	_block: ConnectedComponent | null;

	_props: ComponentProps;

	constructor(pathname: string, view: typeof ConnectedComponent, props: ComponentProps) {
		this._pathname = pathname;
		this._blockClass = view;
		this._block = null;
		this._props = props;
	}

	navigate(pathname: string) {
		if (this.match(pathname)) {
			this._pathname = pathname;
			this.render();
		}
	}

	leave() {
		if (this._block) {
			this._block.hide();
		}
	}

	match(pathname: string) {
		return pathname === this._pathname;
	}

	render() {
		console.log("rendering", this);
		if (!this._block) {
			this._block = new this._blockClass(this._props);
		}
		replaceElementWithComponent(this._props.rootQuery, this._block);
		this._block.show();
	}
}

export default class Router {
	routes: Route[];

	history: History;

	_currentRoute: Route | null;

	_rootQuery: string;

	constructor(rootQuery: string) {
		this.routes = [];
		this.history = window.history;
		this._currentRoute = null;
		this._rootQuery = rootQuery;
	}

	use(pathname: string, block: typeof ConnectedComponent) {
		const route = new Route(pathname, block, { rootQuery: this._rootQuery });

		this.routes.push(route);

		return this;
	}

	start() {
		window.onpopstate = ((event: PopStateEvent) => {
			// @ts-ignore
			this._onRoute(event.currentTarget.location.pathname);
		});

		this._onRoute(window.location.pathname);
	}

	_onRoute(pathname: string) {
		console.log("now on path", pathname);

		const route = this.getRoute(pathname);
		if (!route) {
			return;
		}

		console.log("route");

		if (this._currentRoute && this._currentRoute !== route) {
			console.log("leaving", this._currentRoute);
			this._currentRoute.leave();
		}

		this._currentRoute = route;
		route.render();
	}

	go(pathname: string) {
		console.log("going on path", pathname);

		this.history.pushState({}, "", pathname);
		this._onRoute(pathname);
	}

	back() {
		this.history.back();
	}

	forward() {
		this.history.forward();
	}

	getRoute(pathname: string) {
		return this.routes.find((route) => route.match(pathname));
	}
}
