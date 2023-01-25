import { assert } from "chai";
import { compile } from "pug";
import Component from "./Component";

class TestComponent extends Component {
	render(): string {
		return compile("div Текст")();
	}
}

const testComponent = new TestComponent();

describe("Тесты компонента", () => {
	before(() => {
		testComponent.setProps({ some_prop: "test" });
	});

	it("render() возвращает скомпиленный html", () => {
		assert.equal(testComponent.getContent().innerHTML, "Текст");
	});

	it("setProps() обновляет пропсы", () => {
		testComponent.setProps({ some_prop_2: "test" });
		assert.deepEqual(testComponent.props, { some_prop: "test", some_prop_2: "test" });
	});
});
