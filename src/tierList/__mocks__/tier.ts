import { tierSaveFormat } from "tierList";
import tier from "./tier";
import { dummySave as childSaveDummy } from "./child";
export const dummySave: tierSaveFormat = {
	id: "tierDummyId",
	name: "tierDummyName",
	color: "tierDummyColor",
	children: [{ ...childSaveDummy }],
};

export const _removeChild = jest.fn();
export const _addChild = jest.fn();
export const _getChildIndex = jest.fn(() => 1);
export const _save = jest.fn(() => ({ ...dummySave }));
export const _load = jest.fn(() => new tier());

const mock = jest.fn().mockImplementation(() => ({
	id: dummySave.id,
	name: dummySave.name,
	color: dummySave.color,
	children: [],
	removeChild: _removeChild,
	addChild: _addChild,
	getChildIndex: _getChildIndex,
	save: _save,
	load: _load,
}));

export default mock;
