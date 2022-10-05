import { App, PluginManifest } from "obsidian";
import main from "./main";

jest.mock("obsidian");

it("test onload()", () => {
	const m = new main(
		null as unknown as App,
		null as unknown as PluginManifest
	);
	const registerViewMock = jest.fn();
	const registerExtensionsMock = jest.fn();
	m.registerView = registerViewMock;
	m.registerExtensions = registerExtensionsMock;
	m.onload();
	expect(registerViewMock).toBeCalled();
	expect(registerExtensionsMock).toBeCalled();
});
