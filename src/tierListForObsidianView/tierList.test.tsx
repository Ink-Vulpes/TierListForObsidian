import "@testing-library/jest-dom/extend-expect";
import * as React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import tierList from "../tierList";
import TierList from "./TierList";
import { ObsidianPluginDummy as plugin } from "../utils/test-utils";
import tierListForObsidian from "../main";
import tier from "../tierList/tier";

jest.mock("./Tier");

var tl: tierList = new tierList();

const renderFnMock = jest.fn();
beforeEach(() => {
	tl = new tierList();
	renderFnMock.mockClear();
});

it("test render tiers", () => {
	tl.newTier();
	tl.newTier();
	tl.newTier();

	render(
		<TierList
			plugin={plugin as unknown as tierListForObsidian}
			render={renderFnMock}
			tierList={{ current: tl }}
		/>
	);
	const tierDom = screen.getAllByTestId("TierListForObsidiaTier")[2];
	expect(JSON.parse(tierDom.innerHTML)).toMatchObject(tl.tiers[2]);
});
