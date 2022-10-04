import { useState } from "react";

export type render = () => void;

export default function useRender(): render {
	const [_, s] = useState(0);
	return function render() {
		s(Math.floor(Math.random() * 100));
	};
}
