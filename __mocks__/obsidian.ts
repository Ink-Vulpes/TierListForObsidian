import { TIER_LIST_FOR_OBSIDIAN_DEFAULT_SETTINGS } from "../src/settings";

export class TextFileView {
	settings = TIER_LIST_FOR_OBSIDIAN_DEFAULT_SETTINGS;
	containerEl = { children: ["", true] };
	root = { unmount: () => {}, render: () => {} };
	save() {}
}
export class WorkspaceLeaf {}

export class MarkdownRenderChild {}

export class Plugin {
	registerView() {}
	registerExtensions() {}
	async loadSettings(): Promise<void> {}
	async saveSettings() {}
	async saveData() {}
	async loadData() {}
	addSettingTab() {}
	registerMarkdownCodeBlockProcessor() {}
}
Plugin.prototype.registerView = jest.fn();
Plugin.prototype.registerExtensions = jest.fn();
Plugin.prototype.loadSettings = jest.fn();
Plugin.prototype.saveSettings = jest.fn();
Plugin.prototype.saveData = jest.fn();
Plugin.prototype.loadData = jest.fn();
Plugin.prototype.addSettingTab = jest.fn();
Plugin.prototype.registerMarkdownCodeBlockProcessor = jest.fn();

export class PluginSettingTab {}
