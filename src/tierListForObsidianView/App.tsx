import * as React from "react";
import { useRef, useState } from "react";
import tierListForObsidian from "../main";
import NavBar from "./NavBar";
import Stack from "./stack";
import tierListClass, { dnd as dndClass } from "utils/tierList";
import TierList from "./TierList";
import useRender from "utils/renderHook";

function App(props: { plugin: tierListForObsidian }) {
	const tierList = useRef(new tierListClass());
	const render = useRender();
	const [renameT, setRenameT] = useState(false);
	const [rename, setRename] = useState(() => tierList.current.name);
	const dnd = useRef(new dndClass(tierList.current));

	function setTitle(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter") {
			tierList.current.name = rename;
			setRenameT(false);
		}
	}

	return (
		<div className="TierListForObsidianApp">
			<NavBar tierList={tierList} render={render} />
			{renameT ? (
				<input
					type="text"
					value={rename}
					onChange={(c) => setRename(c.target.value)}
					onKeyDown={(e) => setTitle(e)}
				/>
			) : (
				<h2
					className="TierListForObsidianTitle"
					onClick={() => {
						setRenameT(true);
					}}
				>
					{tierList.current.name}
				</h2>
			)}
			<TierList
				tierList={tierList}
				render={render}
				plugin={props.plugin}
				dnd={dnd}
			/>
			<Stack
				tierList={tierList}
				render={render}
				plugin={props.plugin}
				dnd={dnd}
			/>
		</div>
	);
}

export default App;
