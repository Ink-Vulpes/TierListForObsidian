import tierListForObsidian from "main";
import { App, PluginSettingTab, Setting, TextAreaComponent } from "obsidian";
import { tierSaveFormat } from "tierList";
import tier from "tierList/tier";

export type TierListForObsidianSettings = {
	ImgPath: string;
	RootPath: string;
	DefaultTiers: Array<tierSaveFormat>;
};
export const TIER_LIST_FOR_OBSIDIAN_DEFAULT_SETTINGS: TierListForObsidianSettings =
	{
		ImgPath: "",
		RootPath: "",
		DefaultTiers: loadDefaultTiers(),
	};
function loadDefaultTiers(): Array<tierSaveFormat> {
	const ATier = new tier();
	const BTier = new tier();
	const CTier = new tier();
	const DTier = new tier();
	const FTier = new tier();

	ATier.name = "A";
	BTier.name = "B";
	CTier.name = "C";
	DTier.name = "D";
	FTier.name = "F";

	ATier.color = "#b8cf55";
	BTier.color = "#c69939";
	CTier.color = "#c67839";
	DTier.color = "#c65539";
	FTier.color = "#c63939";

	return [
		ATier.save(),
		BTier.save(),
		CTier.save(),
		DTier.save(),
		FTier.save(),
	];
}
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

		new Setting(this.containerEl)
			.setName("Tier List Folder")
			.setDesc("A directory where the lists are created.")
			.addText((text) =>
				text
					.setValue(this.plugin.settings.RootPath)
					.setPlaceholder("Path")
					.onChange((v) => {
						this.plugin.settings.RootPath = v;
						this.plugin.saveSettings();
					})
			);

		new Setting(this.containerEl)
			.setName("Default Tiers")
			.setDesc("Tiers used when creating a new list.")
			.addButton((button) =>
				button.setButtonText("Add").onClick(() => {
					this.plugin.settings.DefaultTiers.push(new tier());
					this.renderTiersSettings(DefaultTiersSettingTable);
					this.plugin.saveSettings();
				})
			)
			.addButton((button) =>
				button.setButtonText("Default").onClick(() => {
					this.plugin.settings.DefaultTiers = loadDefaultTiers();
					this.renderTiersSettings(DefaultTiersSettingTable);
					this.plugin.saveSettings();
				})
			);
		const DefaultTiersSettingTable = this.containerEl.createEl("table");
		this.renderTiersSettings(DefaultTiersSettingTable);
	}

	private renderTiersSettings(table: HTMLTableElement) {
		table.innerHTML = `
			<tr>
				<th>Name</th>
				<th>Color</th>
				<th>Remove</th>
			</tr>
		`;
		for (let i = 0; i < this.plugin.settings.DefaultTiers.length; i++) {
			const tierEl = this.plugin.settings.DefaultTiers[i];
			const newTr = table.createEl("tr");
			const newTdName = newTr
				.createEl("td")
				.createEl("input", { type: "text", value: tierEl.name });
			const newTdColor = newTr
				.createEl("td")
				.createEl("input", { type: "color", value: tierEl.color });
			const newTdRemove = newTr
				.createEl("td")
				.createEl("button", { text: "Remove" });

			newTdName.addEventListener("change", (e: InputEvent) => {
				if (e.target === null) return;
				const target = e.target as HTMLTextAreaElement;
				tierEl.name = target.value;
				this.plugin.saveSettings();
			});

			newTdColor.addEventListener("change", (e: InputEvent) => {
				if (e.target === null) return;
				const target = e.target as HTMLInputElement;
				tierEl.color = target.value;
				this.plugin.saveSettings();
			});

			newTdRemove.addEventListener("click", () => {
				this.plugin.settings.DefaultTiers.splice(i, 1);
				newTr.outerHTML = "";
				this.plugin.saveSettings();
			});
		}
	}
}
