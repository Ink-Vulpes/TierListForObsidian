export class TextFileView {
	containerEl = { children: ["", true] };
	root = { unmount: () => {}, render: () => {} };
}
export class WorkspaceLeaf {}
export class Plugin {
	registerView() {}
	registerExtensions() {}
}
