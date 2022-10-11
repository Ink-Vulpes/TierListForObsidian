import tier from "./tier";
import * as child from "./child";
import * as _child from "./__mocks__/child";

const mockedChild = child as typeof _child;

var t: tier;
beforeEach(() => {
	jest.clearAllMocks();
	t = new tier();
});

describe("test removeChild", () => {
	beforeEach(() => {
		t.children.push(new child.default("", ""));
		t.children.push(new child.default("", ""));
		t.children.push(new child.default("", ""));
		t.children[0].id = "1";
		t.children[1].id = "2";
		t.children[2].id = "3";
	});
	it("id is given", () => {
		t.removeChild("2");
		expect(t.children[0].id).toBe("1");
		expect(t.children[1].id).toBe("3");
	});
	it("id is not given", () => {});
});
it.todo("test addChild");
it.todo("test getChildIndex");
it.todo("test save");
it.todo("test load");
