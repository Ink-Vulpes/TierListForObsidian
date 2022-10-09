import { App, PluginManifest } from "obsidian";
import tierListForObsidian from "./main";

jest.mock("obsidian");

beforeEach(() => jest.clearAllMocks());

it("test onload()", async () => {
	const m = new tierListForObsidian(
		null as unknown as App,
		null as unknown as PluginManifest
	);
	await m.onload();
	expect(m.addSettingTab).toBeCalled();
	expect(m.registerView).toBeCalled();
	expect(m.registerExtensions).toBeCalled();
	expect(m.registerMarkdownCodeBlockProcessor).toBeCalled();
});
