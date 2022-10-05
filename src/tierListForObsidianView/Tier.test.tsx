import "@testing-library/jest-dom/extend-expect";
import * as React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Tier from "./Tier";
import child from "../tierList/child";
import { ObsidianPluginDummy as plugin } from "../utils/test-utils";
import tierListForObsidian from "../main";
import tierList from "../tierList";

jest.mock("./Child");

var tl: tierList = new tierList();

const renderFnMock = jest.fn();
beforeEach(() => {
	tl = new tierList();
	tl.newTier();
	renderFnMock.mockClear();
});

describe("test settings", () => {
	it("{enter on textInput}", async () => {
		render(
			<Tier
				plugin={plugin as unknown as tierListForObsidian}
				render={renderFnMock}
				tier={tl.tiers[0]}
				tierList={{ current: tl }}
			/>
		);
		const textDom = screen.getByTestId("TierListForObsidiaTierText");
		const inputTextDom = screen.getByTestId(
			"TierListForObsidiaTierInputText"
		);
		const inputImgDom = screen.getByTestId(
			"TierListForObsidiaTierInputImg"
		);

		expect(textDom).toBeVisible();
		expect(inputTextDom).not.toBeVisible();
		expect(inputImgDom).not.toBeVisible();

		fireEvent.click(textDom);

		await waitFor(() => expect(textDom).not.toBeVisible());
		await waitFor(() => expect(inputImgDom).toBeVisible());
		await waitFor(() => expect(inputTextDom).toBeVisible());

		fireEvent.change(inputTextDom, { target: { value: "test" } });
		fireEvent.change(inputImgDom, { target: { value: "test" } });
		fireEvent.keyDown(inputTextDom, {
			key: "Enter",
			code: "Enter",
			charCode: 13,
		});

		await waitFor(() => expect(textDom).toBeVisible());
		await waitFor(() => expect(inputImgDom).not.toBeVisible());
		await waitFor(() => expect(inputTextDom).not.toBeVisible());
		expect(tl.tiers[0]).toMatchObject({
			name: "test",
			color: "test",
		});
	});

	it("{Enter on imgInput}", async () => {
		render(
			<Tier
				plugin={plugin as unknown as tierListForObsidian}
				render={renderFnMock}
				tier={tl.tiers[0]}
				tierList={{ current: tl }}
			/>
		);
		const textDom = screen.getByTestId("TierListForObsidiaTierText");
		const inputTextDom = screen.getByTestId(
			"TierListForObsidiaTierInputText"
		);
		const inputImgDom = screen.getByTestId(
			"TierListForObsidiaTierInputImg"
		);

		expect(textDom).toBeVisible();
		expect(inputTextDom).not.toBeVisible();
		expect(inputImgDom).not.toBeVisible();

		fireEvent.click(textDom);

		await waitFor(() => expect(textDom).not.toBeVisible());
		await waitFor(() => expect(inputImgDom).toBeVisible());
		await waitFor(() => expect(inputTextDom).toBeVisible());

		fireEvent.change(inputTextDom, { target: { value: "test" } });
		fireEvent.change(inputImgDom, { target: { value: "test" } });
		fireEvent.keyDown(inputImgDom, {
			key: "Enter",
			code: "Enter",
			charCode: 13,
		});

		await waitFor(() => expect(textDom).toBeVisible());
		await waitFor(() => expect(inputImgDom).not.toBeVisible());
		await waitFor(() => expect(inputTextDom).not.toBeVisible());
		expect(tl.tiers[0]).toMatchObject({
			name: "test",
			color: "test",
		});
	});
});

it("test render child", () => {
	tl.addChildTo(new child("test", "test.jpg"), tl.tiers[0].id, "");
	tl.addChildTo(new child("test2", "test2.jpg"), tl.tiers[0].id, "");
	tl.addChildTo(new child("test3", "test3.jpg"), tl.tiers[0].id, "");

	render(
		<Tier
			plugin={plugin as unknown as tierListForObsidian}
			render={renderFnMock}
			tier={tl.tiers[0]}
			tierList={{ current: tl }}
		/>
	);
	const childDom = screen.getAllByTestId("TierListForObsidianChild")[2];
	expect(JSON.parse(childDom.innerHTML)).toMatchObject(
		tl.tiers[0].children[2]
	);
});

it("test remove tier", () => {
	tl.removeTier = jest.fn();
	render(
		<Tier
			plugin={plugin as unknown as tierListForObsidian}
			render={renderFnMock}
			tier={tl.tiers[0]}
			tierList={{ current: tl }}
		/>
	);
	const removeButton = screen.getByTestId(
		"TierListForObsidiaTierButtonRemove"
	);
	fireEvent.click(removeButton);
	expect(renderFnMock).toBeCalled();
	expect(tl.removeTier).toBeCalled();
});

it("test onDragEnter Event", () => {
	render(
		<Tier
			plugin={plugin as unknown as tierListForObsidian}
			render={renderFnMock}
			tier={tl.tiers[0]}
			tierList={{ current: tl }}
		/>
	);
	const TierDom = screen.getByTestId("TierListForObsidiaTier");
	fireEvent.dragEnter(TierDom);
	expect(tl.dragedOverTierID).toBe(tl.tiers[0].id);
});
