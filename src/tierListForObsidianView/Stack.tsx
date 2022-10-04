import tierListForObsidian from "main";
import * as React from "react";
import { child, tier } from "utils/tierList";
import tierListClass, { dnd as dndClass } from "utils/tierList";

export default function Stack(props: {
	tierList: React.MutableRefObject<tierListClass>;
	render: React.Dispatch<React.SetStateAction<number>>;
	plugin: tierListForObsidian;
	dnd: React.MutableRefObject<dndClass>;
}) {
	const children: Array<JSX.Element> = [];
	props.tierList.current.stack.forEach((v) =>
		children.push(
			<Child
				key={v.id}
				render={props.render}
				child={v}
				plugin={props.plugin}
				dnd={props.dnd}
				tier={undefined}
			/>
		)
	);

	function onDraged() {
		if (props.dnd.current.dragedOverTierID === "0") return;
		props.dnd.current.dragedOverTierID = "0";
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
	plugin: tierListForObsidian;
	dnd: React.MutableRefObject<dndClass>;
}) {
	function startDnd() {
		props.dnd.current.dragedChildID = props.child.id;
		props.dnd.current.dragedChildTierID =
			props.tier === undefined ? "0" : props.tier.id;
	}

	function stopDnd() {
		props.dnd.current.drop(props.render);
		props.dnd.current.dragedChildID = "";
		props.dnd.current.dragedChildTierID = "";
	}

	function onDraged() {
		if (
			props.dnd.current.dragedOverChildID === props.child.id ||
			props.dnd.current.dragedChildID === props.child.id
		)
			return;
		props.dnd.current.dragedOverChildID = props.child.id;
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
