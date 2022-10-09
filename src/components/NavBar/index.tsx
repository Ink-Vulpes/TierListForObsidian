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
					data-testid="TierListForObsidianTextInput"
					ref={NewChildName}
					onKeyDown={(e) => EnterEvent(e)}
					hidden={!addChildContext}
				/>
				<input
					type="text"
					placeholder="Image path"
					data-testid="TierListForObsidianImgInput"
					onKeyDown={(e) => EnterEvent(e)}
					ref={NewChildImg}
					hidden={!addChildContext}
				/>
				<button
					className="TierListForObsidianButtonSmall"
					data-testid="TierListForObsidianButtonAddChildSave"
					onClick={AddChild}
					hidden={!addChildContext}
				>
					<Plus />
				</button>
				<button
					className="TierListForObsidianButtonSmall"
					data-testid="TierListForObsidianButtonAddChildClose"
					onClick={() => setAddChildContext(false)}
					hidden={!addChildContext}
				>
					<Close />
				</button>
			</>
			<>
				<button
					className="TierListForObsidianButtonSmall"
					data-testid="TierListForObsidianButtonAddChild"
					onClick={() => setAddChildContext(true)}
					hidden={addChildContext}
				>
					<Plus />
				</button>
				<button
					className="TierListForObsidianButtonSmall"
					data-testid="TierListForObsidianButtonAddTier"
					onClick={AddTier}
					hidden={addChildContext}
				>
					<SquarePlus />
				</button>
				<button
					className="TierListForObsidianButtonSmall"
					data-testid="TierListForObsidianFileSave"
					onClick={() => props.saveFn()}
					hidden={addChildContext}
				>
					<Save />
				</button>
			</>
		</div>
	);
}
