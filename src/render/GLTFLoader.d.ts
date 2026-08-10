/**
 * Why does `@types/three` not have typings for this?
 * @see https://threejs.org/docs/#GLTFLoader
 * @module
 */
import { AnimationClip, Camera, Group, Loader, LoadingManager } from "three";

/**
 * Loader result of `GLTFLoader`.
 */
export interface LoadObject {
	animations: Array<AnimationClip>;
	asset: object;
	cameras: Array<Camera>;
	parser: GLTFParser;
	scene: Group;
	scenes: Array<Group>;
	userData: object;
}
/**
 * A loader for the glTF 2.0 format.
 *
 * [glTF](https://www.khronos.org/gltf/) (GL Transmission Format) is an [open format specification]{@link https://github.com/KhronosGroup/glTF/tree/main/specification/2.0)
 * for efficient delivery and loading of 3D content. Assets may be provided either in JSON (.gltf) or binary (.glb)
 * format. External files store textures (.jpg, .png) and additional binary data (.bin). A glTF asset may deliver
 * one or more scenes, including meshes, materials, textures, skins, skeletons, morph targets, animations, lights,
 * and/or cameras.
 *
 * `GLTFLoader` uses {@link ImageBitmapLoader} whenever possible. Be advised that image bitmaps are not
 * automatically GC-collected when they are no longer referenced, and they require special handling during
 * the disposal process.
 *
 * `GLTFLoader` supports the following glTF 2.0 extensions:
 * - KHR_draco_mesh_compression
 * - KHR_lights_punctual
 * - KHR_materials_anisotropy
 * - KHR_materials_clearcoat
 * - KHR_materials_dispersion
 * - KHR_materials_emissive_strength
 * - KHR_materials_ior
 * - KHR_materials_specular
 * - KHR_materials_transmission
 * - KHR_materials_iridescence
 * - KHR_materials_unlit
 * - KHR_materials_volume
 * - KHR_mesh_quantization
 * - KHR_meshopt_compression
 * - KHR_texture_basisu
 * - KHR_texture_transform
 * - EXT_materials_bump
 * - EXT_meshopt_compression
 * - EXT_mesh_gpu_instancing
 * - EXT_texture_avif
 * - EXT_texture_webp
 *
 * The following glTF 2.0 extensions are supported by separately registered plugins:
 * - KHR_gaussian_splatting
 * - [KHR_materials_variants](https://github.com/takahirox/three-gltf-extensions)
 * - [MSFT_texture_dds](https://github.com/takahirox/three-gltf-extensions)
 * - [KHR_animation_pointer](https://github.com/needle-tools/three-animation-pointer)
 * - [NEEDLE_progressive](https://github.com/needle-tools/gltf-progressive)
 *
 * ```js
 * const loader = new GLTFLoader();
 *
 * // Optional: Provide a DRACOLoader instance to decode compressed mesh data
 * const dracoLoader = new DRACOLoader();
 * dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
 * loader.setDRACOLoader( dracoLoader );
 *
 * const gltf = await loader.loadAsync( 'models/gltf/duck/duck.gltf' );
 * scene.add( gltf.scene );
 * ```
 *
 * @augments Loader
 * @three_import import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
 */
export declare class GLTFLoader extends Loader {
	dracoLoader: any;
	ktx2Loader: any;
	meshoptDecoder: any;
	/**
	 * Constructs a new glTF loader.
	 *
	 * @param {LoadingManager} [manager] - The loading manager.
	 */
	constructor(manager?: LoadingManager);
	/**
	 * Starts loading from the given URL and passes the loaded glTF asset
	 * to the `onLoad()` callback.
	 *
	 * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
	 * @param {function(LoadObject)} onLoad - Executed when the loading process has been finished.
	 * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
	 * @param {onErrorCallback} onError - Executed when errors occur.
	 */
	load(
		url: string,
		onLoad: (data: LoadObject) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (err: unknown) => void,
	): void;
	/**
	 * Sets the given Draco loader to this loader. Required for decoding assets
	 * compressed with the `KHR_draco_mesh_compression` extension.
	 *
	 * @param {DRACOLoader} dracoLoader - The Draco loader to set.
	 * @return {GLTFLoader} A reference to this loader.
	 */
	setDRACOLoader(dracoLoader: DRACOLoader): GLTFLoader;
	/**
	 * Sets the given KTX2 loader to this loader. Required for loading KTX2
	 * compressed textures.
	 *
	 * @param {KTX2Loader} ktx2Loader - The KTX2 loader to set.
	 * @return {GLTFLoader} A reference to this loader.
	 */
	setKTX2Loader(ktx2Loader: KTX2Loader): GLTFLoader;
	/**
	 * Sets the given meshopt decoder. Required for decoding assets
	 * compressed with the `EXT_meshopt_compression` extension.
	 *
	 * @param {Object} meshoptDecoder - The meshopt decoder to set.
	 * @return {GLTFLoader} A reference to this loader.
	 */
	setMeshoptDecoder(meshoptDecoder: object): GLTFLoader;
	/**
	 * Registers a plugin callback. This API is internally used to implement the various
	 * glTF extensions but can also used by third-party code to add additional logic
	 * to the loader.
	 *
	 * @param {function(parser:GLTFParser)} callback - The callback function to register.
	 * @return {GLTFLoader} A reference to this loader.
	 */
	register(callback: (parser: GLTFParser) => void): GLTFLoader;
	/**
	 * Unregisters a plugin callback.
	 *
	 * @param callback - The callback function to unregister.
	 * @return {GLTFLoader} A reference to this loader.
	 */
	unregister(callback: (parser: GLTFParser) => void): GLTFLoader;
	/**
	 * Parses the given glTF data and returns the resulting group.
	 *
	 * @param {string|ArrayBuffer} data - The raw glTF data.
	 * @param {string} path - The URL base path.
	 * @param {function(LoadObject)} onLoad - Executed when the loading process has been finished.
	 * @param onError - Executed when errors occur.
	 */
	parse(
		data: string | ArrayBuffer,
		path: string,
		onLoad: (obj: LoadObject) => void,
		onError: (err: unknown) => void,
	): void;
	/**
	 * Async version of {@link GLTFLoader#parse}.
	 *
	 * @async
	 * @param {string|ArrayBuffer} data - The raw glTF data.
	 * @param {string} path - The URL base path.
	 * @return {Promise<LoadObject>} A Promise that resolves with the loaded glTF when the parsing has been finished.
	 */
	parseAsync(data: string | ArrayBuffer, path: string): Promise<LoadObject>;
}
