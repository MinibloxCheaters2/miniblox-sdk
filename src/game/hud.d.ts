import type { Group, Loader, Mesh, Quaternion, Shape, Texture, TextureLoader, Vector3 } from "three";
import type { Block } from "../blocks/Block";
import type { SkinManager } from "./skinManager";

export interface AnimationKeyframe {
	duration: number;
	position: Vector3;
	rotation: Quaternion;
}

export declare class AnimationLerp {
	private totalDuration: number;
	private keyframes;
	private target;
	private cumulativeTimes;
	constructor(keyframes: AnimationKeyframe[], target: Object3D);
	update(deltaTime: number): void;
}

export declare class Hud3D extends Group {
	item: Group;
	fireGroup: Group;
	suffocationGroup: Mesh;
	lastSuffocationBlock: Block | null;
	mesh: Mesh;
	tesr: Mesh;
	rightArm: Mesh;
	leftArm: Mesh;
	lastPunch: number;
	rightArmPunch: AnimationLerp;
	itemPunch: AnimationLerp;
	eat: AnimationLerp;
	sword: AnimationLerp;
	swordVariation: number;
	shovel: AnimationLerp;
	axe: AnimationLerp;
	cancelAnimation: boolean;
	currentActiveItem: ItemStack | null;
	prevCharge: number;
	swingLength: {
		value: number;
	};
	constructor();
	getSpriteMesh(spriteName: string): Mesh;
	/**
	 * @param name the name of the sprite (i.e. `fire_0`)
	 * @param mesh the mesh
	 * @param [idx=0] index. `Math.floor(Date.now() / 25 % 32)` for the fire animation
	 */
	updateSpriteUV(name: string, mesh: Mesh, idx?: number): void;
	initFireMesh(): void;
	initSuffocationMesh(): void;
	updateFireGraphics(): void;
	updateSuffocationGraphics(): void;
	swingArm(): void;
	updateArmAnimation(): void;
	/** it's only `true` when `ClientEntityPlayer`#`init` is called. otherwise it's not passed. */
	update(clientEntityPlayerInit?: boolean): void;
}

export interface FontData {
	glyphs: { [k: string]: Glyph }
	familyName: string
	ascender: number
	descender: number
	underlinePosition: number
	underlineThickness: number
	boundingBox: BoundingBox
	resolution: number
	original_font_information: OriginalFontInformation
	cssFontWeight: string
	cssFontStyle: string
}

export interface Glyph {
	ha: number
	x_min: number
	x_max: number
	o: string
}

export interface BoundingBox {
	yMin: number
	xMin: number
	yMax: number
	xMax: number
}

export interface OriginalFontInformation {
	format: number
	copyright: string
	fontFamily: string
	fontSubfamily: string
	uniqueID: string
	fullName: string
	version: string
	postScriptName: string
	manufacturer: string
	designer: string
	licence: string
}

export declare class Font {
	isFont: true;
	type: "Font";
	data: FontData;
	constructor(data: FontData);
	/**
	 * @param text text to generate shapes for
	 * @param size size of the text, default `100`
	 * @param direction left->right or right->left, default `ltr`
	 */
	generateShapes(text: string, size?: number, direction?: "ltr" | "rtl"): Shape[];
}

export declare class FontLoader extends Loader<Font> {
	load(
		url: string,
		callback: (font: Font) => void,
		onProgress: (event: ProgressEvent<EventTarget>) => void,
		onError: (err: unknown) => void,
	): void;
	parse(data): Font;
}
