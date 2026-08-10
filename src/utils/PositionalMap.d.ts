import { Vector3 } from "three";

export declare class PositionMap<V> extends Map<number, V> {
	static fromArray<V>(entries: [Vec3, V][]): PositionMap<V>;
	delete(pos: Vec3): boolean;
	get(pos: Vec3): V | undefined;
	has(pos: Vec3): boolean;
	set(pos: Vec3, value: V): this;
	entries(): IterableIterator<[Vec3, V]>;
	hash(pos: Vec3): number;
	unhash(key: number): Vec3;
}
