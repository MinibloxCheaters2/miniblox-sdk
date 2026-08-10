import type { BufferGeometry, Group, Mesh } from "three";

export declare type UVs = [number, number, number, number][];

export declare interface ModelPart {
	uvs: UVs;
	width: number;
	height: number;
	depth: number;
}

export declare interface BoxData {
	uvs: UVs;
	width: number;
	height: number;
	depth: number;
}

export declare interface GeometryData {
	positions: number[];
	normals: number[];
	uvs: UVs;
	indices: number[];
	colors?: number[];
	overlayUVs?: number[];
	animations?: number[];
}

interface IPositions {
	[`${number}`]: number;
}

interface IColors {
	[`${number}`]: number;
}

interface INormals {
	[`${number}`]: number;
}

interface IUvs {
	[`${number}`]: number;
}

interface IIndices {
	[`${number}`]: number;
}

interface IAnimations {
	[`${number}`]: number;
}

interface IOverlayUVs {
	[`${number}`]: number;
}

interface IThingy {
	positions: IPositions;
	colors: IColors;
	normals: INormals;
	uvs: IUvs;
	indices: IIndices;
	animations: IAnimations;
	overlayUVs: IOverlayUVs;
}

export declare class Model extends Group {
	skinName: undefined;
	root: undefined;
	pos: undefined;
	parts: ModelPart[];
	matrixAutoUpdate: boolean;
	matrixWorldAutoUpdate: boolean;

	constructor();

	needsRendering(): boolean;

	addAdjustments(h: unknown): void;

	render(x: unknown, y: unknown, z: unknown): void;

	/**
	 * returns data for a box.
	 * @param x x position
	 * @param y y position
	 * @param width the width of the box
	 * @param height the height of the box
	 * @param depth the depth of the box
	 * @returns UV data and dimensions
	 */
	static addBox(x: number, y: number, width: number, height: number, depth: number): BoxData;

	static addBoxSpritesheet(
		x: number,
		y: number,
		width: number,
		height: number,
		depth: number,
		id: string,
	): BoxData;

	/**
	 * Creates two box halves with specified ratio
	 * @param x x position
	 * @param y y position
	 * @param width width
	 * @param height height
	 * @param depth depth
	 * @param splitRatio split ratio (default 0.5)
	 * @returns array of two BoxData objects
	 */
	static addBoxHalves(
		x: number,
		y: number,
		width: number,
		height: number,
		depth: number,
		splitRatio?: number,
	): BoxData[];

	static setGeometry(geometry: GeometryData, idk?: IThingy): BufferGeometry;

	static getGeometryData(h: Model, p: Block, g?: number, y?: boolean): GeometryData;

	generateGeometry(
		h: string,
		p: unknown,
		g: number[],
		y: number[],
		x: number[],
		S: number[],
		b: number,
		v?: boolean,
		w?: number,
		k?: number,
		E?: number,
	): void;

	generateWorldGeometry(
		h: string,
		p: unknown,
		g: number[],
		y: number[],
		x: number[],
		S: number[],
		b: number[],
		v: number[],
		w: number[],
		k: number,
	): void;

	getRatioAndMaterial(h: string | undefined): {
		ratio: number;
		material: unknown;
	};

	initMesh(h: string, p?: boolean): Mesh;

	initGeometry(h: string): BufferGeometry;

	initMeshWithGeometries(h: BufferGeometry[], p?: boolean): Mesh;
}
