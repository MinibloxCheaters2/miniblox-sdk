import {
	ShaderMaterial,
	BufferAttribute,
	Texture,
	Color,
	Mesh,
	BufferGeometry,
	BoxGeometry,
	MeshBasicMaterial,
} from "three";
import type { BlockPos, World } from "../world";
import { GameScene } from "./gameScene";

export interface Bolt {
	mesh: Mesh<BoxGeometry, MeshBasicMaterial>;
	bornMs: number;
}

/** 1: rain, 2: snow, 0: none. */
export type ColumnKind = 0 | 1 | 2;

export interface Column {
	x: number;
	z: number;
	kind: ColumnKind;
	surface: number;
	expiresTick: number;
}
export interface Layer {
	mesh: Mesh<BufferGeometry, ShaderMaterial>;
	uniforms: {
		map: {
			value: Texture<HTMLImageElement>;
		};
		uTime: {
			value: number;
		};
		uOpacity: {
			value: number;
		};
		uTint: {
			value: Color;
		};
		uFallSpeed: {
			value: number;
		};
		uSway: {
			value: number;
		};
	};
	positions: BufferAttribute;
	uvs: BufferAttribute;
	phases: BufferAttribute;
	vertCount: number;
}
export declare class Weather {
	gameScene: GameScene;
	rain: Layer;
	snow: Layer;
	bolts: Bolt[];
	columnCache: Map<number, Column>;
	lastRebuildTick: number;
	lastCamX: number;
	lastCamY: number;
	lastCamZ: number;
	lastRadius: number;
	private scratch: BlockPos;
	constructor(gameScene: GameScene);
	sheetRadius(): number;
	update(): void;
	rebuild(x: number, y: number, z: number, radius: number): void;
	computeColumn(
		world: World,
		x: number,
		z: number,
		y: number,
		baseExpires: number,
		key: number,
	): Column | null;
	emitColumn(layer: Layer, nX: number, nZ: number, surface: number, surfaceTop: number): void;
	applyLayer(layer: Layer): void;
	addBolt(x: number, y: number, z: number): void;
	updateBolts(): void;
	clear(): void;
}
