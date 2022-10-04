import tierListForObsidian from "main";
import * as React from "react";
import { child, tier } from "utils/tierList";
import tierListClass from "utils/tierList";

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

	function onDraged() {
		if (props.tierList.current.dragedOverTierID === "0") return;
		props.tierList.current.dragedOverTierID = "0";
	}

	return (
		<ul className="TierListForObsidianStack" onDragEnter={() => onDraged()}>
			{children}
		</ul>
	);
}

export function Child(props: {
	child: child;
	tier: tier | undefined;
	render: React.Dispatch<React.SetStateAction<number>>;
	tierList: React.MutableRefObject<tierListClass>;
	plugin: tierListForObsidian;
}) {
	function startDnd() {
		props.tierList.current.dragedChildID = props.child.id;
		props.tierList.current.dragedChildTierID =
			props.tier === undefined ? "0" : props.tier.id;
	}

	function stopDnd() {
		props.tierList.current.drop(props.render);
		props.tierList.current.dragedChildID = "";
		props.tierList.current.dragedChildTierID = "";
	}

	function onDraged() {
		if (
			props.tierList.current.dragedOverChildID === props.child.id ||
			props.tierList.current.dragedChildID === props.child.id
		)
			return;
		props.tierList.current.dragedOverChildID = props.child.id;
	}

	return (
		<li
			className="TierListForObsidianChild"
			onDragStart={() => startDnd()}
			onDragEnd={() => stopDnd()}
			onDragEnter={() => onDraged()}
			draggable
		>
			<img
				src={props.plugin.app.vault.adapter.getResourcePath(
					props.child.img
				)}
			/>
		</li>
	);
}
