import type { AxesHelper, Group, PerspectiveCamera, Scene } from "three";
import type { Game } from "./game";

export class GameScene {
	game: Game;
	readonly camera: PerspectiveCamera = new PerspectiveCamera(
		85,
		window.innerWidth / window.innerHeight,
		0.01,
		1e7,
	);
	readonly scene: Scene = new Scene();
	readonly axesHelper: AxesHelper = new AxesHelper(0.01);
	readonly entityMeshes: Group = new Group();
	readonly chunkMeshes: Group = new Group();
	readonly ambientMeshes: Group = new Group();
	readonly leaderboardMeshes: Group = new Group();
	readonly sun: Sun = new Sun(this);
	readonly stars: Stars = new Stars(this, this.sun);
	readonly sky: Sky = new Sky(this, this.sun);
	readonly fog: Fog = new Fog(this);
	readonly clouds: Clouds = new Clouds(this);
	tileEntityRenderer: TileEntityRenderer;
	effectRenderer: EffectRenderer;
	constructor(game: Game);
	updateCameraZoom(): void;
	update(): void;
	clear(): void;
}
