import tierList, {
	child,
	child as ChildClass,
	tierListSaveFormat,
} from "./tierList";

describe("testing tierList Class", () => {
	var tl: tierList;

	const tierListSave: tierListSaveFormat = {
		name: "test",
		stack: [
			{
				id: "test",
				name: "test",
				color: "test",
				img: "test",
			},
		],
		tiers: [
			{
				id: "test",
				name: "test",
				color: "test",
				children: [
					{
						id: "test2",
						name: "test2",
						color: "test2",
						img: "test2",
					},
				],
			},
		],
	};
	beforeEach(() => {
		tl = new tierList();
	});

	it("test tierlist.newChild()", () => {
		tl.newChild("test", "test.jpg");
		expect(tl.stack.length).toBe(1);
		expect(tl.stack[0]).toMatchObject({
			name: "test",
			img: "test.jpg",
			color: "red",
		});
		expect(tl.stack[0].id).not.toBeUndefined();
	});

	it("test tierlist.newTier()", () => {
		tl.newTier();
		expect(tl.tiers.length).toBe(1);
		expect(tl.tiers[0]).toMatchObject({
			name: "new tier",
			color: "red",
		});
		expect(tl.tiers[0].id).not.toBeUndefined();
		expect(tl.tiers[0].children).not.toBeUndefined();
	});

	describe("test tierlist.removeChild()", () => {
		it("{form stack}", () => {
			tl.newChild("test", "test.jpg");
			const childId = tl.stack[0].id;
			tl.newChild("test2", "test2.jpg");
			tl.removeChild(childId, "0");
			expect(tl.stack.length).toBe(1);
			expect(tl.stack[0]).toMatchObject({
				name: "test2",
				img: "test2.jpg",
				color: "red",
			});
			expect(tl.stack[0].id).not.toBeUndefined();
		});
		it("{from tier}", () => {
			tl.newTier();
			const tierId = tl.tiers[0].id;
			const child = new ChildClass("test", "test.jpg");
			tl.addChildTo(child, tierId, "");
			tl.removeChild(child.id, tierId);
			expect(tl.tiers[0].children.length).toBe(0);
		});
	});

	describe("test tierlist.addChildTo()", () => {
		var child: ChildClass;
		var tierId: string;
		beforeEach(() => {
			child = new ChildClass("test", "test.jpg");
			tl.newTier();
			tierId = tl.tiers[0].id;
		});
		it("{to tier white empty toChildId}", () => {
			tl.addChildTo(child, tierId, "");
			expect(tl.tiers[0].children.length).toBe(1);
			expect(tl.tiers[0].children[0]).toMatchObject({
				name: "test",
				img: "test.jpg",
				color: "red",
			});
			expect(tl.tiers[0].children[0].id).not.toBeUndefined();
		});

		it("{to stack}", () => {
			tl.addChildTo(child, "0", "");
			expect(tl.stack.length).toBe(1);
			expect(tl.stack[0]).toMatchObject({
				name: "test",
				img: "test.jpg",
				color: "red",
			});
			expect(tl.stack[0].id).not.toBeUndefined();
		});

		it("{to tier white toChildId}", () => {
			const child2 = new ChildClass("test2", "test2.jpg");
			tl.addChildTo(child2, tierId, "");
			tl.addChildTo(new ChildClass("test3", "test3.jpg"), tierId, "");
			tl.addChildTo(child, tierId, child2.id);
			expect(tl.tiers[0].children.length).toBe(3);
			expect(tl.tiers[0].children[1]).toMatchObject({
				name: "test",
				img: "test.jpg",
				color: "red",
			});
			expect(tl.tiers[0].children[1].id).not.toBeUndefined();
		});
	});

	it("test tierlsit.removeTier()", () => {
		tl.newTier();
		tl.newTier();
		const id = tl.tiers[tl.tiers.length - 1].id;
		tl.newTier();
		tl.removeTier(id);

		expect(tl.tiers.length).toBe(2);
	});

	describe("test tierlist.moveChild()", () => {
		it("{stack -> tier, white empty moveToChildId}", () => {
			tl.newTier();
			const tier = tl.tiers[0];
			tl.newChild("test", "test.jpg");
			const child = tl.stack[0];
			tl.moveChild(child.id, "0", "", tier.id);
			expect(tl.stack.length).toBe(0);
			expect(tl.tiers[0].children.length).toBe(1);
			expect(tl.tiers[0].children[0]).toEqual(child);
		});
		it("{stack -> tier, white moveToChildId}", () => {
			tl.newTier();
			const tier = tl.tiers[0];
			tl.newChild("test", "test.jpg");
			const child = tl.stack[0];
			tl.addChildTo(new ChildClass("test2", "test2.jpg"), tier.id, "");
			const child2 = tl.tiers[0].children[0];
			tl.addChildTo(new ChildClass("test3", "teste.jpg"), tier.id, "");
			tl.moveChild(child.id, "0", child2.id, tier.id);
			expect(tl.tiers[0].children.length).toBe(3);
			expect(tl.tiers[0].children[1]).toEqual(child);
		});
		it("{tier -> stack}", () => {
			tl.newTier();
			const tier = tl.tiers[0];
			tl.addChildTo(new ChildClass("test", "test.jpg"), tier.id, "");
			const child = tl.tiers[0].children[0];
			tl.moveChild(child.id, tier.id, "", "0");
			expect(tl.stack.length).toBe(1);
			expect(tl.stack[0]).toEqual(child);
		});
		it("{tier -> tier, white empty moveToChildId}", () => {
			tl.newTier();
			const tier = tl.tiers[0];
			tl.newTier();
			const tier2 = tl.tiers[1];
			tl.addChildTo(new ChildClass("test", "test.jpg"), tier.id, "");
			const child = tl.tiers[0].children[0];
			tl.moveChild(child.id, tier.id, "", tier2.id);
			expect(tl.tiers[1].children.length).toBe(1);
			expect(tl.tiers[1].children[0]).toEqual(child);
		});
		it("{tier -> tier, white moveToChildId}", () => {
			tl.newTier();
			const tier = tl.tiers[0];
			tl.newTier();
			const tier2 = tl.tiers[1];
			tl.addChildTo(new ChildClass("test", "test.jpg"), tier.id, "");
			const child = tl.tiers[0].children[0];
			tl.addChildTo(new ChildClass("test2", "test2.jpg"), tier2.id, "");
			const child2 = tl.tiers[1].children[0];
			tl.addChildTo(new ChildClass("teste", "test3.jpg"), tier2.id, "");
			tl.moveChild(child.id, tier.id, child2.id, tier2.id);
			expect(tl.tiers[1].children.length).toBe(3);
			expect(tl.tiers[1].children[1]).toEqual(child);
		});
	});
	it("test tierlist.load()", () => {
		tl.load(tierListSave);
		expect(tl).toMatchObject(tierListSave);
	});

	it("test tierlist.save()", () => {
		tl.load(tierListSave);
		tl.newChild("test3", "test3.jpg");
		const child = tl.stack[1];
		const newTierListSave = { ...tierListSave };
		newTierListSave.stack.push(child);
		const save = tl.save();
		expect(save).toEqual(newTierListSave);
	});
	it("test tierlist.drop()", () => {
		const testFn = jest.fn();
		tl.drop(testFn);
		expect(testFn.mock.calls.length).toBe(1);
	});
});
