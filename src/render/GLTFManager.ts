import type { Group } from "three";
import type { GLTFLoader } from "./GLTFLoader";

export declare class GLTFManager {
	loader: GLTFLoader;
	models: {
		[name: string]: Group;
	};
	constructor();
	/** **IMPORTANT: USE DUMPS** */
	loadModels(): Promise<void>;
	/** **IMPORTANT: USE DUMPS** */
	loadHat(name: string): Promise<Group>;
	/** **IMPORTANT: USE DUMPS** */
	loadGLTF(t: string, name: string): Promise<Group>;
	getModel(name: string): Promise<Group | null>;
}
