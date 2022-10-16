import child from "./child";
import tier from "./tier";

export type childSaveFormat = {
	id: string;
	name: string;
	color: string;
	img: string;
};

export type tierSaveFormat = {
	id: string;
	name: string;
	color: string;
	children: Array<childSaveFormat>;
};

export type tierListSaveFormat = {
	name: string;
	tiers: Array<tierSaveFormat>;
	stack: Array<childSaveFormat>;
};

export default class tierList {
	name: string;
	tiers: Array<tier>;
	stack: Array<child>;

	draggedChildID: string;
	draggedChildTierID: string;
	draggedOverChildID: string;
	draggedOverTierID: string;

	edit: boolean = true;

	constructor() {
		this.name = "new Tierlist";
		this.tiers = new Array();
		this.stack = new Array();
		this.draggedChildID = "";
		this.draggedChildTierID = "";
		this.draggedOverChildID = "";
		this.draggedOverTierID = "";
	}

	newChild(name: string, img: string) {
		this.stack.push(new child(name, img));
	}

	newTier() {
		this.tiers.push(new tier());
	}

	removeChild(childId: string, tierId: string): child | undefined {
		if (tierId === "0") {
			for (let c = 0; c < this.stack.length; c++) {
				const child = this.stack[c];
				if (childId === child.id) {
					this.stack.splice(c, 1);
					return child;
				}
			}
		}
		for (let i = 0; i < this.tiers.length; i++) {
			const tier = this.tiers[i];
			if (tier.id === tierId) {
				return tier.removeChild(childId);
			}
		}
	}

	addChildTo(child: child, toTierId: string, toChildId: string) {
		if (toTierId === "0") {
			this.stack.unshift(child);
			return;
		} else {
			this.tiers.forEach((tier) => {
				if (tier.id === toTierId) {
					const toChildIndex = tier.getChildIndex(toChildId);
					tier.addChild(child, toChildIndex);
				}
			});
		}
	}

	removeTier(tierID: string) {
		for (let t = 0; t < this.tiers.length; t++) {
			const tier = this.tiers[t];
			if (tier.id === tierID) {
				this.tiers.splice(t, 1);
				break;
			}
		}
	}

	moveChild(
		childId: string,
		childTierId: string,
		moveToChildId: string,
		moveToTierId: string
	) {
		const child = this.removeChild(childId, childTierId);
		if (child === undefined || moveToChildId === "del") return;
		this.addChildTo(child, moveToTierId, moveToChildId);
	}

	save(): tierListSaveFormat {
		const stack: Array<childSaveFormat> = new Array();
		this.stack.forEach((element) => {
			stack.push(element.save());
		});
		const tiers: Array<tierSaveFormat> = new Array();
		this.tiers.forEach((element) => {
			tiers.push(element.save());
		});
		return {
			name: this.name,
			stack: stack,
			tiers: tiers,
		};
	}

	load(save: tierListSaveFormat) {
		if (save.name === undefined) return;
		this.name = save.name;
		this.stack = new Array();
		save.stack.forEach((element) => {
			const c = new child("", "");
			c.load(element);
			this.stack.push(c);
		});
		this.tiers = new Array();
		save.tiers.forEach((element) => {
			const t = new tier();
			t.load(element);
			this.tiers.push(t);
		});
	}

	drop(callback: Function) {
		if (!this.edit) return;
		this.moveChild(
			this.draggedChildID,
			this.draggedChildTierID,
			this.draggedOverChildID,
			this.draggedOverTierID
		);
		callback();
	}

	clear() {
		this.name = "new Tierlist";
		this.tiers = new Array();
		this.stack = new Array();
		this.draggedChildID = "";
		this.draggedChildTierID = "";
		this.draggedOverChildID = "";
		this.draggedOverTierID = "";
	}
}
