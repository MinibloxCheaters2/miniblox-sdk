import {
	WebGLRenderTarget,
	WebGLRenderer,
	DepthTexture,
	Vector2,
	Matrix4,
	Scene,
	OrthographicCamera,
	ShaderMaterial,
	Object3D,
	Material,
} from "three";

export interface ReflectionBufferUniforms {
	tSceneColor: { value: Texture | null };
	tSceneDepth: { value: Texture | null };
	tLinearViewZ: { value: Texture | null };
	reflectionNear: { value: number };
	reflectionFar: { value: number };
	reflectionResolution: { value: Vector2 };
	reflectionViewProjectionMatrix: { value: Matrix4 };
	reflectionViewMatrix: { value: Matrix4 };
	reflectionViewMatrixInverse: { value: Matrix4 };
	reflectionProjectionMatrixInverse: { value: Matrix4 };
	/** 0 or 1, used as a shader bool */
	reflectionEnabled: { value: 0 | 1 };
}

export declare class ReflectionBuffer {
	readonly target: WebGLRenderTarget;
	readonly depthTexture: DepthTexture;
	readonly linearViewZTarget: WebGLRenderTarget;
	readonly uniforms: ReflectionBufferUniforms;

	private _projInverse: Matrix4;
	private _fluidVisibility: Map<Object3D, boolean>;
	private _ambientWasVisible: boolean;
	private _entityWasVisible: boolean;
	private _linearDepthScene: Scene;
	private _linearDepthCamera: OrthographicCamera;
	private _linearDepthMaterial: ShaderMaterial;

	constructor();

	/** Upgrades the depth texture to a higher-precision float type when the renderer supports WebGL2. */
	configureDepthPrecision(renderer: WebGLRenderer): void;

	resize(width: number, height: number): void;

	/**
	 * Renders `scene` from `reflectionCamera` into this buffer's render target, hiding fluid/water
	 * meshes (matched by `fluidMaterial`) and optionally the ambient and entity mesh groups first
	 * so they don't reflect themselves. Also runs a fullscreen linear-depth pass afterward and
	 * restores the renderer's previous target/state and mesh visibility when done.
	 */
	capture(
		renderer: WebGLRenderer,
		scene: Scene,
		reflectionCamera: Camera & { near: number; far: number },
		meshGroup: Object3D,
		fluidMaterial: ShaderMaterial | Material,
		ambientMeshes?: Object3D,
		entityMeshes?: Object3D,
	): void;

	/** Toggles visibility of fluid meshes within `meshGroup` matching `fluidMaterial`, caching prior visibility so it can be restored. */
	private setFluidMeshesVisible(
		meshGroup: Object3D,
		fluidMaterial: ShaderMaterial | Material,
		visible: boolean,
	): void;
}
