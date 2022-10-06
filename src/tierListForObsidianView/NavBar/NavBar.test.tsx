import "@testing-library/jest-dom/extend-expect";
import * as React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import tierList from "../../tierList";
import NavBar from ".";

const saveFnMock = jest.fn();
const renderFnMock = jest.fn();

var tl: tierList;

beforeEach(async () => {
	tl = new tierList();
	saveFnMock.mockClear();
	renderFnMock.mockClear();
	render(
		<NavBar
			tierList={{ current: tl }}
			render={renderFnMock}
			saveFn={saveFnMock}
		/>
	);
});

it("test addTier", () => {
	const addTierButtonDom = screen.getByTestId(
		"TierListForObsidianButtonAddTier"
	);
	fireEvent.click(addTierButtonDom);
	expect(tl.tiers.length).toBe(1);
});

describe("test addChild", () => {
	var addChildButtonDom: HTMLElement;
	var addTierButtonDom: HTMLElement;
	var addChildCloseButtonDom: HTMLElement;
	var addChildSaveButtonDom: HTMLElement;
	var addChildTextInputDom: HTMLElement;
	var addChildImgInputDom: HTMLElement;
	var saveFileButtoDom: HTMLElement;

	beforeEach(() => {
		addChildButtonDom = screen.getByTestId(
			"TierListForObsidianButtonAddChild"
		);
		addChildCloseButtonDom = screen.getByTestId(
			"TierListForObsidianButtonAddChildClose"
		);
		addChildSaveButtonDom = screen.getByTestId(
			"TierListForObsidianButtonAddChildSave"
		);
		addChildTextInputDom = screen.getByTestId(
			"TierListForObsidianTextInput"
		);
		addChildImgInputDom = screen.getByTestId("TierListForObsidianImgInput");

		addTierButtonDom = screen.getByTestId(
			"TierListForObsidianButtonAddTier"
		);
		saveFileButtoDom = screen.getByTestId("TierListForObsidianFileSave");
	});

	it("{withe save}", async () => {
		expect(addChildImgInputDom).not.toBeVisible();
		expect(addChildTextInputDom).not.toBeVisible();
		expect(addChildSaveButtonDom).not.toBeVisible();
		expect(addChildCloseButtonDom).not.toBeVisible();
		expect(addTierButtonDom).toBeVisible();
		expect(addChildButtonDom).toBeVisible();
		expect(saveFileButtoDom).toBeVisible();

		fireEvent.click(addChildButtonDom);
		await waitFor(() => expect(addChildImgInputDom).toBeVisible());
		await waitFor(() => expect(addChildTextInputDom).toBeVisible());
		await waitFor(() => expect(addChildSaveButtonDom).toBeVisible());
		await waitFor(() => expect(addChildCloseButtonDom).toBeVisible());
		await waitFor(() => expect(addTierButtonDom).not.toBeVisible());
		await waitFor(() => expect(addChildButtonDom).not.toBeVisible());
		await waitFor(() => expect(saveFileButtoDom).not.toBeVisible());

		fireEvent.change(addChildTextInputDom, { target: { value: "test" } });
		fireEvent.change(addChildImgInputDom, {
			target: { value: "test.jpg" },
		});
		fireEvent.click(addChildSaveButtonDom);

		await waitFor(() => expect(addChildImgInputDom).not.toBeVisible());
		await waitFor(() => expect(addChildTextInputDom).not.toBeVisible());
		await waitFor(() => expect(addChildSaveButtonDom).not.toBeVisible());
		await waitFor(() => expect(addChildCloseButtonDom).not.toBeVisible());
		await waitFor(() => expect(addTierButtonDom).toBeVisible());
		await waitFor(() => expect(addChildButtonDom).toBeVisible());
		await waitFor(() => expect(saveFileButtoDom).toBeVisible());
		expect(tl.stack[0]).toMatchObject({
			name: "test",
			img: "test.jpg",
			color: "red",
		});
	});

	it("{withe save 'Enter' on title}", async () => {
		expect(addChildImgInputDom).not.toBeVisible();
		expect(addChildTextInputDom).not.toBeVisible();
		expect(addChildSaveButtonDom).not.toBeVisible();
		expect(addChildCloseButtonDom).not.toBeVisible();
		expect(addTierButtonDom).toBeVisible();
		expect(addChildButtonDom).toBeVisible();
		expect(saveFileButtoDom).toBeVisible();

		fireEvent.click(addChildButtonDom);
		await waitFor(() => expect(addChildImgInputDom).toBeVisible());
		await waitFor(() => expect(addChildTextInputDom).toBeVisible());
		await waitFor(() => expect(addChildSaveButtonDom).toBeVisible());
		await waitFor(() => expect(addChildCloseButtonDom).toBeVisible());
		await waitFor(() => expect(addTierButtonDom).not.toBeVisible());
		await waitFor(() => expect(addChildButtonDom).not.toBeVisible());
		await waitFor(() => expect(saveFileButtoDom).not.toBeVisible());

		fireEvent.change(addChildTextInputDom, { target: { value: "test" } });
		fireEvent.change(addChildImgInputDom, {
			target: { value: "test.jpg" },
		});
		fireEvent.keyDown(addChildTextInputDom, {
			key: "Enter",
			code: "Enter",
			charCode: 13,
		});

		await waitFor(() => expect(addChildImgInputDom).not.toBeVisible());
		await waitFor(() => expect(addChildTextInputDom).not.toBeVisible());
		await waitFor(() => expect(addChildSaveButtonDom).not.toBeVisible());
		await waitFor(() => expect(addChildCloseButtonDom).not.toBeVisible());
		await waitFor(() => expect(addTierButtonDom).toBeVisible());
		await waitFor(() => expect(addChildButtonDom).toBeVisible());
		await waitFor(() => expect(saveFileButtoDom).toBeVisible());
		expect(tl.stack[0]).toMatchObject({
			name: "test",
			img: "test.jpg",
			color: "red",
		});
	});

	it("{withe save 'Enter' on img}", async () => {
		expect(addChildImgInputDom).not.toBeVisible();
		expect(addChildTextInputDom).not.toBeVisible();
		expect(addChildSaveButtonDom).not.toBeVisible();
		expect(addChildCloseButtonDom).not.toBeVisible();
		expect(addTierButtonDom).toBeVisible();
		expect(addChildButtonDom).toBeVisible();
		expect(saveFileButtoDom).toBeVisible();

		fireEvent.click(addChildButtonDom);
		await waitFor(() => expect(addChildImgInputDom).toBeVisible());
		await waitFor(() => expect(addChildTextInputDom).toBeVisible());
		await waitFor(() => expect(addChildSaveButtonDom).toBeVisible());
		await waitFor(() => expect(addChildCloseButtonDom).toBeVisible());
		await waitFor(() => expect(addTierButtonDom).not.toBeVisible());
		await waitFor(() => expect(addChildButtonDom).not.toBeVisible());
		await waitFor(() => expect(saveFileButtoDom).not.toBeVisible());

		fireEvent.change(addChildTextInputDom, { target: { value: "test" } });
		fireEvent.change(addChildImgInputDom, {
			target: { value: "test.jpg" },
		});
		fireEvent.keyDown(addChildImgInputDom, {
			key: "Enter",
			code: "Enter",
			charCode: 13,
		});

		await waitFor(() => expect(addChildImgInputDom).not.toBeVisible());
		await waitFor(() => expect(addChildTextInputDom).not.toBeVisible());
		await waitFor(() => expect(addChildSaveButtonDom).not.toBeVisible());
		await waitFor(() => expect(addChildCloseButtonDom).not.toBeVisible());
		await waitFor(() => expect(addTierButtonDom).toBeVisible());
		await waitFor(() => expect(addChildButtonDom).toBeVisible());
		await waitFor(() => expect(saveFileButtoDom).toBeVisible());
		expect(tl.stack[0]).toMatchObject({
			name: "test",
			img: "test.jpg",
			color: "red",
		});
	});

	it("{withe out save}", async () => {
		expect(addChildImgInputDom).not.toBeVisible();
		expect(addChildTextInputDom).not.toBeVisible();
		expect(addChildSaveButtonDom).not.toBeVisible();
		expect(addChildCloseButtonDom).not.toBeVisible();
		expect(addTierButtonDom).toBeVisible();
		expect(addChildButtonDom).toBeVisible();
		expect(saveFileButtoDom).toBeVisible();

		fireEvent.click(addChildButtonDom);
		await waitFor(() => expect(addChildImgInputDom).toBeVisible());
		await waitFor(() => expect(addChildTextInputDom).toBeVisible());
		await waitFor(() => expect(addChildSaveButtonDom).toBeVisible());
		await waitFor(() => expect(addChildCloseButtonDom).toBeVisible());
		await waitFor(() => expect(addTierButtonDom).not.toBeVisible());
		await waitFor(() => expect(addChildButtonDom).not.toBeVisible());
		await waitFor(() => expect(saveFileButtoDom).not.toBeVisible());

		fireEvent.change(addChildTextInputDom, { target: { value: "test" } });
		fireEvent.change(addChildImgInputDom, {
			target: { value: "test.jpg" },
		});
		fireEvent.click(addChildCloseButtonDom);

		await waitFor(() => expect(addChildImgInputDom).not.toBeVisible());
		await waitFor(() => expect(addChildTextInputDom).not.toBeVisible());
		await waitFor(() => expect(addChildSaveButtonDom).not.toBeVisible());
		await waitFor(() => expect(addChildCloseButtonDom).not.toBeVisible());
		await waitFor(() => expect(addTierButtonDom).toBeVisible());
		await waitFor(() => expect(addChildButtonDom).toBeVisible());
		await waitFor(() => expect(saveFileButtoDom).toBeVisible());
		expect(tl.stack.length).toBe(0);
	});
});

it("test save file", () => {
	const saveFileButtoDom = screen.getByTestId("TierListForObsidianFileSave");
	fireEvent.click(saveFileButtoDom);
	expect(saveFnMock).toBeCalled();
});
