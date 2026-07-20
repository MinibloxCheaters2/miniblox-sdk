import type { Game } from "../game";
import type { CPacketRespawn } from "../packets";
import type { Profile } from "../undefined";
import type { BlockPos } from "../world/blockpos";
import type { PlayerMovement } from "./PlayerMovement";

export declare class ClientEntityPlayer extends PlayerMovement {
	constructor();
	init(socketId: string, p: Profile): void;
	respawn(packet?: CPacketRespawn): void;
	sendRespawnPacket(): void;
	fixedUpdate(): void;
	openShop(): void;
}

export { ClientEntityPlayer };
