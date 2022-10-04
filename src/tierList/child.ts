import makeid from "../utils/makeId";
import { childSaveFormat } from "./index";

export default class child {
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

	load(save: childSaveFormat) {
		this.id = save.id;
		this.color = save.color;
		this.img = save.img;
		this.name = save.name;
	}

	save(): childSaveFormat {
		return {
			id: this.id,
			color: this.color,
			img: this.img,
			name: this.name,
		};
	}
}
