import tierListForObsidian, { TIER_LIST_FOR_OBSIDIAN_VIEW_TYP } from "main";
import { Modal, Setting } from "obsidian";
import tierList from "tierList";
import tier from "tierList/tier";

export default class newTierListModal extends Modal {
	plugin: tierListForObsidian;
	tierList: tierList;

	constructor(plugin: tierListForObsidian) {
		super(plugin.app);
		this.plugin = plugin;
	}

	onOpen(): void {
		const { contentEl } = this;
		this.tierList = new tierList();

		this.plugin.settings.DefaultTiers.forEach((tierEl) =>
			this.tierList.tiers.push(new tier(tierEl))
		);

		new Setting(contentEl)
			.setName("Name")
			.addText((text) =>
				text
					.setValue(this.tierList.name)
					.onChange((val) => (this.tierList.name = val))
			);

		new Setting(contentEl).addButton((button) =>
			button.setButtonText("confirm").onClick(() => this.confirm())
		);
	}

	onClose(): void {
		this.contentEl.innerHTML = "";
	}

	confirm() {
		const { settings } = this.plugin;
		const { vault } = this.plugin.app;

		vault.create(
			`${settings.RootPath}/${this.tierList.name}.${TIER_LIST_FOR_OBSIDIAN_VIEW_TYP}`,
			JSON.stringify(this.tierList.save())
		);

		this.close();
	}
}
