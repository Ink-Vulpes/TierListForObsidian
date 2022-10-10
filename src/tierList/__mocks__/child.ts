import { childSaveFormat } from "../.";

export const dummySave: childSaveFormat = {
	id: "dummyChildId",
	color: "dummyChildColor",
	img: "dummyChildImg",
	name: "dummyChildName",
};

export default class mock {
	id: string = dummySave.id;
	name: string = dummySave.name;
	color: string = dummySave.color;
	img: string = dummySave.img;
	load() {}
	save() {}
}

mock.prototype.load = jest.fn(() => ({ ...dummySave }));
mock.prototype.save = jest.fn();
