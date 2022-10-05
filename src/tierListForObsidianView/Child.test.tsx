import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Child from "./Child";
import tierListForObsidian from "../main";
import tierList from "../tierList";
import { ObsidianPluginDummy as plugin } from "../utils/test-utils";
import childClass from "../tierList/child";

const renderMuck = jest.fn();
const tierListDorpMock = jest.spyOn(tierList.prototype, "drop");

var tl: tierList;
var child: childClass;
beforeEach(() => {
	tl = new tierList();
	tl.newChild("test", "test.jpg");
	child = tl.stack[0];
	tierListDorpMock.mockClear();
});

describe("test onDragStart Event", () => {
	it("{child in stack}", async () => {
		render(
			<Child
				plugin={plugin as unknown as tierListForObsidian}
				child={child}
				render={renderMuck}
				tier={undefined}
				tierList={{ current: tl }}
			/>
		);
		const childDOM = await screen.findByTestId("TierListForObsidianChild");
		fireEvent.dragStart(childDOM);
		expect(tl.dragedChildID).toBe(tl.stack[0].id);
		expect(tl.dragedChildTierID).toBe("0");
	});
	it("{child in tier}", async () => {
		tl.newTier();
		tl.moveChild(child.id, "0", "", tl.tiers[0].id);
		render(
			<Child
				plugin={plugin as unknown as tierListForObsidian}
				child={child}
				render={renderMuck}
				tier={tl.tiers[0]}
				tierList={{ current: tl }}
			/>
		);
		const childDOM = await screen.findByTestId("TierListForObsidianChild");
		fireEvent.dragStart(childDOM);
		expect(tl.dragedChildID).toBe(tl.tiers[0].children[0].id);
		expect(tl.dragedChildTierID).toBe(tl.tiers[0].id);
	});
});

it("test onDragEnd Event", async () => {
	render(
		<Child
			plugin={plugin as unknown as tierListForObsidian}
			child={child}
			render={renderMuck}
			tier={tl.tiers[0]}
			tierList={{ current: tl }}
		/>
	);
	const childDOM = await screen.findByTestId("TierListForObsidianChild");
	fireEvent.dragEnd(childDOM);
	expect(tierListDorpMock).toBeCalled();
	expect(tl).toMatchObject({
		dragedChildID: "",
		dragedChildTierID: "",
	});
});

it("test onDragEnter Event", async () => {
	render(
		<Child
			plugin={plugin as unknown as tierListForObsidian}
			child={child}
			render={renderMuck}
			tier={tl.tiers[0]}
			tierList={{ current: tl }}
		/>
	);
	const childDOM = await screen.findByTestId("TierListForObsidianChild");
	fireEvent.dragEnter(childDOM);
	expect(tl.dragedOverChildID).toBe(child.id);
});
