import tier from "./tier";
import * as child from "./child";
import * as _child from "./__mocks__/child";
import { dummySave } from "./__mocks__/tier";

const mockedChild = child as typeof _child;
jest.mock("./child");

var t: tier;
beforeEach(() => {
	jest.clearAllMocks();
	t = new tier();
});

describe("test removeChild()", () => {
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
	it("id is not given", () => {
		expect(t.removeChild("4")).toBeUndefined();
	});
});
describe("test addChild()", () => {
	beforeEach(() => {
		t.children.push(new child.default("", ""));
		t.children.push(new child.default("", ""));
		t.children.push(new child.default("", ""));
		t.children[0].id = "1";
		t.children[1].id = "2";
	});
	it("index is given", () => {
		const newChild = new child.default("", "");
		t.addChild(newChild, 0);
		expect(t.children[1]).toMatchObject(newChild);
	});
	it("index is undefined", () => {
		const newChild = new child.default("", "");
		t.addChild(newChild);
		expect(t.children[3]).toMatchObject(newChild);
	});
});
describe("test getChildIndex()", () => {
	beforeEach(() => {
		t.children.push(new child.default("", ""));
		t.children.push(new child.default("", ""));
		t.children.push(new child.default("", ""));
		t.children[0].id = "1";
		t.children[1].id = "2";
	});
	it("childId is given", () => {
		expect(t.getChildIndex("2")).toBe(1);
	});
	it("childId is not given", () => {
		expect(t.getChildIndex("3")).toBeUndefined();
	});
});
it("test save()", () => {
	t.children.push(new child.default("", ""));
	t.id = dummySave.id;
	t.color = dummySave.color;
	t.name = dummySave.name;
	expect(t.save()).toMatchObject(dummySave);
});
it("test load", () => {
	t.children.push(new child.default("", ""));
	t.id = dummySave.id;
	t.color = dummySave.color;
	t.name = dummySave.name;
	const t2 = new tier();
	t2.load(dummySave);
	expect(t2).toEqual(t);
});
