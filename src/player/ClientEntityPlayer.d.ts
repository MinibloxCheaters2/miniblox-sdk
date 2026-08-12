import type { Vector3 } from "three";
import type { Entity } from "../entities/Entity";
import type { CPacketRespawn } from "../packets";
import type { CommandBlockLogic, Profile } from "../undefined";
import type { PlayerMovement } from "./PlayerMovement";

declare enum Perspective {
	FIRST_PERSON,
	THIRD_PERSON,
	THIRD_PERSON_FRONT,
}

export declare class ClientEntityPlayer extends PlayerMovement {
	perspective: Perspective;
	constructor();
	init(socketId: string, p: Profile): void;
	respawn(packet?: CPacketRespawn): void;
	sendRespawnPacket(): void;
	fixedUpdate(): void;
	openShop(): void;
	/** IMPORTANT: USE DUMPS */
	getMoveDirection(yaw: number): Vector3;
	/** IMPORTANT: USE DUMPS */
	resetPositionToBB(updateCamera?: boolean): void;
	/** IMPORTANT: USE DUMPS */
	onCriticalHit(entity: Entity): void;
	checkInventoryChange(h?: boolean): void;
	addSelectBox(): void;
	renderCameraFOV(): void;
	renderCamera(dt: number): void;
	toggleCameraPerspective(): void;
	updatePlayerMesh(): void;
	sendPositionAndRotation(): void;
	sendActions(): void;
	sendAbilities(): void;
	onUpdateWalkingPlayer(): void;
	updateClient(dt: number): void;
	updateSoundOrientation(): void;
	resetInventory(): void;
	onEnchantmentCritical(e: Entity): void;
	setXPStats(xp: number, total: number, level: number): void;
	getClientModel(): CommandBlockLogic;
}

export { ClientEntityPlayer, Perspective };
