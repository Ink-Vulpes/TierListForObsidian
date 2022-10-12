import * as _main from "../main";
import { _prototypePlugin as _prototypeObsidianPlugin } from "./obsidian";
import { dummySettings } from "./settings";

export const _prototype = {
	..._prototypeObsidianPlugin,
	settings: { ...dummySettings },
};

const mock = jest.fn().mockImplementation(() => _prototype);
export default mock;
