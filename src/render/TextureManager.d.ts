import {
	TextureLoader,
	Texture,
	CanvasTexture,
	MeshLambertMaterial,
	Vector4,
	Vector3,
	Sprite,
	SpriteMaterial,
} from "three";
import { FontLoader, Font } from "../game/hud";
import { SkinManager } from "../game/skinManager";
import { GLTFManager } from "./GLTFManager";
import { ReflectionBuffer } from "./ReflectionBuffer";

export interface GIState {
	texture: Texture | null;
	originX: number;
	originY: number;
	originZ: number;
	invExtent: number;
}

export interface SetGIOptions {
	texture: Texture;
	originX: number;
	originY: number;
	originZ: number;
	invExtent: number;
	strength: number;
	voxelSize: number;
	coneCount: number;
	coneDistance: number;
}

export interface DynamicParticleTextureRequest {
	name: string;
	url: string;
}

export declare class TextureManager {
	loader: TextureLoader;
	fontLoader: FontLoader;
	miniblox_font: Font;
	old_miniblox_font: Font;
	atlas: HTMLImageElement;
	atlasUrl: string;
	atlasScale: number;
	atlasWidth: number;
	atlasHeight: number;
	atlasFellBackToDefault: boolean;
	readonly atlasTilePx: number;

	materialWorld: MeshLambertMaterial;
	/** **IMPORTANT**: USE DUMPS */
	materialTransparentWorld: MeshLambertMaterial;
	materialFluidWorld: MeshLambertMaterial;
	material: MeshLambertMaterial;
	materialEnchanted: MeshLambertMaterial;
	materialTransparent: MeshLambertMaterial;
	entityMaterials: { [id: string]: MeshLambertMaterial };
	entityUVSize: { [id: string]: { width: number; height: number } };
	elytraMaterial: MeshLambertMaterial;
	elytraMaterialPromise: Promise<MeshLambertMaterial> | null;
	spritesheetPixels: Uint8ClampedArray;
	particles: { [name: string]: Texture };
	particleAtlas: Texture<HTMLCanvasElement> | null;
	particleAtlasRects: Map<Texture<HTMLImageElement>, Vector4>;
	particleAtlasEpoch: number;
	dynamicParticleTextures: { [name: string]: Texture };
	glintTexture: Texture<HTMLImageElement>;
	skinManager: SkinManager;
	/** **IMPORTANT: USE DUMPS** */
	gltfManager: GLTFManager;
	reflectionBuffer: ReflectionBuffer | null;

	setReflectionBuffer(buffer: ReflectionBuffer): void;

	worldAssetsPromise: Promise<void> | null;
	menuTexturesLoaded: boolean;
	menuTexturesPromise: Promise<void> | null;
	worldAssetsLoaded: boolean;

	/** **IMPORTANT: USE DUMPS** */
	loadMenuTextures(initialAttempt?: boolean): Promise<void>;
	ensureWorldAssets(): Promise<void>;
	ensureMenuTextures(): Promise<void>;
	preloadWorldAssetsWhenIdle(): void;
	loadWorldAssets(): Promise<void>;
	/** **IMPORTANT: USE DUMPS** */
	loadTextures(initialAttempt?: boolean): Promise<void>;
	buildParticleAtlas(): void;
	setDynamicParticleTextures(requests: DynamicParticleTextureRequest[]): Promise<void>;
	getElytraMaterial(): Promise<MeshLambertMaterial | undefined>;
	loadFonts(): Promise<void>;
	loadAtlasTexture(): Promise<Texture<HTMLImageElement>>;
	createAtlasTexture(url: string): Promise<Texture<HTMLImageElement>>;

	private bundledAtlasImage: Promise<HTMLImageElement> | null;
	getBundledAtlasImage(): Promise<HTMLImageElement>;
	patchEngineSprites(texture: Texture<HTMLImageElement>, url: string): Promise<void>;
	injectDynamicSprites(texture: Texture<HTMLImageElement>, options?: unknown): Promise<boolean>;
	refreshDynamicSprites(options?: unknown): Promise<boolean>;
	updateAtlasMetrics(image: HTMLImageElement): void;
	extractSpritesheetPixels(image: HTMLImageElement, width: number, height: number): void;
	loadSpritesheet(): Promise<void>;
	swapAtlas(texture: Texture<HTMLImageElement>): void;
	loadSprite(path: string): Sprite;
	fixedUpdate(): void;

	sunDirection: Vector3;
	updateSunDirection(direction: Vector3): void;

	sunLight: number;
	ambientLight: number;
	heldLightCount: number;
	heldLightLevels: Float32Array;
	heldLightPositions: Vector3[];
	private _heldLightDistSq: Float32Array;
	private _heldLightCamX: number;
	private _heldLightCamY: number;
	private _heldLightCamZ: number;

	heldLightBrightnessAt(x: number, y: number, z: number): number;
	updateSunLight(level: number): void;
	updateAmbientLight(level: number): void;
	beginHeldLights(camX: number, camY: number, camZ: number): void;
	addHeldLight(x: number, y: number, z: number, level: number): void;
	commitHeldLights(): void;

	giState: GIState | null;
	private _giStateObj: GIState;
	setGI(options: SetGIOptions): void;
	setGIEnabled(enabled: boolean): void;
	setGIDebug(enabled: boolean): void;
	setHasDamage(hasDamage: boolean): void;
}
