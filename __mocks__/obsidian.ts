export class TextFileView {
	containerEl = { children: ["", true] };
	root = { unmount: () => {}, render: () => {} };
	save() {}
}
export class WorkspaceLeaf {}
export class Plugin {
	registerView() {}
	registerExtensions() {}
}
