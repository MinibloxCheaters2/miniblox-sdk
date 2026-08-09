import { TextureLoader, Texture, MeshPhongMaterial, MeshLambertMaterial } from "three";
import { ItemStack } from "../items";

/** Also used for capes and armor. */
export interface Skin {
	atlasMat2Enchant?: MeshPhongMaterial;
	atlasMat2?: MeshPhongMaterial;
	atlas2?: Texture<HTMLImageElement>;
	atlasMatEnchant?: MeshPhongMaterial;
	atlasMat?: MeshPhongMaterial;
	compact?: boolean;
	skinny?: boolean;
	atlas?: Texture<HTMLImageElement>;
	id: string;
	/** `atlas.image.width / 64` */
	ratio: number;
	pixels?: Uint8ClampedArray;
	isArmor?: boolean;
}
export declare class SkinManager {
	loader: TextureLoader;
	skins: {
		[name: string]: Skin;
	};
	armor: {
		[name: string]: Skin;
	};
	/** all the textures that failed downloading. used to make it not re-download the skin. */
	failedTextures: Set<`skin:${string}` | `cape:${string}`>;
	capes: {
		[name: string]: Skin;
	};
	loadTextures(): Promise<void[]>;
	hasSkin(id: string): boolean;
	hasCape(id: string): boolean;
	getSkin(id: string): Skin;
	getCape(name: string): Skin;
	getArmor(stack: ItemStack): Skin;
	loadMob(id: string): Promise<void>;
	loadEntityTexture(name: string, id: string): Promise<void>;
	downloadSkin(id: string): Promise<void>;
	loadSkinFromUrl(id: string, url: string): Promise<void>;
	invalidateSkin(id: string): void;
	downloadCape(id: string): Promise<void>;
	loadArmor(id: string): Promise<void>;
	static createAtlasMat(skin: Skin): void;
	/** why does ts exist? */
	static createAtlasMat2(skin: Skin): void;
	/**
	 *
	 * @param skin the skin to create the mat for
	 * @param sX source X (used in canvas.drawImage)
	 * @param sY source Y (used in canvas.drawImage)
	 * @param w canvas width
	 * @param h canvas height
	 * @param rotateAndRatio if `rotate` is defined, then `ratio` is also required.
	 * @param options literally just used for if the skin is for leggings.
	 */
	static createMat(skin: Skin, sX: number, sY: number, w: number, h: number, rotateAndRatio?: {
		rotate?: boolean;
		ratio?: number;
	}, options?: {
		leggings?: boolean;
	}): MeshLambertMaterial;
	fixedUpdate(): void;
}
