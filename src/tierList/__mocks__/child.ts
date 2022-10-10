import child from "./child";
import { childSaveFormat } from "../.";

export const dummySave: childSaveFormat = {
	id: "dummyChildId",
	color: "dummyChildColor",
	img: "dummyChildImg",
	name: "dummyChildName",
};

const _load = jest.fn(() => new child());
const _save = jest.fn(() => ({ ...dummySave }));

const mock = jest.fn().mockImplementation(() => ({
	...dummySave,
	load: _load,
	save: _save,
}));
export default mock;
