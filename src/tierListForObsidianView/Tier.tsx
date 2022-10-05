import tierListForObsidian from "../main";
import * as React from "react";
import { useState } from "react";
import { render } from "../utils/renderHook";
import { Close } from "../utils/SVG";
import tierListClass from "../tierList";
import tier from "tierList/tier";
import Child from "./Child";

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

	function changeEventHandler(
		e: React.ChangeEvent<HTMLInputElement>,
		changeColor: boolean
	) {
		if (changeColor) setColor(e.target.value);
		else setName(e.target.value);
	}

	function enterEventHandler(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter") {
			props.tier.name = name;
			props.tier.color = color;
			setSettings(false);
		}
	}

	function removeTier() {
		props.tierList.current.removeTier(props.tier.id);
		props.render();
	}

	function onDraged() {
		if (props.tierList.current.dragedOverTierID === props.tier.id) return;
		props.tierList.current.dragedOverTierID = props.tier.id;
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
		<li onDragEnter={() => onDraged()} data-testid="TierListForObsidiaTier">
			<div>
				<input
					type="text"
					data-testid="TierListForObsidiaTierInputImg"
					value={name}
					onChange={(e) => changeEventHandler(e, false)}
					onKeyDown={(e) => enterEventHandler(e)}
					hidden={!settings}
				/>
				<input
					type="text"
					data-testid="TierListForObsidiaTierInputText"
					value={color}
					style={{ backgroundColor: color }}
					onChange={(e) => changeEventHandler(e, true)}
					onKeyDown={(e) => enterEventHandler(e)}
					hidden={!settings}
				/>
			</div>
			<h3
				data-testid="TierListForObsidiaTierText"
				style={{ backgroundColor: props.tier.color }}
				onClick={() => setSettings(true)}
				hidden={settings}
			>
				{props.tier.name}
			</h3>
			<ul>{children}</ul>
			<button
				className="TierListForObsidianButtonSmall"
				data-testid="TierListForObsidiaTierButtonRemove"
				onClick={removeTier}
			>
				<Close />
			</button>
		</li>
	);
}
