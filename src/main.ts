import { Plugin, WorkspaceLeaf } from "obsidian";
import tierListForObsidianView from "./tierListForObsidianView";
import { EnhancedStore } from "@reduxjs/toolkit";

export const TIER_LIST_FOR_OBSIDIAN_VIEW_TYP = "tierlist";
export default class tierListForObsidian extends Plugin {
	store: EnhancedStore;
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
