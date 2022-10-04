import makeid from "./makeId";

export class child {
	id: string;
	name: string;
	color: string;
	img: string;

	constructor(name: string, img: string) {
		this.id = makeid(25);
		this.color = "red";
		this.name = name;
		this.img = img;
	}
}

export class tier {
	id: string;
	name: string;
	color: string;
	children: Array<child>;

	constructor() {
		this.id = makeid(25);
		this.name = "new Tier";
		this.color = "red";
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

	addChild(child: child, index: number | undefined) {
		if (index === undefined) this.children.push(child);
		else this.children.splice(index + 1, 0, child);
	}

	getChildIndex(childId: string): number | undefined {
		for (let i = 0; i < this.children.length; i++) {
			const element = this.children[i];
			if (element.id === childId) return i;
		}
	}
}

export default class tierList {
	name: string;
	tiers: Array<tier>;
	stack: Array<child>;

	constructor() {
		this.name = "new Tierlist";
		this.tiers = new Array();
		this.stack = new Array();
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
			this.stack.push(child);
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
		console.log(child);
		if (child === undefined) return;
		this.addChildTo(child, moveToTierId, moveToChildId);
	}
}

export class dnd {
	dragedChildID: string;
	dragedChildTierID: string;
	dragedOverChildID: string;
	dragedOverTierID: string;
	tierList: tierList;

	constructor(tierList: tierList) {
		this.dragedChildID = "";
		this.dragedChildTierID = "";
		this.dragedOverChildID = "";
		this.dragedOverTierID = "";
		this.tierList = tierList;
	}

	drop(callback: Function) {
		this.tierList.moveChild(
			this.dragedChildID,
			this.dragedChildTierID,
			this.dragedOverChildID,
			this.dragedOverTierID
		);
		callback();
	}
}

export type tierListSaveFormat = {
	name: string;
	tiers: Array<{
		id: string;
		name: string;
		color: string;
		children: Array<{
			id: string;
			name: string;
			color: string;
			img: string;
		}>;
	}>;
	stack: Array<{
		id: string;
		name: string;
		color: string;
		img: string;
	}>;
};
