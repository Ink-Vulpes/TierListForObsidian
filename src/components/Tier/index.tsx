import tierListForObsidian from "../../main";
import * as React from "react";
import { useState } from "react";
import { render } from "../../utils/renderHook";
import { Close } from "../../utils/SVG";
import tierListClass from "../../tierList";
import tier from "tierList/tier";
import Child from "../Child";

export default function Tier(props: {
	tier: tier;
	tierList: React.MutableRefObject<tierListClass>;
	render: render;
	plugin: tierListForObsidian;
}) {
	const [settings, setSettings] = useState(() => false);
	const [color, setColor] = useState(() => props.tier.color);
	const [name, setName] = useState(() => props.tier.name);
	const children: Array<JSX.Element> = [];

	function save() {
		props.tier.name = name;
		props.tier.color = color;
		setSettings(false);
	}

	function removeTier() {
		props.tierList.current.removeTier(props.tier.id);
		props.render();
	}

	function onDragged(e: React.DragEvent<HTMLLIElement>) {
		if (props.tierList.current.draggedOverTierID === props.tier.id) return;
		props.tierList.current.draggedOverTierID = props.tier.id;
	}

	props.tier.children.forEach((v) =>
		children.push(
			<Child
				key={v.id}
				render={props.render}
				child={v}
				plugin={props.plugin}
				tier={props.tier}
				tierList={props.tierList}
			/>
		)
	);

	return (
		<li
			onDragEnter={(e) => onDragged(e)}
			className="TierListForObsidianTier"
		>
			<div
				className="TierListForObsidianTierText"
				style={{ backgroundColor: props.tier.color }}
				onClick={() =>
					props.tierList.current.edit &&
					!settings &&
					setSettings(true)
				}
			>
				<div className="TierListForObsidianTierEdit">
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") save();
						}}
						hidden={!settings}
					/>
					<input
						type="color"
						value={color}
						style={{ backgroundColor: color }}
						onChange={(e) => setColor(e.target.value)}
						hidden={!settings}
					/>
					<button onClick={save} hidden={!settings}>
						Save
					</button>
				</div>
				<p hidden={settings}>{props.tier.name}</p>
			</div>
			<ul className="TierListForObsidianTierChildren">{children}</ul>
			<button
				className="TierListForObsidianButtonSmall"
				onClick={removeTier}
				hidden={!props.tierList.current.edit}
			>
				<Close />
			</button>
		</li>
	);
}
