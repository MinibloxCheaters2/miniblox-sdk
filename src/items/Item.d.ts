import type { Vector3 } from "three";
import type { Entity } from "../entities";
import type { EnumFacing } from "../math/facing";
import type { World } from "../world";
import type { Block } from "../blocks";

export class Item {
	name: string;
	displayName: string;
	id: number;
	maxStackSize: number;
	maxDurability: number;
	hasSubtypes: boolean;
	itemModifierUUID: string;

	getDisplayName(): string;
	getTextureName(side?: unknown): string;
	getItemStackLimit(): number;
	getMaxDamage(): number;
	getItemEnchantability(): number;
	getAttackReach(): number;
	getAttackCooldownTicks(): number;
	getMinAttackDistance(): number;
	getStrVsBlock(stack: ItemStack, block: Block): number;
	getItemUseAction(stack: ItemStack): string;
	getMaxItemUseDuration(stack: ItemStack): number;
	getRenderLayers(): unknown;
	getWeaponConfig(): unknown;
	getPotionEffect(): unknown;
	getSubItems(tab: unknown, items: unknown): unknown[];
	getContainerItem(): Item | null;
	heldDisplaySize(): number;

	hasRightClick(): boolean;
	hasEffect(stack: ItemStack): boolean;
	hasEntityInteraction(): boolean;
	isDamageable(): boolean;
	isItemBlock(): boolean;
	isItemTool(): boolean;
	isSpear(): boolean;
	isMace(): boolean;
	isFishingRod(): boolean;
	isWings(): boolean;
	isTotem(): boolean;
	isPotionIngredient(): boolean;
	showInCreativeMenu(): boolean;
	canHarvestBlock(block: Block): boolean;
	equals(other: Item): boolean;

	onItemUse(
		stack: ItemStack,
		player: Entity,
		world: World,
		pos: Vector3,
		side: EnumFacing,
		hitX: number,
		hitY: number,
		hitZ: number,
	): boolean;
	onItemRightClick(stack: ItemStack, world: World, player: Entity): ItemStack;
	onItemUseFinish(stack: ItemStack, world: World, player: Entity): ItemStack;
	onPlayerStoppedUsing(
		stack: ItemStack,
		world: World,
		player: Entity,
		timeLeft: number,
	): void;
	hitEntity(stack: ItemStack, target: Entity, attacker: Entity): boolean;
	onBlockDestroyed(
		stack: ItemStack,
		world: World,
		block: Block,
		pos: Vector3,
		player: Entity,
	): boolean;
	itemInteractionForEntity(
		stack: ItemStack,
		player: Entity,
		target: Entity,
	): boolean;
	repairWith(other: Item): boolean;
	setHasSubtypes(has: boolean): void;
	setMaxDamage(damage: number): void;
	setPotionEffect(effect: string): void;
	setPotionEffect2(effect: string): void;
	setPotionEffectIngredient(effect: string): void;
	setContainerItem(item: Item): void;
	updateItemStackNBT(nbt: unknown): void;
}

export class ItemBlock extends Item {
	block: Block;
	canPlaceBlockOnSide(
		world: World,
		pos: Vector3,
		side: EnumFacing,
		player: Entity,
		stack: ItemStack,
	): boolean;
	onItemUse(
		stack: ItemStack,
		player: Entity,
		world: World,
		pos: Vector3,
		side: EnumFacing,
		hitX: number,
		hitY: number,
		hitZ: number,
	): boolean;
}

export class ItemTool extends Item {
	efficiencyOnProperMaterial: number;
	damageVsEntity: number;
	toolMaterial: unknown;
	effectiveBlocks: Set<Block>;
	getStrVsBlock(stack: ItemStack, block: Block): number;
}

export class ItemPickaxe extends ItemTool {
	ironLevel: unknown[];
	stoneLevel: unknown[];
}

export class ItemShovel extends ItemTool {
	blockConversions: Record<number, unknown>;
}

export class ItemHoe extends Item {
	material: unknown;
	blockConversions: Record<number, unknown>;
	isFull3D(): boolean;
	getMaterialName(): string;
}

export class ItemSword extends Item {
	attackDamage: number;
	material: unknown;
}

export class ItemSpear extends ItemSword {
	jabCooldownTicks: number;
	chargeTireTicks: number;
	chargeDisengageTicks: number;
	chargeStage: number;
}

export class ItemMace extends ItemSword {
	attackDamage: number;
	material: unknown;
}

export class ItemBow extends Item {
	static BOW_TEXTURES: string[];
}

export class ItemFood extends Item {
	healAmount: number;
	saturationModifier: number;
	itemUseDuration: number;

	getHealAmount(stack: ItemStack): number;
	getSaturationModifier(stack: ItemStack): number;
	setAlwaysEdible(): void;
	onFoodEaten(stack: ItemStack, world: World, player: Entity): void;
}

export class ItemAppleGold extends ItemFood {
	alwaysEdible: boolean;
	potionId: number;
	potionDuration: number;
	potionAmplifier: number;
	potionEffectProbability: number;
}

export class ItemSeedFood extends ItemFood {
	crops: unknown;
	soilId: unknown;
}

export class ItemArmor extends Item {
	armorType: number;
	renderIndex: number;
	material: unknown;
	toughness: number;
	/** IMPORTANT: USE DUMPS */
	damageReduceAmount: number;

	getArmorMaterial(): string;
}

export class ItemThrowable extends Item {
	requiresAlive(): boolean;
	getClientSoundPitch(): number;
	spawnProjectile(world: World, player: Entity): unknown;
}

export class ItemBucket extends Item {
	liquid: unknown;
}

export class ItemSpawnEgg extends Item {
	mobName: string;
	primaryColor: number;
	secondaryColor: number;

	spawnMob(world: World, pos: Vector3): unknown;
	registryEntry(): unknown;
}

