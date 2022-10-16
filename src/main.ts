import { App, Plugin, PluginManifest, WorkspaceLeaf } from "obsidian";
import tierListForObsidianView from "./View";
import {
	TierListForObsidianSettings,
	TIER_LIST_FOR_OBSIDIAN_DEFAULT_SETTINGS,
	TierListForObsidianSettingsTab,
} from "./settings";
import customMarkdownRenderer from "./customMarkdownRenderer";
import newTierListModal from "newTierListModal";

export const TIER_LIST_FOR_OBSIDIAN_VIEW_TYP = "tierlist";
export default class tierListForObsidian extends Plugin {
	settings: TierListForObsidianSettings;
	newTierListModal: newTierListModal;

	constructor(app: App, manifest: PluginManifest) {
		super(app, manifest);
		this.newTierListModal = new newTierListModal(this);
	}

	async onload(): Promise<void> {
		await this.loadSettings();
		this.addSettingTab(new TierListForObsidianSettingsTab(this.app, this));
		this.registerView(
			TIER_LIST_FOR_OBSIDIAN_VIEW_TYP,
			(leaf: WorkspaceLeaf) => new tierListForObsidianView(leaf, this)
		);
		this.registerExtensions(
			[TIER_LIST_FOR_OBSIDIAN_VIEW_TYP],
			TIER_LIST_FOR_OBSIDIAN_VIEW_TYP
		);
		this.registerMarkdownCodeBlockProcessor(
			TIER_LIST_FOR_OBSIDIAN_VIEW_TYP,
			(source, el, ctx) => {
				ctx.addChild(new customMarkdownRenderer(el, source, this));
			}
		);
		this.addCommand({
			id: "tierListForObsidianNewList",
			name: "new Tier List",
			callback: () => this.newTierListModal.open(),
		});
	}

	async loadSettings(): Promise<void> {
		this.settings = Object.assign(
			{},
			TIER_LIST_FOR_OBSIDIAN_DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	unload(): void {}

	onunload(): void {}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
