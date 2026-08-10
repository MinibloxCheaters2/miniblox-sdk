import type { Potion } from "../effects";
import type { EnumCreatureAttribute } from "../enums";
import type { ItemStack } from "../items";
import type { AttributeMap, CombatTracker, Inventory, PotionEffect } from "../undefined";
import type { World } from "../world";
import type { Entity } from "./Entity";

export declare class EntityLivingBase extends Entity {
	activePotionsMap: Map<number, PotionEffect>;
	potionsNeedUpdate: boolean;
	absorptionAmount: number;
	maxHealth: number;
	attributeMap: AttributeMap;
	hurtTime: number;
	deathTime: number;
	revengeTimer: number;
	maxHurtResistantTime: number;
	recentlyHit: number;
	landMovementFactor: number;
	limbSwingAmount: number;
	prevLimbSwingAmount: number;
	limbSwing: number;
	jumping: boolean;

	constructor(world: World);
	applyEntityAttributes(): void;
	getEntityAttribute(h: unknown): unknown;
	getAttributeMap(): AttributeMap;
	lastDamager(): unknown;
	getHeldItem(): ItemStack | null;
	isChild(): boolean;
	jump(): void;
	attackEntityAsMob(h: unknown): boolean;
	getEquipmentInSlot(h: unknown): void;
	dropFewItems(h: unknown, p: unknown): void;
	getInventory(): Inventory;
	kill(): void;
	handleStatusUpdate(h: unknown): void;
	isPotionActive(pot: Potion): boolean;
	getActivePotionEffect(h: unknown): unknown;
	addPotionEffect(h: unknown): void;
	heal(add: number): void;
	setHealth(health: number): void;
	getHealth(): number;
	getMaxHealth(): number;
	setPositionAndRotation2(
		x: number,
		y: number,
		z: number,
		yaw: number,
		pitch: number,
		S: unknown,
	): void;
	onLivingUpdate(): void;
	setSprinting(sprinting: boolean): void;
	attackEntityFrom(h: unknown, p: unknown): boolean;
	setBeenAttacked(): void;
	knockback(_unused_1: unknown, _unused_2: unknown, xM: number, yM: number): void;
	update(): void;
	updateFallState(y: number, onGround: boolean, block: unknown | null, pos: unknown): void;
	fall(distance: number, damageMultiplier: number): void;
	getArmorStacks(): ItemStack[];
	getEquippedChestStack(): ItemStack | null;
	tickEquipmentAbility(): void;
	getSoundInfo(): unknown;
	/** IMPORTANT: USE DUMPS */
	setAbsorptionAmount(amount: number): void;
	/** IMPORTANT: USE DUMPS */
	pushOutOfBlocks(x: number, y: number, z: number): boolean;
	/** IMPORTANT: USE DUMPS */
	getCombatTracker(): CombatTracker;
	/** IMPORTANT: USE DUMPS */
	canDropLoot(): boolean;
	/** IMPORTANT: USE DUMPS */
	addRandomDrop(): void;
	/** IMPORTANT: USE DUMPS */
	getCreatureAttribute(): EnumCreatureAttribute;
	/** IMPORTANT: USE DUMPS */
	setLastAttacker(entity: Entity): void;
	/** IMPORTANT: USE DUMPS */
	canEntityBeSeen(entity: Entity): boolean;
}

export { EntityLivingBase };
