const _Plugin = jest.fn().mockImplementation(() => ({}));

const mock = jest.fn().mockImplementation(() => ({
	_esModule: true,
	Plugin: _Plugin,
}));
export default mock;
