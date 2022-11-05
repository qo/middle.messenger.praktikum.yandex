import Error from "../Error";

export default class Error404 extends Error {
	constructor() {
		super({ errorCode: "404", errorDescription: "Не туда попали" });
	}
}