export interface EnchantmentData {
	id: number;
	lvl: number;
}

export class ItemStack {
	item: Item;
	stackSize: number;
	maxStackSize: number;
	itemDamage: number;

	getItem(): Item;
	getDisplayName(): string;
	getTextureName(): string;
	getEnchantmentTagList(): EnchantmentData[] | null;
	getLore(): string[];
	getChatComponent(): unknown;
	getMetadata(): number;
	getRepairCost(): number;
	getSubCompound(key: string): unknown;
	hasEffect(): boolean;
	isItemEnchanted(): boolean;
	isItemEnchantable(): boolean;
	isItemStackDamageable(): boolean;
	isOnItemFrame(): boolean;
	setItemFrame(frame: unknown): void;
	getMaxStackSize(): number;
	isStackable(): boolean;
	isItemDamaged(): boolean;
	getItemDamage(): number;
	getMaxDamage(): number;
	setItemDamage(damage: number): void;
	attemptDamageItem(amount: number, random: unknown): boolean;
	damageItem(amount: number, entity: Entity): void;
	hitEntity(target: Entity, player: Entity): void;
	onBlockDestroyed(
		world: World,
		block: Block,
		pos: unknown,
		player: Entity,
	): void;
	canHarvestBlock(block: Block): boolean;
	interactWithEntity(player: Entity, target: Entity): boolean;
	addEnchantment(enchantment: unknown): void;
	clearEnchantments(): void;
	setEnchantment(id: number, level: number): void;
	clone(): ItemStack;
	areItemStackTagsEqual(other: ItemStack): boolean;
	areItemStacksEqual(other: ItemStack): boolean;
	isItemEqual(other: ItemStack): boolean;
	isItemStackEqual(other: ItemStack): boolean;
	equals(other: ItemStack): boolean;
	getTooltip(player: Entity, advanced: boolean): string[];
	hasDisplayName(): boolean;
	setDisplayName(name: string): void;
	setStackDisplayName(name: string): ItemStack;
	setLore(lore: string[]): void;
	clearCustomName(): void;
	hasTagCompound(): boolean;
	getTagCompound(): unknown;
	setTagCompound(nbt: unknown): void;
	setTagInfo(key: string, value: unknown): void;
	getAttributeModifiers(): unknown;
	splitStack(by: number): ItemStack;
	setStackSize(size: number): void;
	onCrafting(world: World, player: Entity): void;
	onItemUse(
		stack: ItemStack,
		player: Entity,
		world: World,
		pos: Vector3,
		side: EnumFacing,
		hitX: number,
		hitY: number,
		hitZ: number,
	): boolean;
	onItemUseFinish(stack: ItemStack, world: World, player: Entity): ItemStack;
	onPlayerStoppedUsing(
		stack: ItemStack,
		world: World,
		player: Entity,
		timeLeft: number,
	): void;
	useItemRightClick(world: World, player: Entity): ItemStack;
	toJSON(): unknown;
	toNBT(nbt: unknown): unknown;
	toProto(): unknown;
	writeToNBT(nbt: unknown): unknown;
}

