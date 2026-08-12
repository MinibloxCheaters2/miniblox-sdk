import type {
	AxesHelper,
	Fog as TFog,
	Group,
	PerspectiveCamera,
	Scene,
	Vector3,
	Color,
	ShaderMaterial,
	Mesh,
	PlaneGeometry,
	Sprite,
	AmbientLight,
	DirectionalLight,
	Object3D,
	Points,
	BufferGeometry,
	PointsMaterial,
} from "three";
import type { Game } from "./game";
import type { Single } from "../utils/Single";
import type { EffectRenderer } from "../effects";
import type { Weather } from "./weather";

export declare class Fog {
	gameScene: GameScene;
	fog: TFog;
	constructor(gameScene: GameScene);
	update();
}

export declare class Sun {
	readonly gameScene: GameScene;
	sun: Sprite;
	moon: Sprite;
	daySpeed: number;
	sunDist: number;
	offset: Vector3;
	ambi: AmbientLight;
	sunlight: DirectionalLight;
	moonlight: DirectionalLight;
	shadowTarget: Object3D;
	shadowCenter: Vector3;
	shadowCenterReady: boolean;
	shadowTexel: number;
	ambiIntensity: Single;
	sunIntensity: Single;
	moonIntensity: Single;
	constructor(gameScene: GameScene);
	applyShadowQuality(): void;
	update(): void;
}

export declare class Sky {
	gameScene: GameScene;
	sun: Sun;
	color: Color;
	atmosphere: Mesh<SphereGeometry, ShaderMaterial>;
	uniforms: {
		horizonColor: {
			value: Color;
		};
		zenithColor: {
			value: Color;
		};
		sunGlowColor: {
			value: Color;
		};
		sunDirection: {
			value: Vector3;
		};
		dayFactor: {
			value: number;
		};
		horizonDip: {
			value: number;
		};
	};
	constructor(gameScene: GameScene, sun: Sun);
	update(): void;
	/**
	 * @param percentage `Math.abs(this.sun.offset.y) ** .3 / this.sun.sunDist ** .3`. clamped to 0..1
	 */
	updateAtmosphere(percentage: number): void;
}

// ts was genuinely the easiest thing to make typings for.
export declare class Clouds {
	gameScene: GameScene;
	mesh: Mesh<PlaneGeometry, ShaderMaterial>;
	material: ShaderMaterial;
	mode: string;
	_camPos: Vector3;
	_sunDir: Vector3;
	_dayColor: Color;
	_nightColor: Color;
	_dayShadow: Color;
	_nightShadow: Color;
	_sunsetColor: Color;
	_sunsetShadow: Color;
	_sunGlowColor: Color;
	_duskColor: Color;
	_duskShadow: Color;
	_moonGlowColor: Color;
	constructor(gameScene: GameScene);
	update(): void;
}

export declare class Stars {
	gameScene: GameScene;
	sun: Sun;
	stars: Points<BufferGeometry, PointsMaterial>;
	constructor(gameScene: GameScene, sun: Sun);
	update(): void;
}

export class GameScene {
	readonly game: Game;
	readonly camera: PerspectiveCamera;
	readonly scene: Scene;
	readonly axesHelper: AxesHelper;
	readonly entityMeshes: Group;
	readonly chunkMeshes: Group;
	readonly ambientMeshes: Group;
	readonly leaderboardMeshes: Group;
	readonly sun: Sun;
	readonly stars: Stars;
	readonly sky: Sky;
	readonly fog: Fog;
	readonly weather: Weather;
	static tick: Single;
	readonly clouds: Clouds;
	// TODO: bother making the types for ts
	// (see the "game scene thing (will finish never).txt" file)
	// no features that I'd really care about would require this, so...
	tileEntityRenderer: TileEntityRenderer;
	blockDamageRenderer: BlockDamageRenderer;
	effectRenderer: EffectRenderer;
	debugHitboxRenderer: DebugHitboxRenderer;
	constructor(game: Game);
	updateCameraZoom(): void;
	update(): void;
	clear(): void;
}
