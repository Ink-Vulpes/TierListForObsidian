import * as React from "react";
import tierListClass from "../../tierList";
import { Plus, SquarePlus, Close, Save } from "../../utils/SVG";
import { useRef, useState } from "react";
import { render } from "../../utils/renderHook";

export default function NavBar(props: {
	tierList: React.MutableRefObject<tierListClass>;
	render: render;
	saveFn: Function;
}) {
	const [addChildContext, setAddChildContext] = useState(() => false);
	const NewChildImg = useRef() as React.MutableRefObject<HTMLInputElement>;
	const NewChildName = useRef() as React.MutableRefObject<HTMLInputElement>;

	function AddTier() {
		props.tierList.current.newTier();
		setAddChildContext(false);
		props.render();
	}

	function AddChild() {
		props.tierList.current.newChild(
			NewChildName.current.value,
			NewChildImg.current.value
		);
		setAddChildContext(false);
		props.render();
	}

	function EnterEvent(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter") AddChild();
	}

	return (
		<div className="TierListForObsidianNavBar">
			<>
				<input
					type="text"
					placeholder="Name"
					ref={NewChildName}
					onKeyDown={(e) => EnterEvent(e)}
					style={{display: !addChildContext?'none':''}}
				/>
				<input
					type="text"
					placeholder="Image path"
					onKeyDown={(e) => EnterEvent(e)}
					ref={NewChildImg}
					style={{display: !addChildContext?'none':''}}
				/>
				<button
					className="TierListForObsidianButtonSmall"
					onClick={AddChild}
					style={{display: !addChildContext?'none':''}}
				>
					<Plus />
				</button>
				<button
					className="TierListForObsidianButtonSmall"
					onClick={() => setAddChildContext(false)}
					style={{display: !addChildContext?'none':''}}
				>
					<Close />
				</button>
			</>
			<>
				<button
					className="TierListForObsidianButtonSmall"
					onClick={() => setAddChildContext(true)}
					style={{display: addChildContext?'none':''}}
				>
					<Plus />
				</button>
				<button
					className="TierListForObsidianButtonSmall"
					onClick={AddTier}
					style={{display: addChildContext?'none':''}}
				>
					<SquarePlus />
				</button>
				<button
					className="TierListForObsidianButtonSmall"
					onClick={() => props.saveFn()}
					style={{display: addChildContext?'none':''}}
				>
					<Save />
				</button>
			</>
		</div>
	);
}
