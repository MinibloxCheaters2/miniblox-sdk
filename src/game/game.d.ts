import type { Vector3 } from "three";
import type { Chat } from "../chat";
import type { PlayerController } from "../controller";
import type { ClientEntityPlayer } from "../entities";
import type { ServerInfo } from "../network/serverInfo";
import type { ClientWorld } from "../world";
import type { GameScene } from "./gameScene";

export enum GameState {
	TITLE_SCREEN = 0,
	CONNECTING = 1,
	CONNECTING_ATTEMPT = 2,
	CONNECTION_ERROR = 3,
	AUTHENTICATING = 4,
	LOADING_CHUNKS = 5,
	PLAY = 6,
}

export declare class GameMenus {
	stack: {
		id: string;
		payload: string | undefined;
	}[];
	open(id: string, ...payload: string[]): void;
	close(id: string): void;
	closeMany(ids: string[]): void; // could've done a var-arg but vector is vector so...
	isOpen(id: string): boolean;
	payload(id: string): string | null | undefined;
	get blocksGameplay(): boolean;
	get hidesChat(): boolean;
	get suppressesEscapeMenu(): boolean;
}

export interface GameInfo {
	selectedSlot: number;
	showSignEditor: Vector3 | null;
	showDeathScreen?: boolean;
}

export declare class ResourceMonitor {
	instantFPS: number;
	/** note: this is always 0 */
	instantPing: number;
	filteredPing: number;
	game: Game;
	beginTime: number;
	prevTime: number;
	filteredFPS: number;
	filteredMaxFPS: number;
	filteredJitter: number;
	lastPing: number;
	monitorRefreshRate: number | null;
	lastFrameFinishedTimestamp: number;
	lastGraphUpdateTimestamp: number;
	framesSinceGraphUpdate: number;
	updates: [];
	mspt: number;
	logicTime: number;
	renderTime: number;
	canvasTime: number;
	chunkDecodeMsPerSec: number;
	chunkDecodeMaxMs: number;
	chunkIngestMsPerSec: number;
	chunkIngestAvgMs: number;
	chunkIngestMaxMs: number;
	otherDecodeMsPerSec: number;
	chunkDecodeAccumMs: number;
	chunkIngestAccumMs: number;
	chunkIngestCountWindow: number;
	otherDecodeAccumMs: number;
	decodeWindowStart: number;
	gpuInfo;
	OSInfo;
	objects: {
		[k: string | number | symbol]: {
			prev: number;
			getValue: () => number;
			rerender: () => void;
		};
	};
	lowFPSCount: number;
	suggestedOptimization: boolean;
	lastWatchTimestamp: number;
	static fpsGraphUpdate: boolean;
	static memoryGraphUpdate: boolean;
	static tickTimeGraphUpdate: boolean;
}

