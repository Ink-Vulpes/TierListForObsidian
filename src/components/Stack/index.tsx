import tierListForObsidian from "../../main";
import * as React from "react";
import tierListClass from "../../tierList";
import Child from "../Child";
import { Trash } from "../../utils/SVG";

export default function Stack(props: {
	tierList: React.MutableRefObject<tierListClass>;
	render: React.Dispatch<React.SetStateAction<number>>;
	plugin: tierListForObsidian;
}) {
	const children: Array<JSX.Element> = [];
	props.tierList.current.stack.forEach((v) =>
		children.push(
			<Child
				key={v.id}
				render={props.render}
				child={v}
				plugin={props.plugin}
				tier={undefined}
				tierList={props.tierList}
			/>
		)
	);

	function onDragged() {
		if (props.tierList.current.draggedOverTierID === "0") return;
		props.tierList.current.draggedOverTierID = "0";
	}

	function delDragged() {
		if (props.tierList.current.draggedOverTierID === "del") return;
		props.tierList.current.draggedOverTierID = "del";
	}

	return (
		<div className="TierListForObsidianStack">
			<ul onDragEnter={() => onDragged()}>{children}</ul>
			<div
				className="TierListForObsidianStackDel"
				onDragEnter={() => delDragged()}
			>
				<Trash />
			</div>
		</div>
	);
}
