import child from "../../tierList/child";
import * as React from "react";

export default function (props: { child: child }) {
	return (
		<div data-testid="TierListForObsidianChild">
			{JSON.stringify(props.child.save())}
		</div>
	);
}
