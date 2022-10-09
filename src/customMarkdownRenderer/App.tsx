import tierListForObsidian from "main";
import * as React from "react";
import TierList from "../components/TierList";
import useRender from "../utils/renderHook";
import tierList from "tierList";
import { useRef } from "react";

export default function App(props: {
	plugin: tierListForObsidian;
	tierList: tierList;
}) {
	const renderer = useRender();
	const tl = useRef(props.tierList);

	return (
		<>
			<TierList plugin={props.plugin} render={renderer} tierList={tl} />
		</>
	);
}
