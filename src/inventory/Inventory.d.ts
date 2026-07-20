import type { EntityPlayer } from "../entities";
import type { Item, ItemStack } from "../items";
import type { Block } from "../blocks/Block";
import { SPacketPlayerUpdateInventory } from "../packets";
import type { ItemStack } from "../items";

type Crafter = unknown;

export declare class Containers {
	inventoryTitle: string;
	slotsCount: number;
	inventoryContents: ItemStack[];
	crafters: Crafter[] | null;
	constructor(inventoryTitle: string, slotsCount: number);
	/**
	 * adds a new crafter to the inventory.
	 * if this.crafters is null, we set it to an empty array.
	 * in either case, `this.crafters.push(crafter)` is called.
	 */
	func_110134_a(crafter: Crafter): void;
	getInventory(): this["inventoryContents"];
	getStackInSlot(slot: number): ItemStack | null;
	decrStackSize(idx: number, count: number): ItemStack | null;
	func_174894_a(stack: ItemStack): ItemStack;
	removeStackFromSlot(idx: number): ItemStack | null;
	setInventorySlotContents(idx: number, stack: ItemStack): void;
	getSizeInventory(): this["slotsCount"];
	getName(): this["inventoryTitle"];
	getDisplayName(): string;
	getInventoryStackLimit(): number;
	markDirty(): void;
	isUseableByPlayer(plr: EntityPlayer): boolean;
	openInventory(plr: EntityPlayer): void;
	closeInventory(plr: EntityPlayer): void;
	isItemValidForSlot(index: number, stack: ItemStack): boolean;
	getField(id: number): number;
	setField(id: number, value: number): void;
	getFieldCount(): number;
	clear(): void;
}

export declare class InventoryPlayer {
	player: EntityPlayer;
	currentItem: number;
	main: (ItemStack | null)[];
	armor: (ItemStack | null)[];
	offHand: [ItemStack | null];
	itemStack: ItemStack | null;
	inventoryChanged: boolean;
	setInventorySlotContents: (slot: number, stack: ItemStack) => void;
	constructor(player: EntityPlayer);
	get mainInventory(): this["main"];
	/** **IMPORTANT**: USE DUMPS (or just use `this.armor`, this is just a getter for this.armor) */
	get armorInventory(): this["armor"];
	get offHandInventory(): this["offHand"];
	getField(id: number): number;
	setField(id: number, value: number): void;
	getFieldCount(): number;
	getCurrentItem(): ItemStack | null;
	getOffhandItem(): ItemStack | null;
	swapOffhand(): void;
	sendInventoryToServer(): SPacketUpdateInventory;
	addItemStackToInventory(stack: ItemStack): boolean;
	/** **IMPORTANT**: USE DUMPS */
	storePartialItemStack(stack: ItemStack): number;
	/** **IMPORTANT**: USE DUMPS */
	storeItemStack(stack: ItemStack): number;
	/** **IMPORTANT**: USE DUMPS */
	getFirstEmptyStack(): number;
	/** **IMPORTANT**: USE DUMPS */
	getInventorySlotContainItem(stack: Item): number;
	consumeInventoryItem(stack: ItemStack, amount?: number): number;
	/**
	 * @param item item to count
	 * @returns how many of these items were in the (main) inventory
	 */
	getInventoryItemCount(item: Item): number;
	/**
	 *
	 * @param i stack index
	 * @returns old contents
	 */
	removeStackFromSlot(i: number): ItemStack | null;
	sectionFor(
		idx: number,
	): [this["main"] | this["armor"] | this["offHand"], number];
	setSlot(slot: number, stack: ItemStack): void;
	getStackInSlot(slot: number): ItemStack | null;
	/** **IMPORTANT**: USE DUMPS */
	itemIterator(): Generator<ItemStack | null, void, unknown>;
	hasItem(i: number): boolean;
	getItemStack(): ItemStack | null;
	setItemStack(stack: ItemStack): void;
	markDirty(): void;
	getSizeInventory(): number;
	decrStackSize(slot: number, by: number): ItemStack | null;
	getInventoryStackLimit(): number;
	isUseableByPlayer(player: EntityPlayer): boolean;
	/** Removes all main, armor, and off-hand items. */
	clear(): void;
	openInventory(player: EntityPlayer): void;
	closeInventory(player: EntityPlayer): void;
	clone(): InventoryPlayer;
	/** **IMPORTANT**: USE DUMPS */
	canHeldItemHarvest(block: Block): boolean;
	getStrVsBlock(block: Block): number;
	writeToNBT(nbt: unknown[]): unknown[];
	readFromNBT(data: unknown[]): void;
	/** **IMPORTANT**: USE DUMPS */
	damageArmor(amount: number): void;
	/** **IMPORTANT**: USE DUMPS */
	dropAllItems(): void;
}
