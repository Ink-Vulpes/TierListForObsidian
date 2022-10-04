import tierListForObsidian, { TIER_LIST_FOR_OBSIDIAN_VIEW_TYP } from "main";
import { TextFileView, WorkspaceLeaf } from "obsidian";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { createRoot, Root } from "react-dom/client";
import App from "./App";
import tierListClass from "../tierList";

export default class tierListForObsidianView extends TextFileView {
	plugin: tierListForObsidian;
	tierList: tierListClass;
	root: Root;

	constructor(leaf: WorkspaceLeaf, plugin: tierListForObsidian) {
		super(leaf);
		this.plugin = plugin;
	}

	clear(): void {}

	async onOpen() {
		this.root = createRoot(this.containerEl.children[1]);
		this.tierList = new tierListClass();
	}

	async onClose() {
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

	setViewData(data: string, clear = false): void {
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
