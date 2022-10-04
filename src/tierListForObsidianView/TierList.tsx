import tierListForObsidian from "main";
import * as React from "react";
import { useState } from "react";
import { render } from "utils/renderHook";
import { Close } from "utils/SVG";
import tierListClass, { tier, dnd as dndClass } from "utils/tierList";

import { Child } from "./Stack";

export default function TierList(props: {
	tierList: React.MutableRefObject<tierListClass>;
	render: render;
	plugin: tierListForObsidian;
	dnd: React.MutableRefObject<dndClass>;
}) {
	const List: Array<JSX.Element> = [];

	props.tierList.current.tiers.forEach((v) => {
		List.push(
			<Tier
				tier={v}
				render={props.render}
				tierList={props.tierList}
				plugin={props.plugin}
				dnd={props.dnd}
				key={v.id}
			/>
		);
	});

	return <ul className="TierListForObsidianList">{List}</ul>;
}

function Tier(props: {
	tier: tier;
	tierList: React.MutableRefObject<tierListClass>;
	render: render;
	plugin: tierListForObsidian;
	dnd: React.MutableRefObject<dndClass>;
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
		if (props.dnd.current.dragedOverTierID === props.tier.id) return;
		props.dnd.current.dragedOverTierID = props.tier.id;
	}

	props.tier.children.forEach((v) =>
		children.push(
			<Child
				key={v.id}
				render={props.render}
				child={v}
				plugin={props.plugin}
				dnd={props.dnd}
				tier={props.tier}
			/>
		)
	);

	return (
		<li onDragEnter={() => onDraged()}>
			{settings ? (
				<div>
					<input
						type="text"
						value={name}
						onChange={(e) => changeEventHandler(e, false)}
						onKeyDown={(e) => enterEventHandler(e)}
					/>
					<input
						type="text"
						value={color}
						style={{ backgroundColor: color }}
						onChange={(e) => changeEventHandler(e, true)}
						onKeyDown={(e) => enterEventHandler(e)}
					/>
				</div>
			) : (
				<h3
					style={{ backgroundColor: props.tier.color }}
					onClick={() => setSettings(true)}
				>
					{props.tier.name}
				</h3>
			)}
			<ul>{children}</ul>
			<button
				className="TierListForObsidianButtonSmall"
				onClick={removeTier}
			>
				<Close />
			</button>
		</li>
	);
}
