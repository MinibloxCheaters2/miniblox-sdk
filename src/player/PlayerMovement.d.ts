import type { EntityPlayer } from "../entities/EntityPlayer";
import type { CPacketPlayerReconciliation, SPacketPlayerInput } from "../packets";

export declare class PlayerMovement extends EntityPlayer {
	flyToggleTimer: number;
	sprintToggleTimer: number;
	sprintingTicksLeft: number;
	currentInput: SPacketPlayerInput | null; // SPacketPlayerInput
	inputSequenceNumber: number;
	pendingInputs: SPacketPlayerInput[]; // SPacketPlayerInput[]
	serverDistance: number;
	/** IMPORTANT: USE DUMPS */
	moveStrafe: number;
	/** IMPORTANT: USE DUMPS */
	moveForward: number;
	jumping: boolean;
	constructor();
	reset(): void;
	updatePlayerMoveState(): void;
	reconcileServerPosition(packet: CPacketPlayerReconciliation): void;
	checkHeadInBlock(): void;
	getFovModifier(): number;
	fixedUpdate(): void;
}

export { PlayerMovement };
