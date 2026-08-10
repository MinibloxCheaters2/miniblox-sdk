import type { Vector3 } from "three";
import type { World } from "../world";
import type { Entity } from "./Entity";

export declare enum EntityName {
	UNDEFINED,
	ITEM,
	PLAYER,
	ARROW,
	SNOWBALL,
	ENDER_PEARL,
	EGG,
	POTION,
	ITEM_FRAME,
	FALLING_BLOCK,
	TNT,
	FIREBALL,
	PIG,
	COW,
	CHICKEN,
	SHEEP,
	ZOMBIE,
	ZOMBIE_COWMAN,
	SKELETON,
	CREEPER,
	SLIME,
	SPIDER,
	BOAT,
	SNOWMAN,
	GHOST,
}

export declare class EntityArrow extends Entity {
	type: "arrow";
	identifier: EntityName;
	shootingEntity: Entity;
	lastPos: Vector3;
	lastVel: Vector3;
	prevVel: Vector3;
	vel: Vector3;
	acc: Vector3;
	damage: number;
	knockbackStrength: number;
	canBePickedUp: boolean;
	inGround: boolean;
	ticksInGround: number;
	ticksInAir: number;
	xTile: number;
	yTile: number;
	zTile: number;
	inTile: boolean;
	arrowShake: number;
	lastArrowShake: number;
	constructor(
		world: World,
		shootingEntity: Entity,
		idk: number | Vector3,
		idk2: number,
		idk3: number,
	);
	setDamage(h: number): void;
	getDamage(): number;
	setKnockbackStrength(h: number): void;
	setThrowableHeading(mX: number, mY: number, mZ: number, y: number, x: number): void;
	setIsCritical(h: boolean): void;
	getIsCritical(): boolean;
}

export { EntityArrow, EntityName };
