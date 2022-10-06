import * as React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import App from ".";
import { ObsidianPluginDummy as plugin } from "../../utils/test-utils";
import tierListForObsidian from "../../main";
import tierList from "../../tierList";
import "@testing-library/jest-dom/extend-expect";

jest.mock("../NavBar", () => () => <div></div>);
jest.mock("../stack", () => () => <div></div>);
jest.mock("../TierList", () => () => <div></div>);

var tl: tierList;
var AppTitleDom: HTMLElement;
var AppInputDom: HTMLElement;
const saveFnMock = jest.fn();

beforeEach(async () => {
	tl = new tierList();
	render(
		<App
			plugin={plugin as unknown as tierListForObsidian}
			saveFn={saveFnMock}
			tList={tl}
		/>
	);
	saveFnMock.mockClear();
	AppTitleDom = await screen.findByTestId("TierListForObsidianTitle");
	AppInputDom = await screen.findByTestId("TierListForObsidiaInput");
});

it("test setTitle Event", async () => {
	expect(AppInputDom).not.toBeVisible();
	expect(AppTitleDom).toBeVisible();
	fireEvent.click(AppTitleDom);
	await waitFor(() => expect(AppTitleDom).not.toBeVisible());
	await waitFor(() => expect(AppInputDom).toBeVisible());
	fireEvent.change(AppInputDom, { target: { value: "test" } });
	fireEvent.keyDown(AppInputDom, {
		key: "Enter",
		code: "Enter",
		charCode: 13,
	});
	await waitFor(() => expect(AppTitleDom).toBeVisible());
	await waitFor(() => expect(AppInputDom).not.toBeVisible());
	expect(tl.name).toBe("test");
});
