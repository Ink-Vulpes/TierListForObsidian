import { WorkspaceLeaf } from "obsidian";
import index from ".";
import tierListForObsidian, { TIER_LIST_FOR_OBSIDIAN_VIEW_TYP } from "../main";
import * as reactClient from "react-dom/client";
import * as ReactDOM from "react-dom";
import { tierListSaveFormat } from "../tierList";

jest.mock("obsidian");
jest.mock("react-dom/client", () => ({
	__esModule: true,
	createRoot: () => ({ unmount: () => {} }),
}));
jest.mock("react-dom", () => ({
	__esModule: true,
	unmountComponentAtNode: () => {},
}));

var i: index;
beforeEach(() => {
	i = new index(
		null as unknown as WorkspaceLeaf,
		null as unknown as tierListForObsidian
	);
	jest.clearAllMocks();
});

it("test onOpen()", () => {
	const createRootMock = jest.spyOn(reactClient, "createRoot");
	i.onOpen();
	expect(createRootMock).toBeCalledWith(true);
});

it("test onClose()", () => {
	const unmountMock = jest.fn();
	const saveMock = jest.fn();
	const reactUnmoutMock = jest.spyOn(ReactDOM, "unmountComponentAtNode");
	i.save = saveMock;
	i.root.unmount = unmountMock;
	i.onClose();
	expect(saveMock).toBeCalled();
	expect(unmountMock).toBeCalled();
	expect(reactUnmoutMock).toBeCalledWith(true);
});

it("test getViewData()", () => {
	const saveMock = jest.fn(() => dummyData);
	i.tierList.save = saveMock;
	expect(JSON.parse(i.getViewData()).name).toBe("name");
});

it("test getViewType()", () => {
	expect(i.getViewType()).toBe(TIER_LIST_FOR_OBSIDIAN_VIEW_TYP);
});

it("test setViewData()", () => {
	const loadMock = jest.fn();
	const renderMock = jest.fn();
	i.tierList.load = loadMock;
	i.root.render = renderMock;
	i.setViewData(dummySave);

	expect(renderMock).toBeCalled();
	expect(loadMock).toBeCalledWith(dummyData);
});

const dummySave = '{"name":"name","stack":[],"tiers":[]}';
const dummyData = {
	name: "name",
	stack: new Array(),
	tiers: new Array(),
};
