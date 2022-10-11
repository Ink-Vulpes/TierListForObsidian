import tierListForObsidian from "../../main";
import * as React from "react";
import tier from "../../tierList/tier";
import child from "../../tierList/child";
import tierListClass from "../../tierList";

export default function Child(props: {
	child: child;
	tier: tier | undefined;
	render: React.Dispatch<React.SetStateAction<number>>;
	tierList: React.MutableRefObject<tierListClass>;
	plugin: tierListForObsidian;
}) {
	function startDnd() {
		props.tierList.current.draggedChildID = props.child.id;
		props.tierList.current.draggedChildTierID =
			props.tier === undefined ? "0" : props.tier.id;
	}

	function stopDnd() {
		props.tierList.current.drop(props.render);
		props.tierList.current.draggedChildID = "";
		props.tierList.current.draggedChildTierID = "";
	}

	function onDragged() {
		if (
			props.tierList.current.draggedOverChildID === props.child.id ||
			props.tierList.current.draggedChildID === props.child.id
		)
			return;
		props.tierList.current.draggedOverChildID = props.child.id;
	}

	return (
		<li
			className="TierListForObsidianChild"
			onDragStart={() => startDnd()}
			onDragEnd={() => stopDnd()}
			onDragEnter={() => onDragged()}
			title={props.child.name}
			draggable
		>
			<img
				src={props.plugin.app.vault.adapter.getResourcePath(
					`${props.plugin.settings.ImgPath}/${props.child.img}`
				)}
			/>
		</li>
	);
}
