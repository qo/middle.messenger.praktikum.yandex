import Component from "./Component";
import {ComponentProps} from "./Component";

function render(query: string, comp: Component) {
    const root = document.querySelector(query);
    if (root) {
        root.appendChild(comp.getContent());
        return root;
    }
    else
        throw new Error(`No ${query} element`);
}

interface ComponentConstructor {
    new (): Component;
}

class Route {

    _pathname: string;
    _blockClass: ComponentConstructor;
    _block: Component | null;
    _props: ComponentProps;

    constructor(pathname: string, view: ComponentConstructor, props: ComponentProps) {
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
        if (!this._block) {
            this._block = new this._blockClass();
            render(this._props.rootQuery, this._block);
            return;
        }

        this._block.show();
    }
}

export default class Router {

    static __instance: Router;
    routes: Route[];
    history: History;
    _currentRoute: Route | null;
    _rootQuery: string;

    constructor(rootQuery: string) {

        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, block: ComponentConstructor) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});

        this.routes.push(route);

        return this;
    }

    start() {
        window.onpopstate = ((event: PopStateEvent) => {
            // @ts-ignore
            this._onRoute(event.currentTarget.location.pathname);
        }).bind(this);

        this._onRoute(window.location.pathname);
     }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }
}