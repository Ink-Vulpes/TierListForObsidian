import tierListForObsidian from "main";
import { TextFileView, WorkspaceLeaf } from "obsidian";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import App from "./App";

export default class tierListForObsidianView extends TextFileView {
	plugin: tierListForObsidian;

	constructor(leaf: WorkspaceLeaf, plugin: tierListForObsidian) {
		super(leaf);
		this.plugin = plugin;
	}

	clear(): void {}

	async onOpen() {
		const root = createRoot(this.containerEl.children[1]);
		root.render(
			<React.StrictMode>
				<App plugin={this.plugin} />
			</React.StrictMode>
		);
	}

	async onClose() {
		ReactDOM.unmountComponentAtNode(this.containerEl.children[1]);
	}

	unload(): void {}
	getViewData(): string {
		return "";
	}
	getViewType(): string {
		return "";
	}
	setViewData(data: string, clear: boolean): void {}
}
