import { TextureLoader, Texture, MeshPhongMaterial, MeshLambertMaterial } from "three";
import { ItemStack } from "../items";

export interface CapeRegion {
    x: number;
    y: number;
    w: number;
    h: number;
}
export interface CapeRegions {
    cape: CapeRegion;
    elytra: CapeRegion | null;
}
export interface EntityDefinition {
    folder: string;
    name: string;
    mob?: boolean;
    ratioBase?: number;
}
export interface ArmorLayerPaths {
    layer1?: string;
    layer2?: string;
}
/** Also used for capes and armor */
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
    /** cached cape/elytra bounding boxes, computed once by detectCapeRegions */
    capeRegions?: CapeRegions;
}
export declare class SkinManager {
    private static glintTexture;
    static getGlintTexture(): Texture;
    loader: TextureLoader;
    skins: {
        [id: string]: Skin;
    };
    armor: {
        [id: string]: Skin;
    };
    armorVersion: number;
    failedTextures: Set<`skin:${string}` | `cape:${string}`>;
    capes: {
        [id: string]: Skin;
    };
    capeElytraMats: {
        [id: string]: MeshLambertMaterial | null;
    };
    armorOverrides: Set<string>;
    entityOverrides: Set<string>;
    /** **IMPORTANT: USE DUMPS** */
    loadStandardSkins(): Promise<void[]>;
    /** **IMPORTANT: USE DUMPS** */
    loadMobsAndEntities(): Promise<void[]>;
    /** **IMPORTANT: USE DUMPS** */
    loadTextures(): Promise<void>;
    hasSkin(id: string): boolean;
    /** **IMPORTANT: USE DUMPS** */
    hasCape(id: string): boolean;
    getSkin(id: string): Skin;
    /** **IMPORTANT: USE DUMPS** */
    getCape(id: string): Skin | undefined;
    /** **IMPORTANT: USE DUMPS** */
    getArmor(stack: ItemStack): Skin | undefined;
    isEntityOverridden(id: string): boolean;
    /** **IMPORTANT: USE DUMPS** */
    loadMob(folder: string): Promise<void>;
    /** **IMPORTANT: USE DUMPS** */
    loadEntityTexture(folder: string, name: string, ratioBase?: number): Promise<void>;
    downloadSkin(id: string): Promise<void>;
    loadSkinFromUrl(id: string, url: string, ratioBase?: number): Promise<void>;
    static disposeSkinTexture(skin: Skin): void;
    clearSessionSkins(): void;
    invalidateSkin(id: string): void;
    /** **IMPORTANT: USE DUMPS** */
    downloadCape(id: string): Promise<void>;
    loadCapeFromUrl(id: string, url: string): Promise<void>;
    /**
     * Upscales cape textures smaller than 64px wide (and non-square) onto a nearest-neighbor-scaled canvas so region detection has enough resolution to work with.
     * **IMPORTANT: USE DUMPS**
     */
    static normalizeCapeTexture(texture: Texture<HTMLImageElement>): Texture<HTMLImageElement>;
    invalidateCape(id: string): void;
    /** **IMPORTANT: USE DUMPS** */
    getElytraMaterial(id: string): MeshLambertMaterial | null;
    /** **IMPORTANT: USE DUMPS** */
    static extractElytraTexture(skin: Skin, region: CapeRegion): Texture | null;
    hasElytraTexture(id: string): boolean;
    /**
     * Scans the cape's alpha channel column-by-column for vertical bands of opaque pixels. If there are 2+ bands and the last one starts past the halfway mark, treats it as a separate elytra region; otherwise everything is one cape region. Result is cached on skin.capeRegions.
     * **IMPORTANT: USE DUMPS**
     */
    static detectCapeRegions(skin: Skin): CapeRegions;
    /**
     * Cheap elytra-presence check for "compact" (square, packed-atlas) capes: just tests a fixed pixel window scaled by skin.ratio, instead of running full band detection.
     * **IMPORTANT: USE DUMPS**
     */
    static hasCompactElytraPixels(skin: Skin): boolean;
    /** **IMPORTANT: USE DUMPS** */
    getArmorTexturePath(material: string, layer: 1 | 2): string;
    /** **IMPORTANT: USE DUMPS** */
    loadArmor(id: string, layer1Path?: string, layer2Path?: string): Promise<void>;
    /** **IMPORTANT: USE DUMPS** */
    setArmorOverrides(overrides: Map<string, ArmorLayerPaths>): Promise<void>;
    /** **IMPORTANT: USE DUMPS** */
    getEntityTexturePath(def: EntityDefinition): string;
    /** **IMPORTANT: USE DUMPS** */
    setEntityOverrides(overrides: Map<string, string>): Promise<void>;
    /** **IMPORTANT: USE DUMPS** */
    applyEntityOverride(def: EntityDefinition, url: string): Promise<void>;
    /**
     * Redraws an already-materialized skin's existing canvas texture in place instead of rebuilding the material,
     * when the skin already has a canvas-backed atlasMat to reuse. Returns false (caller falls back to a fresh atlas) if there's nothing to update in place.
     * **IMPORTANT: USE DUMPS**
     */
    static tryUpdateSkinTexture(skin: Skin, image: HTMLImageElement, ratioBase: number): boolean;
    /** **IMPORTANT: USE DUMPS** */
    static createAtlasMat(skin: Skin): void;
    /** **IMPORTANT: USE DUMPS** */
    static createAtlasMat2(skin: Skin): void;
    /** **IMPORTANT: USE DUMPS** */
    static createMat(skin: Skin, sourceX: number, sourceY: number, width: number, height: number, rotateAndRatio?: {
        rotate?: boolean;
        ratio?: number;
    }, options?: {
        leggings?: boolean;
    }): MeshLambertMaterial;
    fixedUpdate(): void;
}
