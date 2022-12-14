import tierListForObsidian, { TIER_LIST_FOR_OBSIDIAN_VIEW_TYP } from "../main";
import { TextFileView, TFile, WorkspaceLeaf } from "obsidian";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { createRoot, Root } from "react-dom/client";
import App from "./App";
import tierListClass, { tierListSaveFormat } from "../tierList";

export default class tierListForObsidianView extends TextFileView {
	plugin: tierListForObsidian;
	tierList: tierListClass;
	root: Root;

	constructor(leaf: WorkspaceLeaf, plugin: tierListForObsidian) {
		super(leaf);
		this.plugin = plugin;
		this.tierList = new tierListClass();
	}

	clear(): void {
		this.tierList.clear();
	}

	async onOpen() {
		this.root = createRoot(this.containerEl.children[1]);
	}

	async onClose() {
		this.save();
		this.root.unmount();
		ReactDOM.unmountComponentAtNode(this.containerEl.children[1]);
	}

	getViewData(): string {
		const save = this.tierList.save();
		return JSON.stringify(save);
	}

	getViewType(): string {
		return TIER_LIST_FOR_OBSIDIAN_VIEW_TYP;
	}

	setViewData(data: string, clear = true): void {
		this.tierList.load(JSON.parse(data));
		this.root.render(
			<React.StrictMode>
				<App
					plugin={this.plugin}
					tList={this.tierList}
					saveFn={this.requestSave}
				/>
			</React.StrictMode>
		);
	}
}
