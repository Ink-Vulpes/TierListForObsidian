import { Plugin, WorkspaceLeaf } from "obsidian";
import tierListForObsidianView from "./tierListForObsidianView";

export const TIER_LIST_FOR_OBSIDIAN_VIEW_TYP = "tierlist";
export default class tierListForObsidian extends Plugin {
	onload(): void {
		this.registerView(
			TIER_LIST_FOR_OBSIDIAN_VIEW_TYP,
			(leaf: WorkspaceLeaf) => new tierListForObsidianView(leaf, this)
		);
		this.registerExtensions(["tierlist"], TIER_LIST_FOR_OBSIDIAN_VIEW_TYP);
	}

	unload(): void {}

	onunload(): void {}
}