export declare class Game {
	gameScene: GameScene;
	world: ClientWorld;
	GameSceneClass: typeof GameScene; // hello @vector? do game.GameScene.constructor? lol.
	playerList: PlayerList;
	unleash;
	cubicBezier: CubicBezier;
	/**
	 * the `resolve` function for the {@link Game.accountLoaded} promise.
	 */
	resolveAccountLoaded: () => void;
	accountLoaded: Promise<void>;
	/**
	 * Calls {@link Game.resolveAccountLoaded}
	 */
	markAccountLoaded(): void;
	chunkRenderManager: ChunkRenderManager;
	chunkManager: ClientChunkManager;
	/**
	 * Null on initialize
	 */
	bootPromise: Promise<void> | null;
	enginePrepScheduled: boolean;
	menuLoad: null; // TODO
	static loadingStatus; // also TODO
	prevTime: number;
	lastFixedUpdate: number;
	lastRenderTime: number;
	tickAccumulator: number;
	lastTickPump: number;
	static readonly MAX_CATCHUP_TICKS = 5;
	static readonly FRAME_CAP_SLACK_MS = 1.5;
	static readonly PRE_ENTRY_WARM_CAP_MS = 6e3;
	preEntryWarmStarted: boolean;
	preEntryWarmDone: boolean;
	chat: Chat;
	fpsOptimizer;
	info: GameInfo;
	escapeMenuOpenedAt: number;
	adIntervalId: number | null;
	connectionAttempts: number;
	partyFollowFallback: null;
	queueFallback: null;
	queueRequeueAttempts: number;
	static readonly QUEUE_REQUEUE_MAX_ATTEMPTS = 3;
	static readonly RESPAWN_WAIT_TIMEOUT_MS = 1e4;
	static readonly RESPAWN_SETTLE_MS = 150;
	enterWorldListeners: Set<() => void>;
	pendingAutoCover: null;
	pendingTransferNotice: unknown;
	connectionEpoch: number;
	respawnWaitStartedAt: number;
	titleHeartbeatId: number;
	loadedPlanet: string | null;
	whispers: Whispers;
	resourceMonitor: ResourceMonitor;
	get player(): ClientEntityPlayer;
	get controller(): PlayerController;
	renderLoopErrored: boolean;
	_state: GameState;
	party: PartyClient;
	/**
	 * @param listener The listener to call when the player has entered the world
	 * @returns A callback that removes this listener from the list.
	 */
	onEnterWorld(listener: () => void): () => void;
	scoreboardLines: string[];
	scoreboardTitle: string;
	delta: number;
	constructor();
	static isMobile: boolean;
	static get isCrazyGames(): boolean;
	static get isDiscordActivity(): boolean;
	static get isPoki(): boolean;
	static get isPlaygama(): boolean;
	get state(): this["_state"];
	set state(value: GameState);
	boot(): void;
	prepareEngineWhenIdle(): void;
	prepareEngine(): Promise<void>;
	serverInfo: ServerInfo;
	inGame(): boolean;
	get currentPlanetId(): string | null;
	gameLoopStarted(): boolean;
	canEnterWorld(): boolean;
	beginRespawnWait(): void;
	finishRespawnWait(): void;
	sceneWarmedForEntry(): boolean;
	/**
	 * @param f1 does being in f1 mode count as activity?
	 */
	static isActive(f1?: boolean): boolean;
	static isChatting(): Game["chat"]["showInput"];
	static isEscapeMenuOpen(): boolean;
	static hasMenuOpen(): boolean;
	static isChatHidden(): Game["info"]["menus"]["hidesChat"];
	init(): Promise<void>;
	applyAcrylicEffect(disabled: boolean): void;
	applyGuiScale(scale: number): void;
	loadAudioWhenReady(): void;
	maybeAutoDetectGraphics(): Promise<void>;
	fixedUpdateTS(): void;
	update(): void;
	pumpFixedUpdates(): void;
	fixedUpdate(): void;
	requestQueue(): void;
	/**
	 * Queues for a mini game.
	 * @param miniGameID the ID of the mini game to queue
	 * @param mgConfig the config of the mini game
	 * @param reQueue if this was a re-queue, defaults to false
	 */
	queue(miniGameID: string, mgConfig: object, reQueue?: boolean): Promise<void>;
	resolveInviteCode(code: string): Promise<string | null>;
	connectWithCode(code: string): void;
	tryUpdateClient(serverID: string): void;
	connect(
		idOrCustomURL: string,
		useCustomURL?: boolean,
		noAd?: boolean,
		data?: {
			minigame?: unknown;
			partyFollow?: boolean;
		},
	): Promise<void>;
	tryPartyFollowFallback(): boolean;
	connectToPartyGame(
		id: string,
		miniGameId: string,
		miniGameConfig: object,
	): void;
	connectToPartyGame(id: string): void;
	static isRequeueableQueue(queue: {
		minigameId: string;
		minigameConfig: object;
	}): boolean;
	tryQueueRequeue(): void;
	/**
	 * Shows a status modal
	 * @param title defaults to "Disconnected"
	 */
	showStatus(message: string, title?: string): void;
	disconnect(reason?: string | null): void;
	cancelConnection(): void;
	onSocketDisconnect(reason: string | null): void;
	static isFullscreen(): boolean;
	static enterFullscreen(): void;
	static exitFullscreen(): void;
	unfocus(): void;
	resume(): void;
	pause(): void;
	joinPlanet(id: number): Promise<void>;
	loadPlanet(
		id: number,
		accessControl: string,
		callback: (justStarted: boolean) => void,
	): Promise<void>;
}
