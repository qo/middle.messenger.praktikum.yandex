import Error from "../Error";

export default class Error500 extends Error {
	constructor() {
		super({ errorCode: "500", errorDescription: "Мы уже фиксим" });
	}
}