import * as React from "react";
import tier from "../../tierList/tier";
export default function mock(props: { tier: tier }) {
	return (
		<div data-testid="TierListForObsidiaTier">
			{JSON.stringify(props.tier.save())}
		</div>
	);
}
