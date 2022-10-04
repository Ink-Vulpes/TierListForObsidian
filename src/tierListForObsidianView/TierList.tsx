import tierListForObsidian from "main";
import * as React from "react";
import { render } from "utils/renderHook";
import tierListClass from "tierList";
import Tier from "./Tier";

export default function TierList(props: {
	tierList: React.MutableRefObject<tierListClass>;
	render: render;
	plugin: tierListForObsidian;
}) {
	const List: Array<JSX.Element> = [];

	props.tierList.current.tiers.forEach((v) => {
		List.push(
			<Tier
				tier={v}
				render={props.render}
				tierList={props.tierList}
				plugin={props.plugin}
				key={v.id}
			/>
		);
	});

	return <ul className="TierListForObsidianList">{List}</ul>;
}
