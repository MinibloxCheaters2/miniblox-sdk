import type { Vector3 } from "three";
import type { Potion } from "../effects";
import type { EnumCreatureAttribute } from "../enums";
import type { ItemStack } from "../items";
import type { AttributeMap, CombatTracker, Inventory, PotionEffect } from "../undefined";
import type { World } from "../world";
import type { Entity } from "./Entity";
import type { EntityPlayer } from "./EntityPlayer";

export declare class EntityLivingBase extends Entity {
	activePotionsMap: Map<number, PotionEffect>;
	potionsNeedUpdate: boolean;
	absorptionAmount: number;
	health: number;
	maxHealth: number;
	attributeMap: AttributeMap;
	hurtTime: number;
	maxHurtTime: number;
	deathTime: number;
	revengeTimer: number;
	lastDamage: number;
	hurtResistantTime: number;
	maxHurtResistantTime: number;
	attackedAtYaw: number;
	attackingPlayer: EntityPlayer | null;
	recentlyHit: number;
	combatTracker: CombatTracker;
	landMovementFactor: number;
	jumpMovementFactor: number;
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
	onKillCommand(): void;
	onEntityUpdate(): void;
	isPlayer(): boolean;
	onDeathUpdate(): void;
	setOxygen(oxygen: number): void;
	getOxygen(): number;
	decreaseOxygenSupply(h: number): number;
	canBreatheUnderwater(): boolean;
	collideWithNearbyEntities(): void;
	canBePushed(): boolean;
	getAITarget(): unknown;
	getRevengeTimer(): number;
	setRevengeTarget(h: unknown): void;
	getLastAttacker(): unknown;
	getLastAttackerTime(): number;
	getAge(): number;
	collideWithEntity(e: Entity): void;
	setJumping(h: boolean): void;
	onItemPickup(h: unknown, p: unknown): void;
	isServerWorld(): boolean;
	isMovementBlocked(): boolean;
	updateEntityActionState(): void;
	renderBrokenItemStack(h: unknown): void;
	dismountEntity(_: unknown): void;
	moveEntityWithHeading(strafe: number, forward: number): void;
	getAIMoveSpeed(): number;
	setAIMoveSpeed(speed: number): void;
	getTotalArmorValue(): number;
	damageArmor(h: unknown): void;
	applyArmorCalculations(h: unknown, p: unknown): unknown;
	applyPotionDamageCalculations(h: unknown, p: unknown): unknown;
	damageEntity(h: Entity, p: unknown): void;
	getAbsorptionAmount(): number;
	hasInferniumArmor(): boolean;
	getSoundPitch(): number;
	getFallSoundString(h: unknown): "game.player.hurt.fall.big" | "game.player.hurt.fall.small";
	getHurtSound(): string;
	getDeathSound(): string;
	getSoundVolume(): number;
	updatePotionEffects(): void;
	updatePotionMetadata(): void;
	resetPotionEffectMetadata(): void;
	clearActivePotions(): void;
	getActivePotionEffects(): PotionEffect[];
	isPotionApplicable(h: unknown): boolean;
	isEntityUndead(): boolean;
	removePotionEffectClient(h: unknown): void;
	removePotionEffect(h: unknown): void;
	onNewPotionEffect(h: unknown): void;
	onChangedPotionEffect(h: unknown, p: unknown): void;
	onFinishedPotionEffect(h: unknown): void;
	getEyePositionVector(): Vector3;
	sendEnterCombat(): void;
	sendEndCombat(): void;
}

export { EntityLivingBase };
