import tierList from "./.";
import { dummySave as childDummySave } from "./__mocks__/child";

jest.mock("./child");
jest.mock("./tier");

var tl: tierList;
beforeEach(() => {
	jest.clearAllMocks();
	tl = new tierList();
});

it("test newChild()", () => {
	tl.newChild("", "");
	expect(tl.stack[0]).toMatchObject(childDummySave);
});

it.todo("test newTier()");
it.todo("test removeChild()");
it.todo("test addChildTo()");
it.todo("test removeTier()");
it.todo("test moveChild()");
it.todo("test save()");
it.todo("test load()");
