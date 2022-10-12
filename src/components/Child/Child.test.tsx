import "@testing-library/jest-dom";
import * as React from "react";
import Child from "./index";
import { render, screen, fireEvent } from "@testing-library/react";

import * as plugin from "../../main";
import * as _plugin from "../../__mocks__/main";
import * as tier from "../../tierList/tier";
import * as _tier from "../../tierList/__mocks__/tier";
import * as child from "../../tierList/child";
import * as _child from "../../tierList/__mocks__/child";
import * as tierList from "../../tierList";
import * as _tierList from "../../__mocks__/tierList";
import { App, PluginManifest } from "obsidian";

jest.mock("../../main");
jest.mock("../../tierList/tier");
jest.mock("../../tierList/child");
jest.mock("../../tierList");
jest.mock("../../utils/renderHook");

const mockedPlugin = plugin as unknown as typeof _plugin;
const mockedTier = tier as typeof _tier;
const mockedChild = child as typeof _child;
const mockedTierList = tierList as typeof _tierList;
const mockedRenderHook = jest.fn();

var tl: tierList.default;
var childDom: HTMLElement;
const plug = new plugin.default(
	null as unknown as App,
	null as unknown as PluginManifest
);

beforeEach(() => {
	jest.clearAllMocks();
	tl = new tierList.default();
});
describe("test startDnd()", () => {
	it("tier is set", () => {
		render(
			<Child
				child={new child.default("", "")}
				tier={new tier.default()}
				plugin={plug}
				render={mockedRenderHook}
				tierList={{ current: tl }}
			/>
		);
		childDom = screen.getByTestId("TierListForObsidianChild");
		fireEvent.dragStart(childDom);
		expect(tl).toMatchObject({
			draggedChildID: _child.dummySave.id,
			draggedChildTierID: _tier.dummySave.id,
		});
	});
	it("tier is not set", () => {
		render(
			<Child
				child={new child.default("", "")}
				tier={undefined}
				plugin={plug}
				render={mockedRenderHook}
				tierList={{ current: tl }}
			/>
		);
		childDom = screen.getByTestId("TierListForObsidianChild");
		fireEvent.dragStart(childDom);
		expect(tl).toMatchObject({
			draggedChildID: _child.dummySave.id,
			draggedChildTierID: "0",
		});
	});
});
it("test stopDnd()", () => {
	render(
		<Child
			child={new child.default("", "")}
			tier={undefined}
			plugin={plug}
			render={mockedRenderHook}
			tierList={{ current: tl }}
		/>
	);
	childDom = screen.getByTestId("TierListForObsidianChild");
	tl.draggedChildTierID = "dummy";
	tl.draggedChildTierID = "dummy";
	fireEvent.dragEnd(childDom);
	expect(tl.drop).toBeCalledWith(mockedRenderHook);
	expect(tl).toMatchObject({
		draggedChildID: "",
		draggedChildTierID: "",
	});
});
it.skip("test onDragged()",()=>{
	render(
		<Child
			child={new child.default("", "")}
			tier={undefined}
			plugin={plug}
			render={mockedRenderHook}
			tierList={{ current: tl }}
		/>
	);
	childDom = screen.getByTestId("TierListForObsidianChild");
	tl.

});
