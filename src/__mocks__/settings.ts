import { TierListForObsidianSettings } from "../settings";

export const dummySettings: TierListForObsidianSettings = {
	ImgPath: "dummy.jpg",
	RootPath: "dummyPath",
};
export const _prototype = {};

const muck = jest.fn().mockImplementation(() => _prototype);
export default muck;