// Global Items registry
export declare const Items: {
	readonly wooden_sword: ItemSword;
	readonly stone_sword: ItemSword;
	readonly iron_sword: ItemSword;
	readonly golden_sword: ItemSword;
	readonly diamond_sword: ItemSword;
	readonly emerald_sword: ItemSword;
	readonly infernium_sword: ItemSword;
	readonly wooden_pickaxe: ItemPickaxe;
	readonly stone_pickaxe: ItemPickaxe;
	readonly iron_pickaxe: ItemPickaxe;
	readonly golden_pickaxe: ItemPickaxe;
	readonly diamond_pickaxe: ItemPickaxe;
	readonly emerald_pickaxe: ItemPickaxe;
	readonly infernium_pickaxe: ItemPickaxe;
	readonly wooden_axe: ItemTool;
	readonly stone_axe: ItemTool;
	readonly iron_axe: ItemTool;
	readonly golden_axe: ItemTool;
	readonly diamond_axe: ItemTool;
	readonly emerald_axe: ItemTool;
	readonly infernium_axe: ItemTool;
	readonly wood_shovel: ItemShovel;
	readonly stone_shovel: ItemShovel;
	readonly iron_shovel: ItemShovel;
	readonly golden_shovel: ItemShovel;
	readonly diamond_shovel: ItemShovel;
	readonly emerald_shovel: ItemShovel;
	readonly wooden_hoe: ItemHoe;
	readonly stone_hoe: ItemHoe;
	readonly iron_hoe: ItemHoe;
	readonly golden_hoe: ItemHoe;
	readonly diamond_hoe: ItemHoe;
	readonly emerald_hoe: ItemHoe;
	readonly wooden_spear: ItemSpear;
	readonly stone_spear: ItemSpear;
	readonly iron_spear: ItemSpear;
	readonly golden_spear: ItemSpear;
	readonly diamond_spear: ItemSpear;
	readonly infernium_spear: ItemSpear;
	readonly mace: ItemMace;
	readonly bow: ItemBow;
	readonly arrow: Item;
	readonly tipped_arrow: Item;
	readonly spectral_arrow: Item;
	readonly leather_helmet: ItemArmor;
	readonly leather_chestplate: ItemArmor;
	readonly leather_leggings: ItemArmor;
	readonly leather_boots: ItemArmor;
	readonly chainmail_helmet: ItemArmor;
	readonly chainmail_chestplate: ItemArmor;
	readonly chainmail_leggings: ItemArmor;
	readonly chainmail_boots: ItemArmor;
	readonly iron_helmet: ItemArmor;
	readonly iron_chestplate: ItemArmor;
	readonly iron_leggings: ItemArmor;
	readonly iron_boots: ItemArmor;
	readonly golden_helmet: ItemArmor;
	readonly golden_chestplate: ItemArmor;
	readonly golden_leggings: ItemArmor;
	readonly golden_boots: ItemArmor;
	readonly diamond_helmet: ItemArmor;
	readonly diamond_chestplate: ItemArmor;
	readonly diamond_leggings: ItemArmor;
	readonly diamond_boots: ItemArmor;
	readonly emerald_helmet: ItemArmor;
	readonly emerald_chestplate: ItemArmor;
	readonly emerald_leggings: ItemArmor;
	readonly emerald_boots: ItemArmor;
	readonly infernium_helmet: ItemArmor;
	readonly infernium_chestplate: ItemArmor;
	readonly infernium_leggings: ItemArmor;
	readonly infernium_boots: ItemArmor;
	readonly elytra: Item;
	readonly apple: ItemFood;
	readonly golden_apple: ItemAppleGold;
	readonly enchanted_golden_apple: ItemAppleGold;
	readonly bread: ItemFood;
	readonly beef: ItemFood;
	readonly cooked_beef: ItemFood;
	readonly porkchop: ItemFood;
	readonly cooked_porkchop: ItemFood;
	readonly chicken: ItemFood;
	readonly cooked_chicken: ItemFood;
	readonly cod: ItemFood;
	readonly cooked_cod: ItemFood;
	readonly salmon: ItemFood;
	readonly cooked_salmon: ItemFood;
	readonly mutton: ItemFood;
	readonly cooked_mutton: ItemFood;
	readonly rabbit: ItemFood;
	readonly cooked_rabbit: ItemFood;
	readonly rabbit_stew: ItemFood;
	readonly carrot: ItemSeedFood;
	readonly golden_carrot: ItemFood;
	readonly potato: ItemSeedFood;
	readonly baked_potato: ItemFood;
	readonly poisonous_potato: ItemFood;
	readonly beetroot: ItemFood;
	readonly beetroot_soup: ItemFood;
	readonly mushroom_stew: ItemFood;
	readonly cookie: ItemFood;
	readonly melon_slice: ItemFood;
	readonly dried_kelp: ItemFood;
	readonly pumpkin_pie: ItemFood;
	readonly rotten_flesh: ItemFood;
	readonly spider_eye: ItemFood;
	readonly pufferfish: ItemFood;
	readonly tropical_fish: ItemFood;
	readonly honey_bottle: ItemFood;
	readonly orange: ItemFood;
	readonly banana: ItemFood;
	readonly ender_pearl: ItemThrowable;
	readonly snowball: ItemThrowable;
	readonly egg: ItemThrowable;
	readonly experience_bottle: ItemThrowable;
	readonly firework_rocket: Item;
	readonly flint_and_steel: Item;
	readonly shears: Item;
	readonly fishing_rod: Item;
	readonly compass: Item;
	readonly clock: Item;
	readonly name_tag: Item;
	readonly bucket: ItemBucket;
	readonly water_bucket: ItemBucket;
	readonly lava_bucket: ItemBucket;
	readonly milk_bucket: Item;
	readonly cod_bucket: ItemBucket;
	readonly salmon_bucket: ItemBucket;
	readonly pufferfish_bucket: ItemBucket;
	readonly tropical_fish_bucket: ItemBucket;
	readonly potion: Item;
	readonly glass_bottle: Item;
	readonly book: Item;
	readonly writable_book: Item;
	readonly written_book: Item;
	readonly enchanted_book: Item;
	readonly redstone: Item;
	readonly redstone_torch: Item;
	readonly repeater: ItemBlock;
	readonly comparator: ItemBlock;
	readonly minecart: Item;
	readonly rail: ItemBlock;
	readonly powered_rail: ItemBlock;
	readonly detector_rail: ItemBlock;
	readonly activator_rail: ItemBlock;
	readonly oak_boat: Item;
	readonly spruce_boat: Item;
	readonly birch_boat: Item;
	readonly jungle_boat: Item;
	readonly acacia_boat: Item;
	readonly dark_oak_boat: Item;
	readonly pig_spawn_egg: ItemSpawnEgg;
	readonly cow_spawn_egg: ItemSpawnEgg;
	readonly chicken_spawn_egg: ItemSpawnEgg;
	readonly sheep_spawn_egg: ItemSpawnEgg;
	readonly wolf_spawn_egg: ItemSpawnEgg;
	readonly cat_spawn_egg: ItemSpawnEgg;
	readonly zombie_spawn_egg: ItemSpawnEgg;
	readonly skeleton_spawn_egg: ItemSpawnEgg;
	readonly creeper_spawn_egg: ItemSpawnEgg;
	readonly slime_spawn_egg: ItemSpawnEgg;
	readonly spider_spawn_egg: ItemSpawnEgg;
	readonly villager_spawn_egg: ItemSpawnEgg;
	readonly iron_ingot: Item;
	readonly iron_nugget: Item;
	readonly gold_ingot: Item;
	readonly gold_nugget: Item;
	readonly lapis_lazuli: Item;
	readonly coal: Item;
	readonly charcoal: Item;
	readonly diamond: Item;
	readonly emerald: Item;
	readonly infernium_ingot: Item;
	readonly stick: Item;
	readonly leather: Item;
	readonly string: Item;
	readonly slime_ball: Item;
	readonly paper: Item;
	readonly bone: Item;
	readonly sugar: Item;
	readonly gunpowder: Item;
	readonly blaze_powder: Item;
	readonly blaze_rod: Item;
	readonly magma_cream: Item;
	readonly glowstone_dust: Item;
	readonly fermented_spider_eye: Item;
	readonly glistering_melon_slice: Item;
	readonly nether_wart: Item;
	readonly rabbit_foot: Item;
	readonly feather: Item;
	readonly flint: Item;
	readonly wheat_seeds: Item;
	readonly pumpkin_seeds: Item;
	readonly melon_seeds: Item;
	readonly beetroot_seeds: Item;
	readonly wheat: Item;
	readonly bowl: Item;
	readonly ghost_tear: Item;
	readonly hell_brick: Item;
	readonly marble: Item;
	readonly brick: Item;
	readonly clay_ball: Item;
	readonly hell_star: Item;
	readonly white_dye: Item;
	readonly orange_dye: Item;
	readonly magenta_dye: Item;
	readonly light_blue_dye: Item;
	readonly yellow_dye: Item;
	readonly lime_dye: Item;
	readonly pink_dye: Item;
	readonly gray_dye: Item;
	readonly light_gray_dye: Item;
	readonly cyan_dye: Item;
	readonly purple_dye: Item;
	readonly blue_dye: Item;
	readonly brown_dye: Item;
	readonly green_dye: Item;
	readonly red_dye: Item;
	readonly black_dye: Item;
	readonly bone_meal: Item;
	readonly cocoa_beans: Item;
	readonly player_head: Item;
	readonly item_frame: Item;
	readonly armor_stand: Item;
	readonly reeds: ItemBlock;
	readonly torch: Item;
	readonly soul_torch: Item;
	readonly redstone_torch: Item;
	readonly lily_pad: ItemBlock;
	readonly fire_charge: Item;

	// Unknown/Debug
	readonly unknownItem: Item;

	// Block items (ItemBlock) - Natural
	readonly stone: ItemBlock;
	readonly granite: ItemBlock;
	readonly polished_granite: ItemBlock;
	readonly diorite: ItemBlock;
	readonly polished_diorite: ItemBlock;
	readonly andesite: ItemBlock;
	readonly polished_andesite: ItemBlock;
	readonly grass_block: ItemBlock;
	readonly dirt: ItemBlock;
	readonly coarse_dirt: ItemBlock;
	readonly podzol: ItemBlock;
	readonly dirt_path: ItemBlock;
	readonly cobblestone: ItemBlock;
	readonly bedrock: ItemBlock;
	readonly sand: ItemBlock;
	readonly red_sand: ItemBlock;
	readonly gravel: ItemBlock;
	readonly gold_ore: ItemBlock;
	readonly iron_ore: ItemBlock;
	readonly coal_ore: ItemBlock;
	readonly diamond_ore: ItemBlock;
	readonly emerald_ore: ItemBlock;
	readonly lapis_ore: ItemBlock;
	readonly redstone_ore: ItemBlock;
	readonly hell_marble_ore: ItemBlock;
	readonly infernium_ore: ItemBlock;
	readonly hell_gold_ore: ItemBlock;
	readonly sponge: ItemBlock;
	readonly wet_sponge: ItemBlock;
	readonly ice: ItemBlock;
	readonly packed_ice: ItemBlock;
	readonly blue_ice: ItemBlock;
	readonly snow_block: ItemBlock;
	readonly snow: ItemBlock;
	readonly clay: ItemBlock;
	readonly magma_block: ItemBlock;
	readonly soul_sand: ItemBlock;
	readonly soul_soil: ItemBlock;
	readonly basalt: ItemBlock;
	readonly polished_basalt: ItemBlock;
	readonly crying_obsidian: ItemBlock;
	readonly obsidian: ItemBlock;
	readonly end_stone: ItemBlock;
	readonly end_stone_bricks: ItemBlock;
	readonly dragon_egg: ItemBlock;

	// Block items - Wood
	readonly oak_log: ItemBlock;
	readonly spruce_log: ItemBlock;
	readonly birch_log: ItemBlock;
	readonly jungle_log: ItemBlock;
	readonly acacia_log: ItemBlock;
	readonly dark_oak_log: ItemBlock;
	readonly stripped_oak_log: ItemBlock;
	readonly stripped_spruce_log: ItemBlock;
	readonly stripped_birch_log: ItemBlock;
	readonly stripped_jungle_log: ItemBlock;
	readonly stripped_acacia_log: ItemBlock;
	readonly stripped_dark_oak_log: ItemBlock;
	readonly oak_wood: ItemBlock;
	readonly spruce_wood: ItemBlock;
	readonly birch_wood: ItemBlock;
	readonly jungle_wood: ItemBlock;
	readonly acacia_wood: ItemBlock;
	readonly dark_oak_wood: ItemBlock;
	readonly stripped_oak_wood: ItemBlock;
	readonly stripped_spruce_wood: ItemBlock;
	readonly stripped_birch_wood: ItemBlock;
	readonly stripped_jungle_wood: ItemBlock;
	readonly stripped_acacia_wood: ItemBlock;
	readonly stripped_dark_oak_wood: ItemBlock;
	readonly oak_planks: ItemBlock;
	readonly spruce_planks: ItemBlock;
	readonly birch_planks: ItemBlock;
	readonly jungle_planks: ItemBlock;
	readonly acacia_planks: ItemBlock;
	readonly dark_oak_planks: ItemBlock;
	readonly crimson_stem: ItemBlock;
	readonly warped_stem: ItemBlock;
	readonly stripped_crimson_stem: ItemBlock;
	readonly stripped_warped_stem: ItemBlock;
	readonly crimson_hyphae: ItemBlock;
	readonly warped_hyphae: ItemBlock;
	readonly stripped_crimson_hyphae: ItemBlock;
	readonly stripped_warped_hyphae: ItemBlock;
	readonly crimson_planks: ItemBlock;
	readonly warped_planks: ItemBlock;

	// Block items - Leaves & Saplings
	readonly oak_leaves: ItemBlock;
	readonly spruce_leaves: ItemBlock;
	readonly birch_leaves: ItemBlock;
	readonly jungle_leaves: ItemBlock;
	readonly acacia_leaves: ItemBlock;
	readonly dark_oak_leaves: ItemBlock;
	readonly oak_sapling: ItemBlock;
	readonly spruce_sapling: ItemBlock;
	readonly birch_sapling: ItemBlock;
	readonly jungle_sapling: ItemBlock;
	readonly acacia_sapling: ItemBlock;
	readonly dark_oak_sapling: ItemBlock;

	// Block items - Glass
	readonly glass: ItemBlock;
	readonly glass_pane: ItemBlock;
	readonly white_stained_glass: ItemBlock;
	readonly orange_stained_glass: ItemBlock;
	readonly magenta_stained_glass: ItemBlock;
	readonly light_blue_stained_glass: ItemBlock;
	readonly yellow_stained_glass: ItemBlock;
	readonly lime_stained_glass: ItemBlock;
	readonly pink_stained_glass: ItemBlock;
	readonly gray_stained_glass: ItemBlock;
	readonly light_gray_stained_glass: ItemBlock;
	readonly cyan_stained_glass: ItemBlock;
	readonly purple_stained_glass: ItemBlock;
	readonly blue_stained_glass: ItemBlock;
	readonly brown_stained_glass: ItemBlock;
	readonly green_stained_glass: ItemBlock;
	readonly red_stained_glass: ItemBlock;
	readonly black_stained_glass: ItemBlock;
	readonly white_stained_glass_pane: ItemBlock;
	readonly orange_stained_glass_pane: ItemBlock;
	readonly magenta_stained_glass_pane: ItemBlock;
	readonly light_blue_stained_glass_pane: ItemBlock;
	readonly yellow_stained_glass_pane: ItemBlock;
	readonly lime_stained_glass_pane: ItemBlock;
	readonly pink_stained_glass_pane: ItemBlock;
	readonly gray_stained_glass_pane: ItemBlock;
	readonly light_gray_stained_glass_pane: ItemBlock;
	readonly cyan_stained_glass_pane: ItemBlock;
	readonly purple_stained_glass_pane: ItemBlock;
	readonly blue_stained_glass_pane: ItemBlock;
	readonly brown_stained_glass_pane: ItemBlock;
	readonly green_stained_glass_pane: ItemBlock;
	readonly red_stained_glass_pane: ItemBlock;
	readonly black_stained_glass_pane: ItemBlock;

	// Block items - Mineral Blocks
	readonly coal_block: ItemBlock;
	readonly iron_block: ItemBlock;
	readonly gold_block: ItemBlock;
	readonly diamond_block: ItemBlock;
	readonly emerald_block: ItemBlock;
	readonly infernium_block: ItemBlock;
	readonly lapis_block: ItemBlock;
	readonly redstone_block: ItemBlock;

	// Block items - Sandstone
	readonly sandstone: ItemBlock;
	readonly chiseled_sandstone: ItemBlock;
	readonly smooth_sandstone: ItemBlock;
	readonly cut_sandstone: ItemBlock;
	readonly red_sandstone: ItemBlock;
	readonly chiseled_red_sandstone: ItemBlock;
	readonly smooth_red_sandstone: ItemBlock;
	readonly cut_red_sandstone: ItemBlock;

	// Block items - Marble
	readonly marble_block: ItemBlock;
	readonly marble_pillar: ItemBlock;
	readonly chiseled_marble_block: ItemBlock;
	readonly smooth_marble: ItemBlock;
	readonly marble_bricks: ItemBlock;

	// Block items - Aquastone
	readonly aquastone: ItemBlock;
	readonly aquastone_bricks: ItemBlock;
	readonly dark_aquastone: ItemBlock;

	// Block items - Wool
	readonly white_wool: ItemBlock;
	readonly orange_wool: ItemBlock;
	readonly magenta_wool: ItemBlock;
	readonly light_blue_wool: ItemBlock;
	readonly yellow_wool: ItemBlock;
	readonly lime_wool: ItemBlock;
	readonly pink_wool: ItemBlock;
	readonly gray_wool: ItemBlock;
	readonly light_gray_wool: ItemBlock;
	readonly cyan_wool: ItemBlock;
	readonly purple_wool: ItemBlock;
	readonly blue_wool: ItemBlock;
	readonly brown_wool: ItemBlock;
	readonly green_wool: ItemBlock;
	readonly red_wool: ItemBlock;
	readonly black_wool: ItemBlock;

	// Block items - Terracotta
	readonly terracotta: ItemBlock;
	readonly white_terracotta: ItemBlock;
	readonly orange_terracotta: ItemBlock;
	readonly magenta_terracotta: ItemBlock;
	readonly light_blue_terracotta: ItemBlock;
	readonly yellow_terracotta: ItemBlock;
	readonly lime_terracotta: ItemBlock;
	readonly pink_terracotta: ItemBlock;
	readonly gray_terracotta: ItemBlock;
	readonly light_gray_terracotta: ItemBlock;
	readonly cyan_terracotta: ItemBlock;
	readonly purple_terracotta: ItemBlock;
	readonly blue_terracotta: ItemBlock;
	readonly brown_terracotta: ItemBlock;
	readonly green_terracotta: ItemBlock;
	readonly red_terracotta: ItemBlock;
	readonly black_terracotta: ItemBlock;

	// Block items - Glazed Terracotta
	readonly white_glazed_terracotta: ItemBlock;
	readonly orange_glazed_terracotta: ItemBlock;
	readonly magenta_glazed_terracotta: ItemBlock;
	readonly light_blue_glazed_terracotta: ItemBlock;
	readonly yellow_glazed_terracotta: ItemBlock;
	readonly lime_glazed_terracotta: ItemBlock;
	readonly pink_glazed_terracotta: ItemBlock;
	readonly gray_glazed_terracotta: ItemBlock;
	readonly light_gray_glazed_terracotta: ItemBlock;
	readonly cyan_glazed_terracotta: ItemBlock;
	readonly purple_glazed_terracotta: ItemBlock;
	readonly blue_glazed_terracotta: ItemBlock;
	readonly brown_glazed_terracotta: ItemBlock;
	readonly green_glazed_terracotta: ItemBlock;
	readonly red_glazed_terracotta: ItemBlock;
	readonly black_glazed_terracotta: ItemBlock;

	// Block items - Concrete
	readonly white_concrete: ItemBlock;
	readonly orange_concrete: ItemBlock;
	readonly magenta_concrete: ItemBlock;
	readonly light_blue_concrete: ItemBlock;
	readonly yellow_concrete: ItemBlock;
	readonly lime_concrete: ItemBlock;
	readonly pink_concrete: ItemBlock;
	readonly gray_concrete: ItemBlock;
	readonly light_gray_concrete: ItemBlock;
	readonly cyan_concrete: ItemBlock;
	readonly purple_concrete: ItemBlock;
	readonly blue_concrete: ItemBlock;
	readonly brown_concrete: ItemBlock;
	readonly green_concrete: ItemBlock;
	readonly red_concrete: ItemBlock;
	readonly black_concrete: ItemBlock;

	// Block items - Concrete Powder
	readonly white_concrete_powder: ItemBlock;
	readonly orange_concrete_powder: ItemBlock;
	readonly magenta_concrete_powder: ItemBlock;
	readonly light_blue_concrete_powder: ItemBlock;
	readonly yellow_concrete_powder: ItemBlock;
	readonly lime_concrete_powder: ItemBlock;
	readonly pink_concrete_powder: ItemBlock;
	readonly gray_concrete_powder: ItemBlock;
	readonly light_gray_concrete_powder: ItemBlock;
	readonly cyan_concrete_powder: ItemBlock;
	readonly purple_concrete_powder: ItemBlock;
	readonly blue_concrete_powder: ItemBlock;
	readonly brown_concrete_powder: ItemBlock;
	readonly green_concrete_powder: ItemBlock;
	readonly red_concrete_powder: ItemBlock;
	readonly black_concrete_powder: ItemBlock;

	// Block items - Carpet
	readonly white_carpet: ItemBlock;
	readonly orange_carpet: ItemBlock;
	readonly magenta_carpet: ItemBlock;
	readonly light_blue_carpet: ItemBlock;
	readonly yellow_carpet: ItemBlock;
	readonly lime_carpet: ItemBlock;
	readonly pink_carpet: ItemBlock;
	readonly gray_carpet: ItemBlock;
	readonly light_gray_carpet: ItemBlock;
	readonly cyan_carpet: ItemBlock;
	readonly purple_carpet: ItemBlock;
	readonly blue_carpet: ItemBlock;
	readonly brown_carpet: ItemBlock;
	readonly green_carpet: ItemBlock;
	readonly red_carpet: ItemBlock;
	readonly black_carpet: ItemBlock;

	// Block items - Nether
	readonly hellstone: ItemBlock;
	readonly hell_bricks: ItemBlock;
	readonly red_hell_bricks: ItemBlock;
	readonly chiseled_hell_bricks: ItemBlock;
	readonly cracked_hell_bricks: ItemBlock;
	readonly hell_fungus_block: ItemBlock;
	readonly crimson_nylium: ItemBlock;
	readonly warped_nylium: ItemBlock;
	readonly warped_wart_block: ItemBlock;
	readonly crimson_fungus: ItemBlock;
	readonly warped_fungus: ItemBlock;
	readonly crimson_roots: ItemBlock;
	readonly warped_roots: ItemBlock;
	readonly hell_sprouts: ItemBlock;

	// Block items - Stone Variants
	readonly stone_bricks: ItemBlock;
	readonly smooth_stone: ItemBlock;
	readonly mossy_stone_bricks: ItemBlock;
	readonly cracked_stone_bricks: ItemBlock;
	readonly chiseled_stone_bricks: ItemBlock;
	readonly mossy_cobblestone: ItemBlock;
	readonly blackstone: ItemBlock;
	readonly polished_blackstone: ItemBlock;
	readonly polished_blackstone_bricks: ItemBlock;
	readonly cracked_polished_blackstone_bricks: ItemBlock;
	readonly chiseled_polished_blackstone: ItemBlock;
	readonly gilded_blackstone: ItemBlock;

	// Block items - Other
	readonly note_block: ItemBlock;
	readonly bookshelf: ItemBlock;
	readonly workbench: ItemBlock;
	readonly bricks: ItemBlock;
	readonly tnt: ItemBlock;
	readonly jukebox: ItemBlock;
	readonly glowstone: ItemBlock;
	readonly sea_lantern: ItemBlock;
	readonly slime_block: ItemBlock;
	readonly hay_block: ItemBlock;
	readonly bone_block: ItemBlock;
	readonly honeycomb_block: ItemBlock;
	readonly honey_block: ItemBlock;
	readonly purpur_block: ItemBlock;
	readonly purpur_pillar: ItemBlock;
	readonly meteorite_block: ItemBlock;
	readonly cloud_block: ItemBlock;
	readonly campfire: ItemBlock;
	readonly soul_campfire: ItemBlock;
	readonly lantern: ItemBlock;
	readonly soul_lantern: ItemBlock;
	readonly shroomlight: ItemBlock;
	readonly lodestone: ItemBlock;
	readonly command_block: ItemBlock;
	readonly repeating_command_block: ItemBlock;
	readonly chain_command_block: ItemBlock;
	readonly barrier: ItemBlock;
	readonly spawner: ItemBlock;

	// Block items - Redstone
	readonly sticky_piston: ItemBlock;
	readonly piston: ItemBlock;
	readonly lever: ItemBlock;
	readonly redstone_lamp: ItemBlock;
	readonly observer: ItemBlock;
	readonly target: ItemBlock;
	readonly dispenser: ItemBlock;
	readonly dropper: ItemBlock;
	readonly hopper: ItemBlock;

	// Block items - Plants & Flora
	readonly poppy: ItemBlock;
	readonly dandelion: ItemBlock;
	readonly blue_orchid: ItemBlock;
	readonly allium: ItemBlock;
	readonly azure_bluet: ItemBlock;
	readonly red_tulip: ItemBlock;
	readonly orange_tulip: ItemBlock;
	readonly white_tulip: ItemBlock;
	readonly pink_tulip: ItemBlock;
	readonly oxeye_daisy: ItemBlock;
	readonly cornflower: ItemBlock;
	readonly lily_of_the_valley: ItemBlock;
	readonly wither_rose: ItemBlock;
	readonly sunflower: ItemBlock;
	readonly lilac: ItemBlock;
	readonly rose_bush: ItemBlock;
	readonly peony: ItemBlock;
	readonly tall_grass: ItemBlock;
	readonly large_fern: ItemBlock;
	readonly fern: ItemBlock;
	readonly dead_bush: ItemBlock;
	readonly grass: ItemBlock;
	readonly cactus: ItemBlock;
	readonly sugar_cane: ItemBlock;
	readonly vine: ItemBlock;
	readonly red_mushroom: ItemBlock;
	readonly brown_mushroom: ItemBlock;
	readonly brown_mushroom_block: ItemBlock;
	readonly red_mushroom_block: ItemBlock;
	readonly mushroom_stem: ItemBlock;
	readonly melon: ItemBlock;
	readonly pumpkin: ItemBlock;
	readonly carved_pumpkin: ItemBlock;
	readonly jack_o_lantern: ItemBlock;

	// Block items - Beds (plain Item, not ItemBlock)
	readonly white_bed: Item;
	readonly orange_bed: Item;
	readonly magenta_bed: Item;
	readonly light_blue_bed: Item;
	readonly yellow_bed: Item;
	readonly lime_bed: Item;
	readonly pink_bed: Item;
	readonly gray_bed: Item;
	readonly light_gray_bed: Item;
	readonly cyan_bed: Item;
	readonly purple_bed: Item;
	readonly blue_bed: Item;
	readonly brown_bed: Item;
	readonly green_bed: Item;
	readonly red_bed: Item;
	readonly black_bed: Item;

	// Block items - Signs
	readonly oak_sign: ItemBlock;
	readonly spruce_sign: ItemBlock;
	readonly birch_sign: ItemBlock;
	readonly jungle_sign: ItemBlock;
	readonly acacia_sign: ItemBlock;
	readonly dark_oak_sign: ItemBlock;

	// Block items - Doors (have .block property)
	readonly oak_door: ItemBlock;
	readonly iron_door: ItemBlock;
	readonly spruce_door: ItemBlock;
	readonly birch_door: ItemBlock;
	readonly jungle_door: ItemBlock;
	readonly acacia_door: ItemBlock;
	readonly dark_oak_door: ItemBlock;
	readonly crimson_door: ItemBlock;
	readonly warped_door: ItemBlock;

	// Block items - Trapdoors
	readonly oak_trapdoor: ItemBlock;
	readonly spruce_trapdoor: ItemBlock;
	readonly birch_trapdoor: ItemBlock;
	readonly jungle_trapdoor: ItemBlock;
	readonly acacia_trapdoor: ItemBlock;
	readonly dark_oak_trapdoor: ItemBlock;
	readonly iron_trapdoor: ItemBlock;
	readonly crimson_trapdoor: ItemBlock;
	readonly warped_trapdoor: ItemBlock;

	// Block items - Buttons
	readonly stone_button: ItemBlock;
	readonly oak_button: ItemBlock;
	readonly spruce_button: ItemBlock;
	readonly birch_button: ItemBlock;
	readonly jungle_button: ItemBlock;
	readonly acacia_button: ItemBlock;
	readonly dark_oak_button: ItemBlock;
	readonly crimson_button: ItemBlock;
	readonly warped_button: ItemBlock;
	readonly polished_blackstone_button: ItemBlock;

	// Block items - Pressure Plates
	readonly stone_pressure_plate: ItemBlock;
	readonly oak_pressure_plate: ItemBlock;
	readonly spruce_pressure_plate: ItemBlock;
	readonly birch_pressure_plate: ItemBlock;
	readonly jungle_pressure_plate: ItemBlock;
	readonly acacia_pressure_plate: ItemBlock;
	readonly dark_oak_pressure_plate: ItemBlock;
	readonly crimson_pressure_plate: ItemBlock;
	readonly warped_pressure_plate: ItemBlock;
	readonly polished_blackstone_pressure_plate: ItemBlock;
	readonly light_weighted_pressure_plate: ItemBlock;
	readonly heavy_weighted_pressure_plate: ItemBlock;

	// Block items - Fences
	readonly oak_fence: ItemBlock;
	readonly spruce_fence: ItemBlock;
	readonly birch_fence: ItemBlock;
	readonly jungle_fence: ItemBlock;
	readonly acacia_fence: ItemBlock;
	readonly dark_oak_fence: ItemBlock;
	readonly hell_brick_fence: ItemBlock;
	readonly crimson_fence: ItemBlock;
	readonly warped_fence: ItemBlock;
	readonly iron_bars: ItemBlock;

	// Block items - Fence Gates
	readonly oak_fence_gate: ItemBlock;
	readonly spruce_fence_gate: ItemBlock;
	readonly birch_fence_gate: ItemBlock;
	readonly jungle_fence_gate: ItemBlock;
	readonly acacia_fence_gate: ItemBlock;
	readonly dark_oak_fence_gate: ItemBlock;
	readonly crimson_fence_gate: ItemBlock;
	readonly warped_fence_gate: ItemBlock;

	// Block items - Walls
	readonly andesite_wall: ItemBlock;
	readonly blackstone_wall: ItemBlock;
	readonly polished_blackstone_wall: ItemBlock;
	readonly polished_blackstone_brick_wall: ItemBlock;
	readonly brick_wall: ItemBlock;
	readonly cobblestone_wall: ItemBlock;
	readonly diorite_wall: ItemBlock;
	readonly end_stone_brick_wall: ItemBlock;
	readonly granite_wall: ItemBlock;
	readonly mossy_cobblestone_wall: ItemBlock;
	readonly mossy_stone_brick_wall: ItemBlock;
	readonly hell_brick_wall: ItemBlock;
	readonly red_hell_brick_wall: ItemBlock;
	readonly sandstone_wall: ItemBlock;
	readonly stone_brick_wall: ItemBlock;
	readonly red_sandstone_wall: ItemBlock;
	readonly aquastone_wall: ItemBlock;

	// Block items - Slabs
	readonly stone_slab: ItemBlock;
	readonly stone_brick_slab: ItemBlock;
	readonly smooth_stone_slab: ItemBlock;
	readonly marble_slab: ItemBlock;
	readonly oak_slab: ItemBlock;
	readonly spruce_slab: ItemBlock;
	readonly birch_slab: ItemBlock;
	readonly jungle_slab: ItemBlock;
	readonly acacia_slab: ItemBlock;
	readonly dark_oak_slab: ItemBlock;
	readonly cobblestone_slab: ItemBlock;
	readonly brick_slab: ItemBlock;
	readonly sandstone_slab: ItemBlock;
	readonly red_sandstone_slab: ItemBlock;
	readonly granite_slab: ItemBlock;
	readonly diorite_slab: ItemBlock;
	readonly andesite_slab: ItemBlock;
	readonly polished_granite_slab: ItemBlock;
	readonly polished_diorite_slab: ItemBlock;
	readonly polished_andesite_slab: ItemBlock;
	readonly mossy_stone_brick_slab: ItemBlock;
	readonly mossy_cobblestone_slab: ItemBlock;
	readonly end_stone_brick_slab: ItemBlock;
	readonly smooth_sandstone_slab: ItemBlock;
	readonly smooth_red_sandstone_slab: ItemBlock;
	readonly cut_sandstone_slab: ItemBlock;
	readonly cut_red_sandstone_slab: ItemBlock;
	readonly smooth_marble_slab: ItemBlock;
	readonly hell_brick_slab: ItemBlock;
	readonly red_hell_brick_slab: ItemBlock;
	readonly purpur_slab: ItemBlock;
	readonly aquastone_slab: ItemBlock;
	readonly aquastone_brick_slab: ItemBlock;
	readonly dark_aquastone_slab: ItemBlock;
	readonly blackstone_slab: ItemBlock;
	readonly polished_blackstone_slab: ItemBlock;
	readonly polished_blackstone_brick_slab: ItemBlock;
	readonly crimson_slab: ItemBlock;
	readonly warped_slab: ItemBlock;

	// Block items - Stairs
	readonly oak_stairs: ItemBlock;
	readonly spruce_stairs: ItemBlock;
	readonly birch_stairs: ItemBlock;
	readonly jungle_stairs: ItemBlock;
	readonly acacia_stairs: ItemBlock;
	readonly dark_oak_stairs: ItemBlock;
	readonly stone_stairs: ItemBlock;
	readonly cobblestone_stairs: ItemBlock;
	readonly brick_stairs: ItemBlock;
	readonly stone_brick_stairs: ItemBlock;
	readonly hell_brick_stairs: ItemBlock;
	readonly sandstone_stairs: ItemBlock;
	readonly smooth_sandstone_stairs: ItemBlock;
	readonly red_sandstone_stairs: ItemBlock;
	readonly smooth_red_sandstone_stairs: ItemBlock;
	readonly marble_stairs: ItemBlock;
	readonly smooth_marble_stairs: ItemBlock;
	readonly andesite_stairs: ItemBlock;
	readonly diorite_stairs: ItemBlock;
	readonly granite_stairs: ItemBlock;
	readonly polished_andesite_stairs: ItemBlock;
	readonly polished_diorite_stairs: ItemBlock;
	readonly polished_granite_stairs: ItemBlock;
	readonly end_stone_brick_stairs: ItemBlock;
	readonly aquastone_stairs: ItemBlock;
	readonly aquastone_brick_stairs: ItemBlock;
	readonly dark_aquastone_stairs: ItemBlock;
	readonly mossy_cobblestone_stairs: ItemBlock;
	readonly mossy_stone_brick_stairs: ItemBlock;
	readonly purpur_stairs: ItemBlock;
	readonly red_hell_brick_stairs: ItemBlock;
	readonly blackstone_stairs: ItemBlock;
	readonly polished_blackstone_stairs: ItemBlock;
	readonly polished_blackstone_brick_stairs: ItemBlock;
	readonly crimson_stairs: ItemBlock;
	readonly warped_stairs: ItemBlock;

	// Block items - Utility
	readonly chest: ItemBlock;
	readonly ender_chest: ItemBlock;
	readonly furnace: ItemBlock;
	readonly barrel: ItemBlock;
	readonly brewing_stand: ItemBlock;
	readonly cauldron: ItemBlock;
	readonly enchanting_table: ItemBlock;
	readonly anvil: ItemBlock;
	readonly chipped_anvil: ItemBlock;
	readonly damaged_anvil: ItemBlock;
	readonly flower_pot: ItemBlock;
	readonly ladder: ItemBlock;
	readonly iron_ladder: ItemBlock;

	// Allow any string key for extensibility
	[key: string]: Item;
};
