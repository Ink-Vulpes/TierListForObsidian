import * as React from "react";
import { useRef, useState } from "react";
import tierListForObsidian from "../main";
import NavBar from "./NavBar";
import Stack from "./stack";
import tierListClass from "tierList";
import TierList from "./TierList";
import useRender from "../utils/renderHook";

export default function App(props: {
	plugin: tierListForObsidian;
	tList: tierListClass;
	saveFn: Function;
}) {
	const tierList = useRef(props.tList);
	const render = useRender();
	const [renameT, setRenameT] = useState(false);
	const [rename, setRename] = useState(() => tierList.current.name);

	function setTitle(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter") {
			tierList.current.name = rename;
			setRenameT(false);
		}
	}

	return (
		<div
			className="TierListForObsidianApp"
			data-testid="TierListForObsidianApp"
		>
			<NavBar tierList={tierList} render={render} saveFn={props.saveFn} />
			<input
				type="text"
				data-testid="TierListForObsidiaInput"
				value={rename}
				onChange={(c) => setRename(c.target.value)}
				onKeyDown={(e) => setTitle(e)}
				hidden={!renameT}
			/>
			<h2
				className="TierListForObsidianTitle"
				data-testid="TierListForObsidianTitle"
				onClick={() => {
					setRenameT(true);
				}}
				hidden={renameT}
			>
				{tierList.current.name}
			</h2>
			<TierList
				tierList={tierList}
				render={render}
				plugin={props.plugin}
			/>
			<Stack tierList={tierList} render={render} plugin={props.plugin} />
		</div>
	);
}
