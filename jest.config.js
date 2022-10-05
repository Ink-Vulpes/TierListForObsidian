/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	collectCoverageFrom: ["src/**/*.ts", "src/**/*.tsx"],
};
