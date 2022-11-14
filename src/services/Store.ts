import EventBus from "./EventBus";
import set from "../utils/set";

export enum StoreEvents {
    updated = 'updated'
};

class Store extends EventBus {
    private state: any = {};

    public getState() {
        return this.state;
    }

    public set(path: string, value: unknown) {
        set(this.state, path, value);
        this.emit(StoreEvents.updated);
    };
}

// Способ сделать синглтон
export default new Store();