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
				data-testid="TierListForObsidiaStackChild"
			/>
		)
	);

	function onDraged() {
		if (props.tierList.current.dragedOverTierID === "0") return;
		props.tierList.current.dragedOverTierID = "0";
	}

	function delDraged() {
		if (props.tierList.current.dragedOverTierID === "del") return;
		props.tierList.current.dragedOverTierID = "del";
	}

	return (
		<div className="TierListForObsidianStack">
			<ul onDragEnter={() => onDraged()}>{children}</ul>
			<div
				className="TierListForObsidianStackDel"
				data-testid="TierListForObsidianStackDel"
				onDragEnter={() => delDraged()}
			>
				<Trash />
			</div>
		</div>
	);
}