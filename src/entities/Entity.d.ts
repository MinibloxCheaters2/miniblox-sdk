import type { Box3, Vector3 } from "three";
import type { Block } from "../blocks/Block";
import type { ItemStack } from "../items";
import type { EnumFacing } from "../math/facing";
import type { RenderPlayer } from "../render";
import type { DataWatcher, Inventory, Profile } from "../undefined";
import type { World } from "../world";
import type { BlockPos } from "../world/blockpos";
import type { DamageSource } from "../world/damageSource";
import type { EntityItem } from "./EntityItem";

export declare class Entity {
	static nextEntityID: number;
	mesh: RenderPlayer;
	id: number;
	world: World;
	pos: Vector3;
	prevPos: Vector3;
	serverPos: Vector3;
	noPhysics: boolean;
	yaw: number;
	pitch: number;
	prevPitch: number;
	prevYaw: number;
	ticksExisted: number;
	dead: boolean;
	width: number;
	height: number;
	boundingBox: Box3;
	fire: number;
	fireResistance: number;
	inLava: boolean;
	onGround: boolean;
	stepHeight: number;
	fallDistance: number;
	sneak: boolean;
	riddenByEntity: Entity | null;
	ridingEntity: Entity | null;
	inPortal: boolean;
	timeUntilPortal: number;
	dataWatcher: DataWatcher;
	dimension: number;
	motion: Vector3;
	nextStepDistance: number;
	distanceWalkedModified: number;
	distanceWalkedOnStepModified: number;
	portalCounter: number;
	lastUpdate: number;
	renderOffset: Vector3;
	renderPos: Vector3;
	renderYawOffset: number;
	newPos: Vector3;
	newYaw: number;
	newPitch: number;
	newPosRotationIncrements: number;
	tags: unknown;
	uuid: string;
	constructor(world: World, profile?: Profile);
	getDisplayName(): string;
	getName(): string;
	isInWater(): boolean;
	entityInit(): void;
	getDataWatcher(): DataWatcher;
	getCustomNameTag(): string;
	equals(other: unknown): boolean;
	getEntityBoundingBox(): Box3;
	/** IMPORTANT: USE DUMPS */
	getCollisionBorderSize(): number;
	/** IMPORTANT: USE DUMPS */
	getEyePos(): Vector3;
	setSize(width: number, height: number): void;
	setPositionAndUpdate(x: number, y: number, z: number): void;
	setPosition(vec: Vector3): void;
	setPosition(x: number, y: number, z: number): void;
	setPositionAndRotation(x: number, y: number, z: number, yaw: number, pitch: number): void;
	setPositionAndRotation2(
		x: number,
		y: number,
		z: number,
		yaw: number,
		pitch: number,
		_: unknown,
		S?: boolean,
	): void;
	setLocationAndAngles(x: number, y: number, z: number, yaw?: number, pitch?: number): void;
	/** IMPORTANT: USE DUMPS */
	setRotation(yaw: number, pitch: number): void;
	getEyeHeight(): number;
	getPartialTicks(): number;
	update(): void;
	kill(): void;
	setCurrentItemOrArmor(i: number, v: ItemStack | null): void;
	isBurning(): boolean;
	getInventory(): Inventory | null;
	toJSON(): {
		id: number;
		pos: Vector3;
		onGround: boolean;
	};
	fromJSON(data: { id: number; pos: Vector3; onGround: boolean }): void;
	fall(distance: number, damageMultiplier: number): void;
	updateFallState(y: number, onGround: boolean, block: Block | null, pos: BlockPos): void;
	handleStatusUpdate(u: unknown): void;
	isOnLadder(): boolean;
	canTriggerWalking(): boolean;
	moveEntity(dX: number, dY: number, dZ: number): void;
	/** IMPORTANT: USE DUMPS */
	moveFlying(strafe: number, forward: number, friction: number): void;
	/** IMPORTANT: USE DUMPS */
	setVelocity(x: number, y: number, z: number): void;
	playSound(x: number, y: number, z: number): void;
	addVelocity(x: number, y: number, z: number): void;
	/** IMPORTANT: USE DUMPS */
	isEating(): boolean;
	/** IMPORTANT: USE DUMPS */
	setEating(eating: boolean): void;
	/** IMPORTANT: USE DUMPS */
	setInvisible(invisible: boolean): void;
	/** IMPORTANT: USE DUMPS */
	getHorizontalFacing(): EnumFacing;
	setFire(ticks: number): void;
	canBeCollidedWith(): boolean;
	onCollideWithPlayer(u: unknown): void;
	getLook(): unknown;
	canCommandSenderUseCommand(u: unknown, h: unknown): boolean;
	attackEntityFrom(source: DamageSource, amount: number): boolean;
	setBeenAttacked(): void;
	isEntityInvulnerable(u: unknown): boolean;
	setDead(): void;
	isEntityAlive(): boolean;
	setEntityState(u: unknown, h: unknown): void;
	dropItem2(u: unknown, h: unknown): unknown;
	getDistanceSqToEntity(u: Entity): number;
	setSprinting(sprinting: boolean): void;
	isSprinting(): boolean;
	entityDropItem(stack: ItemStack, offsetY: number): EntityItem;
	getPosition(): BlockPos;
	interactFirst(player: Entity): boolean;
	isRiding(): boolean;
	mountEntity(e: Entity | null): void;
	despawnsInUnloadedChunks(): void;
	ejectFromSolidBlocks(): void;
	getPortalDestinationDimension(): unknown;
	hasDaylightSky(): boolean;
	isUsingOffHand(): boolean;
	setUsingOffHand(using: boolean): void;
	/** IMPORTANT: USE DUMPS */
	isInvisible(): boolean;
	/** IMPORTANT: USE DUMPS */
	getFlag(flag: number): boolean;
	/** IMPORTANT: USE DUMPS */
	setFlag(flag: number, value: boolean): void;
	/** IMPORTANT: USE DUMPS */
	isInvisibleToPlayer(player: EntityPlayer): boolean;
	/** IMPORTANT: USE DUMPS */
	isInLava(): boolean;
	/** IMPORTANT: USE DUMPS */
	isEntityInsideOpaqueBlock(): boolean;
	/** IMPORTANT: USE DUMPS */
	resetHeight(): void;
	/** IMPORTANT: USE DUMPS */
	getLadderSpeed(): number;
	/** IMPORTANT: USE DUMPS */
	getMaxFallHeight(): number;
	/** IMPORTANT: USE DUMPS */
	setOnFireFromLava(): void;
	/** IMPORTANT: USE DUMPS */
	isOpenBlockSpace(pos: BlockPos): boolean;
	/** IMPORTANT: USE DUMPS */
	hitByEntity(entity: Entity): boolean;
	/** IMPORTANT: USE DUMPS */
	getExplosionResistance(
		_unused1: unknown,
		_unused2: unknown,
		_unused3: unknown,
		block: unknown,
	): number;
	/** IMPORTANT: USE DUMPS */
	verifyExplosion(explosion: unknown, worldObj: World, x: number, y: number, z: number): boolean;
	/** IMPORTANT: USE DUMPS */
	isImmuneToExplosions(): boolean;
	/** IMPORTANT: USE DUMPS */
	getDistance(x: number, y: number, z: number): number;
	/** IMPORTANT: USE DUMPS */
	canAttackWithItem(): boolean;
}
