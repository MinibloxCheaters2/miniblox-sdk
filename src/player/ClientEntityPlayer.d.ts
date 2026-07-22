import type { Vector3 } from "three";
import type { Game } from "../game";
import type { CPacketRespawn } from "../packets";
import type { Profile } from "../undefined";
import type { BlockPos } from "../world/blockpos";
import type { Entity } from "../entities/Entity";
import type { PlayerMovement } from "./PlayerMovement";

export declare class ClientEntityPlayer extends PlayerMovement {
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
}

export { ClientEntityPlayer };
