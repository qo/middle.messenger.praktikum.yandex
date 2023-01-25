import { expect } from "chai";

describe("Тесты роутера", () => {
	it("Переход на новую страницу фиксируется в объекте history", () => {
		window.history.pushState({ page: "login" }, "Login", "/login");
		window.history.pushState({ page: "register" }, "Register", "/register");
		expect(window.history.length).to.eq(3);
	});
});
