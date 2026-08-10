import type { Vector3 } from "three";
import type { Entity, EntityLivingBase, EntityPlayer } from "../entities/";
import type { ItemStack } from "../items";
import type { EnumFacing } from "../math/facing";
import type { PBItemStack } from "../packets";
import type { SlotActionType } from "../slot";
import type { BlockState, World } from "../world";
import type { BlockPos } from "../world/blockpos";
import type { RayTraceResult } from "../world/rayTraceResult";
import type { EnumHand } from "../enums";

export declare class PlayerControllerMP {
	lastSentSlot: number;
	isHittingBlock: boolean;
	/** IMPORTANT: USE DUMPS */
	syncItem(): void;
	/** just returns {@link PlayerControllerMP.isHittingBlock isHittingBlock} */
	func_181040_m(): this["isHittingBlock"];
	sendEnchantPacket(windowId: string, button: number): void;
	sendRenamePacket(windowId: string, name: string): void;
}

export declare class PlayerController {
	key: {
		leftClick: number;
	};
	rightClick: boolean;
	objectMouseOver: RayTraceResult;
	rightClickDelayTimer: number;
	currBreakingLocation: BlockPos | null;
	lastBreakSoundPlay: number;
	hoverKey: string;
	lastHoverKeyAt: number;
	leftClickInitial: boolean;
	leftHeld: boolean;
	rightClickInitial: boolean;
	nextPredictedId: number;
	weaponCooldown: number;
	burstGap: number;
	burstRemaining: number;
	scopeHeartbeat: number;
	scopeToggled: boolean;
	reset(): void;
	/** IMPORTANT: USE DUMPS */
	getBlockReachDistance(): 5 | 4.5;
	leftClick(release?: boolean): void;
	/** IMPORTANT: USE DUMPS */
	middleClick(assumeActive?: boolean): void;
	rightClickMouse(): void;
	/** IMPORTANT: USE DUMPS */
	onPlayerRightClick(
		e: EntityPlayer,
		world: World,
		item: ItemStack,
		pos: Vector3 | BlockPos,
		placeSide: EnumFacing,
		hitVec: Vector3,
		hand: EnumHand,
	): boolean;
	/** IMPORTANT: USE DUMPS */
	sendUseItem(plr: EntityLivingBase, world: World, item: ItemStack): boolean;
	/** IMPORTANT: USE DUMPS */
	windowClick(
		windowID: number,
		slotID: number,
		button: number,
		mode: SlotActionType | number,
		player: EntityPlayer,
	): ItemStack;
	onStoppedUsingItem(entity: EntityPlayer): void;
	select(): void;
	punch(): boolean | undefined;
	attackEntity(e: Entity): void;
	/** IMPORTANT: USE DUMPS */
	interactWithEntitySendPacket(_unusedPlayer: unknown, entity: Entity): boolean;
	/** IMPORTANT: USE DUMPS */
	findHotbarSlotForPickBlock(stack: PBItemStack): number;
	getTargetedBlockCoords(): BlockPos;
	getTargetedBlockState(): BlockState;
	/** IMPORTANT: USE DUMPS */
	getScreenLookVector(): Vector3;
	/** IMPORTANT: USE DUMPS */
	updateMouseOver(): void;
	/** IMPORTANT: USE DUMPS */
	pickBlock(): void;
	mine(instantMine?: boolean): void;
	dropItem(all?: boolean): void;
	update(): void;
	render(): void;
	resolveUseHand(): EnumHand;
	setHeldStack(stack: ItemStack): void;
	swapOffhand(): void;
	swingHand(hand: EnumHand): void;
	tryFireWeapon(): void;
	tryOpenSpectateMenu(): void;
	updateWeaponFeel(): void;
	predictShot(): void;
	getSpawnEggForEntity(entity: Entity): ItemStack;
	giveHotbarItem(item: ItemStack): void;
	hasRightClickUse(): boolean;
	fireRound(): void;
	heldWeapon(): unknown;
	countCarried(): number;
}
