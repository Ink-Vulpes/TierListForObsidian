import tierList, { tierListSaveFormat } from "./.";
import * as child from "./child";
import * as tier from "./tier";
import * as _child from "./__mocks__/child";
import * as _tier from "./__mocks__/tier";
import { saveDummy } from "./__mocks__/tierList";

const mockedTier = tier as typeof _tier;
const mockedChild = child as typeof _child;

jest.mock("./child");
jest.mock("./tier");

var tl: tierList;
beforeEach(() => {
	jest.clearAllMocks();
	tl = new tierList();
});

it("test newChild()", () => {
	tl.newChild("", "");
	expect(mockedChild.default).toBeCalled();
});

it("test newTier()", () => {
	tl.newTier();
	expect(mockedTier.default).toBeCalled();
});
describe("test removeChild()", () => {
	it("from Stack (tierId = 0)", () => {
		tl.stack.push(new child.default("", ""));
		tl.removeChild(_child.dummySave.id, "0");
		expect(tl.stack[0]).toBeUndefined();
	});
	it("from tier", () => {
		tl.tiers.push(new tier.default());
		tl.removeChild(_child.dummySave.id, _tier.dummySave.id);
		expect(mockedTier._removeChild).toBeCalledWith(_child.dummySave.id);
	});
});
describe("test addChildTo()", () => {
	it("to Stack", () => {
		tl.addChildTo(new child.default("", ""), "0", "");
		expect(tl.stack[0]).toMatchObject(_child.dummySave);
	});
	it("to tier", () => {
		tl.tiers.push(new tier.default());
		tl.tiers[0].children.push(new child.default("", ""));
		const newChild = new child.default("name", "img");
		tl.addChildTo(newChild, _tier.dummySave.id, _child.dummySave.id);
		expect(mockedTier._addChild).toBeCalledWith(newChild, 1);
	});
});
it("test removeTier()", () => {
	tl.tiers.push(new tier.default());
	tl.tiers.push(new tier.default());
	tl.tiers.push(new tier.default());
	tl.tiers[0].id = "1";
	tl.tiers[1].id = "2";
	tl.tiers[2].id = "3";
	tl.removeTier("2");
	expect(tl.tiers.length).toBe(2);
	expect(tl.tiers[0].id).toBe("1");
	expect(tl.tiers[1].id).toBe("3");
});
describe("test moveChild()", () => {
	it("child is undefined", () => {
		tl.removeChild = jest.fn(() => undefined);
		tl.addChildTo = jest.fn();
		tl.moveChild("childId", "childTierId", "moveToChildId", "moveToTierID");
		expect(tl.removeChild).toBeCalledWith("childId", "childTierId");
		expect(tl.addChildTo).not.toBeCalled();
	});
	it("moveToTierId is del", () => {
		tl.removeChild = jest.fn(() => new child.default("", ""));
		tl.addChildTo = jest.fn();
		tl.moveChild("childId", "childTierId", "del", "moveToTierId");
		expect(tl.addChildTo).not.toBeCalled();
	});
	it("normal case", () => {
		const dummychild = new child.default("", "");
		tl.removeChild = jest.fn(() => dummychild);
		tl.addChildTo = jest.fn();
		tl.moveChild("childId", "childTierId", "moveToChildId", "moveToTierId");
		expect(tl.addChildTo).toBeCalledWith(
			dummychild,
			"moveToTierId",
			"moveToChildId"
		);
	});
});

describe("test load()", () => {
	it("normal case", () => {
		tl.stack.push(new child.default("", ""));
		tl.tiers.push(new tier.default());
		tl.name = saveDummy.name;
		const tl2 = new tierList();
		tl2.load(saveDummy);
		expect(tl2).toMatchObject(tl);
	});
	it("undefined as name", () => {
		const errorSaveDummy = { ...saveDummy };
		errorSaveDummy.name = undefined as unknown as string;
		expect(tl.load(errorSaveDummy)).toBeUndefined();
	});
});
it("test save()", () => {
	tl.stack.push(new child.default("", ""));
	tl.tiers.push(new tier.default());
	tl.name = saveDummy.name;
	expect(tl.save()).toMatchObject(saveDummy);
});
describe("test drop()", () => {
	it("edit true", () => {
		tl.edit = true;
		const callbackFN = jest.fn();
		tl.moveChild = jest.fn();
		tl.drop(callbackFN);
		expect(tl.moveChild).toBeCalledWith(
			tl.dragedChildID,
			tl.dragedChildTierID,
			tl.dragedOverChildID,
			tl.dragedOverTierID
		);
		expect(callbackFN).toBeCalled();
	});
	it("edit false", () => {
		tl.edit = false;
		const callbackFN = jest.fn();
		tl.moveChild = jest.fn();
		tl.drop(callbackFN);
		expect(tl.moveChild).not.toBeCalled();
		expect(callbackFN).not.toBeCalled();
	});
});
