import type { Box3, Vector3 } from "three";
import type { Entity } from "../entities";
import type { EnumFacing } from "../math/facing";
import type { PBBlockPos } from "../packets";

export declare class BlockPos {
	toProto(): PBBlockPos;
	static readonly ORIGIN: BlockPos;
	x: number;
	y: number;
	z: number;
	constructor(x: number, y: number, z: number);
	getX(): number;
	getY(): number;
	getZ(): number;
	static fromVector(vec: Vector3): BlockPos;
	static fromJSON(json: { x: number; y: number; z: number }): BlockPos;
	static fromProto(proto: PBBlockPos): BlockPos;
	static fromString(str: string): BlockPos;
	toVec3(): Vector3;
	toArray(): [this["x"], this["y"], this["z"]];
	static fromArray(arr: [number, number, number]): BlockPos;
	static fromEntity(entity: Entity): BlockPos;
	toAABB(): Box3;
	set(x: number, y: number, z: number): void;
	setInt(x: number, y: number, z: number): void;
	add(x: number, y: number, z: number): BlockPos;
	subtract(x: number, y: number, z: number): BlockPos;
	cellPos(): [number, number, number];

	// Utility methods for block iteration
	static getAllInBoxMutable(min: BlockPos, max: BlockPos): BlockPos[];
	up(n: number = 1): BlockPos;
	down(n: number = 1): BlockPos;
	north(n: number = 1): BlockPos;
	south(n: number = 1): BlockPos;
	west(n: number = 1): BlockPos;
	east(n: number = 1): BlockPos;
	offset(facing: EnumFacing, n: number = 1): BlockPos;
	distanceTo(other: BlockPos): number;
	distanceToSquared(other: BlockPos): number;
	equals(other: BlockPos): boolean;
	toString(): string;
	clone(): BlockPos;
	/** **IMPORTANT: USE DUMPS** */
	static iterator(min: BlockPos, max: BlockPos): IterableIterator<BlockPos>;
}
