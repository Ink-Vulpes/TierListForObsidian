export const _prototypePlugin = {
	app: {
		vault: {
			adapter: {
				getResourcePath: () => {},
			},
		},
	},
};

export const _prototypePluginSettingsTab = {};

export const _Plugin = jest.fn().mockImplementation(() => _prototypePlugin);
export const _PluginSettingTab = jest
	.fn()
	.mockImplementation(() => _prototypePlugin);

const mock = jest.fn().mockImplementation(() => ({
	Plugin: _Plugin,
	PluginSettingTab: _PluginSettingTab,
}));
export default mock;
