import child from "./child";
import makeId from "../utils/makeId";
import { childSaveFormat, tierSaveFormat } from ".";

export default class tier {
	id: string;
	name: string;
	color: string;
	children: Array<child>;

	constructor() {
		this.id = makeId(25);
		this.name = "new tier";
		this.color = "#b8cf55";
		this.children = new Array();
	}

	removeChild(childId: string): child | undefined {
		for (let c = 0; c < this.children.length; c++) {
			const child = this.children[c];
			if (child.id === childId) {
				this.children.splice(c, 1);
				return child;
			}
		}
	}

	addChild(child: child, index?: number | undefined) {
		if (index === undefined) this.children.push(child);
		else this.children.splice(index + 1, 0, child);
	}

	getChildIndex(childId: string): number | undefined {
		for (let i = 0; i < this.children.length; i++) {
			const element = this.children[i];
			if (element.id === childId) return i;
		}
	}

	save(): tierSaveFormat {
		const children: Array<childSaveFormat> = new Array();
		this.children.forEach((v) => {
			children.push(v.save());
		});

		return {
			id: this.id,
			color: this.color,
			name: this.name,
			children: children,
		};
	}

	load(save: tierSaveFormat) {
		this.id = save.id;
		this.name = save.name;
		this.color = save.color;
		this.children = new Array();
		save.children.forEach((element) => {
			const c = new child("", "");
			c.load(element);
			this.children.push(c);
		});
	}
}
