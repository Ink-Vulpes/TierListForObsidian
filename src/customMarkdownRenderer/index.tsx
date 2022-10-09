import { MarkdownRenderChild, TFile } from "obsidian";
import tierListForObsidian, { TIER_LIST_FOR_OBSIDIAN_VIEW_TYP } from "../main";
import * as React from "react";
import tierList from "../tierList";
import { createRoot, Root as reactRoot } from "react-dom/client";
import App from "./App";

type config = {
	file: TFile;
	type: showType;
};
type showType = "visual" | "table";

type Root = reactRoot & {
	_internalRoot: any;
};

export default class MarkdownRenderer extends MarkdownRenderChild {
	plugin: tierListForObsidian;
	tl: tierList;
	config: config;
	root: Root;
	constructor(
		containerEl: HTMLElement,
		source: string,
		plugin: tierListForObsidian
	) {
		super(containerEl);
		this.plugin = plugin;
		this.tl = new tierList();
		const rows = source.split("\n").filter((row) => row.length > 0);
		var file: undefined | TFile;
		var type: showType = "visual";
		rows.forEach((row) => {
			const cols = row.split(":");
			switch (cols[0]) {
				case "file":
					file = plugin.app.vault
						.getFiles()
						.find(
							(f) =>
								f.name ===
								cols[1] + "." + TIER_LIST_FOR_OBSIDIAN_VIEW_TYP
						);
					break;
				case "type":
					type = cols[1] as showType;
			}
		});
		if (file === undefined) return;
		this.config = {
			file: file,
			type: type,
		};
	}

	async onload() {
		this.tl.load(
			JSON.parse(await this.plugin.app.vault.read(this.config.file))
		);
		this.tl.edit = false;
		switch (this.config.type) {
			case "visual":
				this.loadAsVisual();
				break;
			case "table":
				this.loadAsText();
				break;
		}
	}

	onunload(): void {
		switch (this.config.type) {
			case "visual":
				if (this.root._internalRoot === null) return;
				this.root.unmount();
				break;
			case "table":
				this.containerEl.innerHTML = "";
		}
	}

	loadAsVisual() {
		this.containerEl.createDiv();
		this.root = createRoot(this.containerEl.children[0]) as Root;
		this.root.render(
			<React.StrictMode>
				<App plugin={this.plugin} tierList={this.tl} />
			</React.StrictMode>
		);
	}

	loadAsText() {
		const table = this.containerEl.createEl("table");
		var el = table.createEl("tr");
		el.createEl("th", { text: "Tier" });
		el.createEl("th", { text: "Name" });
		el.createEl("th", { text: "Image" });

		this.tl.tiers.forEach((tier) => {
			tier.children.forEach((child) => {
				el = table.createEl("tr");
				el.createEl("td", { text: tier.name });
				el.createEl("td", { text: child.name });
				el.createEl("td").createEl("img", {
					attr: {
						src: this.plugin.app.vault.adapter.getResourcePath(
							`${this.plugin.settings.ImgPath}/${child.img}`
						),
						class: "customMarkdownRendererTextTypeImg",
					},
				});
			});
		});
	}
}
