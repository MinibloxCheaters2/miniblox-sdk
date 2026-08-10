/**
 * Technically its from Ola.js (https://grep.app/franciscop/ola/master/ola.js?q=function+Ola(&case=true#L69),
 * but Vector has seemingly turned it into a class.
 * @module
 */

export declare class Single {
	start: number;
	time: number;
	from: number;
	current: number;
	to: number;
	speed: number;
	constructor(init: number, time: number);
	get(now: number): number;
	/**
	 * **IMPORTANT: USE DUMPS**.
	 */
	getSpeed(now: number): number;
	set(value: number, time: boolean): number;
}
