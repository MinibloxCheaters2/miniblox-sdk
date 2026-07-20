import type { EntityPlayer } from "../entities/EntityPlayer";

export declare class PlayerMovement extends EntityPlayer {
	/** IMPORTANT: USE DUMPS */
	moveStrafe: number;
	/** IMPORTANT: USE DUMPS */
	moveForward: number;
	constructor();
	reset(): void;
	/** IMPORTANT: USE DUMPS */
	applyInput(input: { right: boolean; left: boolean; up: boolean; down: boolean; yaw: number; pitch: number; jump: boolean; sneak: boolean; usingItem: boolean }, t?: boolean): void;
}

export { PlayerMovement };
