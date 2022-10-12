import "@testing-library/jest-dom";
import Child from "./index";
import { render, screen, fireEvent } from "@testing-library/react";

import * as plugin from "../../main";
import * as _plugin from "../../__mocks__/main"
import * as tier from "../../tierList/tier";
import * as _tier from "../../tierList/__mocks__/tier";
import * as child from "../../tierList/child";
import * as _child from "../../tierList/__mocks__/child";
import * as tierList from "../../tierList";
import * as _tierList from "../../__mocks__/tierList";
import {App, PluginManifest} from "obsidian"

jest.mock("../../main");
jest.mock("../../tierList/tier");
jest.mock("../../tierList/child");
jest.mock("../../tierList");

const mockedPlugin = plugin as unknown as typeof _plugin
const mockedTier = tier as typeof _tier;
const mockedChild = child as typeof _child;
const mockedTierList = tierList as typeof _tierList;

beforeEach(() => {
	render(
		<Child
			child={new child.default("", "")}
			tier={new tier.default()}
			plugin={
				new plugin.default(
					null as unknown as App,
					null as unknown as PluginManifest
				)
			
			}
		/>
	);
});
it("test startDnd()", () => {});
it.todo("test stopDnd()");
it.todo("test onDragged()");
