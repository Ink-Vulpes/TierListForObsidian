import { tierListSaveFormat } from "tierList";
import { dummySave as childSaveDummy } from "./child";
import { dummySave as tierSaveDummy } from "./tier";
export const saveDummy: tierListSaveFormat = {
	name: "tierListDummyName",
	stack: [{ ...childSaveDummy }],
	tiers: [{ ...tierSaveDummy }],
};

export const _newChild = jest.fn();
export const _newTier = jest.fn();
export const _removeChild = jest.fn();
export const _addChildTo = jest.fn();
export const _removeTier = jest.fn();
export const _moveChild = jest.fn();
export const _save = jest.fn();
export const _load = jest.fn();
export const _drop = jest.fn();

const mock = jest.fn().mockImplementation(() => ({
	name: "",
	tiers: new Array(),
	stack: new Array(),

	draggedChildID: "",
	draggedChildTierID: "",
	draggedOverChildID: "",
	draggedOverTierID: "",

	edit: true,

	newChild: _newChild,
	newTier: _newTier,
	removeChild: _removeChild,
	addChildTo: _addChildTo,
	removeTier: _removeTier,
	moveChild: _moveChild,
	save: _save,
	load: _load,
	drop: _drop,
}));

export default mock;
