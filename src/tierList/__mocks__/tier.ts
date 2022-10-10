import { tierSaveFormat } from "../.";
import { dummySave as childDummySave } from "./child";
import child from "./child";

export const dummySave: tierSaveFormat = {
	id: "tierDummyId",
	name: "tierDummyName",
	color: "tierDummyColor",
	children: [{ ...childDummySave }],
};

export default class mock {
	removeChild(childId: string): child | undefined {
		return;
	}
	addChild(child: child, index: number | undefined) {}
	getChildIndex(childId: string): number | undefined {
		return;
	}
	save(): tierSaveFormat {
		return { ...dummySave };
	}
	load(save: tierSaveFormat) {}
}

mock.prototype.removeChild = jest.fn((childId: string) => {
	if (childId !== childDummySave.id) return;
	return { ...childDummySave };
}) as any;
mock.prototype.addChild = jest.fn();
mock.prototype.getChildIndex = jest.fn(
	(childId: string): number | undefined => {
		if (childId !== childDummySave.id) return;
		return 1;
	}
);
mock.prototype.save = jest.fn(() => ({ ...dummySave }));
mock.prototype.load = jest.fn();
