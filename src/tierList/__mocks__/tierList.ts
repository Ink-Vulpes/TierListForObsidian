import { tierListSaveFormat, tierSaveFormat } from "tierList";
import { dummySave as childSaveDummy } from "./child";
import { dummySave as tierSaveDummy } from "./tier";
export const saveDummy: tierListSaveFormat = {
	name: "tierListDummyName",
	stack: [{ ...childSaveDummy }],
	tiers: [{ ...tierSaveDummy }],
};
