import "@testing-library/jest-dom/extend-expect";
import * as React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import tierList from "../tierList";
import Stack from "./Stack";
import { ObsidianPluginDummy as plugin } from "../utils/test-utils";
import tierListForObsidian from "../main";
import child from "../tierList/child";

jest.mock("./Child", () => (props: { child: child }) => (
	<div data-testid="TierListForObsidianChild">
		{JSON.stringify(props.child.save())}
	</div>
));

var tl: tierList;
var renderMock = jest.fn();

beforeEach(() => {
	tl = new tierList();
	renderMock.mockClear();
});

it("test render children", () => {
	tl.newChild("test", "test.jpg");
	tl.newChild("test2", "test2.jpg");
	tl.newChild("test2", "test3.jpg");
	render(
		<Stack
			plugin={plugin as unknown as tierListForObsidian}
			render={renderMock}
			tierList={{ current: tl }}
		/>
	);
	const childDom = screen.getAllByTestId("TierListForObsidianChild")[2];
	expect(JSON.parse(childDom.innerHTML)).toEqual(tl.stack[2]);
});

it("test DragEnter Event", () => {
	tl.newChild("test", "test.jpg");
	render(
		<Stack
			plugin={plugin as unknown as tierListForObsidian}
			render={renderMock}
			tierList={{ current: tl }}
		/>
	);
	const childDom = screen.getByTestId("TierListForObsidianChild");
	fireEvent.dragEnter(childDom);
	expect(tl.dragedOverTierID).toBe("0");
});
