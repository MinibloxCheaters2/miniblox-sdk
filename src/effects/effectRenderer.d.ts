import type { ClientWorld, World } from "../world";

export declare class EntityFX extends Entity {
	sprite: Sprite;
	mesh_: Mesh;
	particleTextureIndexX: number;
	particleTextureIndexY: number;
	particleTextureJitterX: number;
	particleTextureJitterY: number;
	particleAge: number;
	particleMaxAge: number;
	particleScale: number;
	particleGravity: number;
	particleRed: number;
	particleGreen: number;
	particleBlue: number;
	particleAlpha: number;
	constructor(
		world: World,
		xP: number,
		yP: number,
		zP: number,
		bl: boolean,
		initialYM?: number,
		initialZM?: number,
	);
	multiplyVelocity(multiplier: number): this;
	multipleParticleScaleBy(v: number): this;
	setRBGColorF(r: number, g: number, b: number): void;
	getRedColorF(): this["particleRed"];
	getGreenColorF(): this["particleGreen"];
	getBlueColorF(): this["particleBlue"];
	getAlpha(): this["particleAlpha"];
	canTriggerWalking(): boolean;
	entityInit(): void;
	update(): void;
	renderParticle(scene: GameScene, entity: Entity, g: number): void;
	remove(obj: Object3D): void;
	getFXLayer(): number;
	setParticleTextureIndex(idx: number): void;
	nextTextureIndexX(): void;
	canAttackWithItem(): boolean;
}
export declare class EnumParticleTypes {
	static readonly PARTICLES: Map<number, EnumParticleTypes>;
	static readonly PARTICLE_NAMES: string[];
	static readonly EXPLOSION_NORMAL: EnumParticleTypes;
	static readonly EXPLOSION_LARGE: EnumParticleTypes;
	static readonly EXPLOSION_HUGE: EnumParticleTypes;
	static readonly FIREWORKS_SPARK: EnumParticleTypes;
	static readonly WATER_BUBBLE: EnumParticleTypes;
	static readonly WATER_SPLASH: EnumParticleTypes;
	static readonly WATER_WAKE: EnumParticleTypes;
	static readonly SUSPENDED: EnumParticleTypes;
	static readonly SUSPENDED_DEPTH: EnumParticleTypes;
	static readonly CRIT: EnumParticleTypes;
	static readonly CRIT_MAGIC: EnumParticleTypes;
	static readonly SMOKE_NORMAL: EnumParticleTypes;
	static readonly SMOKE_LARGE: EnumParticleTypes;
	static readonly SPELL: EnumParticleTypes;
	static readonly SPELL_INSTANT: EnumParticleTypes;
	static readonly SPELL_MOB: EnumParticleTypes;
	static readonly SPELL_MOB_AMBIENT: EnumParticleTypes;
	static readonly SPELL_WITCH: EnumParticleTypes;
	static readonly DRIP_WATER: EnumParticleTypes;
	static readonly DRIP_LAVA: EnumParticleTypes;
	static readonly VILLAGER_ANGRY: EnumParticleTypes;
	static readonly VILLAGER_HAPPY: EnumParticleTypes;
	static readonly TOWN_AURA: EnumParticleTypes;
	static readonly NOTE: EnumParticleTypes;
	static readonly PORTAL: EnumParticleTypes;
	static readonly ENCHANTMENT_TABLE: EnumParticleTypes;
	static readonly FLAME: EnumParticleTypes;
	static readonly LAVA: EnumParticleTypes;
	static readonly FOOTSTEP: EnumParticleTypes;
	static readonly CLOUD: EnumParticleTypes;
	static readonly REDSTONE: EnumParticleTypes;
	static readonly SNOWBALL: EnumParticleTypes;
	static readonly SNOW_SHOVEL: EnumParticleTypes;
	static readonly SLIME: EnumParticleTypes;
	static readonly HEART: EnumParticleTypes;
	static readonly BARRIER: EnumParticleTypes;
	static readonly ITEM_CRACK: EnumParticleTypes;
	static readonly BLOCK_CRACK: EnumParticleTypes;
	static readonly BLOCK_DUST: EnumParticleTypes;
	static readonly WATER_DROP: EnumParticleTypes;
	static readonly ITEM_TAKE: EnumParticleTypes;
	static readonly MOB_APPEARANCE: EnumParticleTypes;
	static readonly COLOR: EnumParticleTypes;
	particleName: string;
	particleID: number;
	shouldIgnoreRange: boolean;
	argumentCount: number;
	constructor(name: string, id: number, ignoreRange: boolean, argCount?: number);
	static getParticleNames(): (typeof EnumParticleTypes)["PARTICLE_NAMES"];
	getParticleName(): this["particleName"];
	getParticleID(): this["particleID"];
	getArgumentCount(): this["argumentCount"];
	getShouldIgnoreRange(): this["shouldIgnoreRange"];
	hasArguments(): boolean;
	static getParticleFromId(id: number): EnumParticleTypes | undefined;
}

export declare class EffectRenderer {
	scene: GameScene;
	isGuiPlayerRenderer: boolean;
	fxLayers: EntityFX[][][];
	particleEmitters: EntityParticleEmitter[];
	particleTypes: Map<number, EntityFXFactory>;
	constructor(scene: GameScene, isGuiPlayerRenderer?: boolean);
	registerVanillaParticles(): void;
	registerParticle(id: number, h: EntityFXFactory): void;
	emitParticleAtEntity(world: World, entity: Entity, particleType: EnumParticleTypes): void;
	spawnEffectParticle(
		world: ClientWorld,
		particle: EnumParticleTypes,
		xOff: number,
		yOff: number,
		zOff: number,
		idk1: unknown,
		idk2: unknown,
		idk3: unknown,
		pos: Vector3,
		...w: unknown[]
	): void;
	addEffect(e: EntityFX): void;
	updateEffects(): void;
	updateEffectLayer(layer: number): void;
	updateEffectAlphaLayer(alphaLayer: EntityFX[]): void;
	/** calls entity.update() within a try clause */
	tickParticle(entity: EntityFX): void;
	renderParticles(e: Entity, n?: number): void;
	addBlockDestroyEffects(pos: Vector3, state: BlockState, world: World): void;
	addBlockHitEffects(pos: BlockPos, facing: EnumFacing, world: World): void;
	/**
	 * if the math.random is less than the particle chance setting / 100, or the react location is `/account`.
	 */
	canSpawnParticle(): boolean;
}
