import tierListForObsidian from "main";
import { App, PluginSettingTab, Setting } from "obsidian";

export type TierListForObsidianSettings = {
	ImgPath: string;
};
export const TIER_LIST_FOR_OBSIDIAN_DEFAULT_SETTINGS: TierListForObsidianSettings =
	{
		ImgPath: "",
	};
export class TierListForObsidianSettingsTab extends PluginSettingTab {
	plugin: tierListForObsidian;
	constructor(App: App, plugin: tierListForObsidian) {
		super(App, plugin);
		this.plugin = plugin;
	}
	display() {
		this.containerEl.empty();
		new Setting(this.containerEl)
			.setName("Image Folder")
			.setDesc("A place where you put your pictures.")
			.addText((text) =>
				text
					.setValue(this.plugin.settings.ImgPath)
					.setPlaceholder("Path")
					.onChange((v) => {
						this.plugin.settings.ImgPath = v;
						this.plugin.saveSettings();
					})
			);
	}
}
