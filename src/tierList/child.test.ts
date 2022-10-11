import child from "./child";
import { dummySave } from "./__mocks__/child";

var c: child;
beforeEach(() => {
	jest.clearAllMocks();
	c = new child(dummySave.name, dummySave.img);
});

it("test constructor()", () => {
	expect(c).toMatchObject({
		name: dummySave.name,
		color: "red",
		img: dummySave.img,
	});
});

it("test load()", () => {
	c.load(dummySave);
	expect(c).toMatchObject(dummySave);
});

it("test save()", () => {
	const save = c.save();
	expect(typeof save).toMatch(typeof dummySave);
	expect(save).toMatchObject({
		name: dummySave.name,
		color: "red",
		img: dummySave.img,
	});
});
