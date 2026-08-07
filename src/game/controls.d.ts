import { Vector3, Vector3Like, Object3D, Camera } from "three";

export declare class Lerp {
    t: number;
    from: Vector3;
    to: Vector3;
    constructor();
    set(v: Vector3Like): void;
    get(v?: Vector3): Vector3;
}

export declare class Controls {
    rotation: {
        x: number;
        y: number;
    };
    positionLerp: Lerp;
    position: Vector3;
    pitchObject: Object3D;
    yawObject: Object3D;
    pitch: number;
    yaw: number;
    lastPitch: number;
    lastYaw: number;
    recoilPitchPending: number;
    recoilYawPending: number;
    recoilPitchApplied: number;
    recoilYawApplied: number;
    lastRecoilAt: number;
    lastFireAt: number;
    aimPitchPending: number;
    aimYawPending: number;
    aimPitchApplied: number;
    aimYawApplied: number;
    /**
     * set to `true` when returning to the game, and set to `false` when exiting/pausing the game.
     */
    enabled: boolean;
    /**
     * This is used to write the camera state for rendering when using `OffscreenCanvas` for rendering.
     */
    onLook?: (yaw: number, pitch: number) => void;
    constructor();
    setCamera(camera: Camera): void;
    onMouseMove(e: MouseEvent): void;
    onTouchMove(mX: number, mY: number): void;
    /**
     * @param mX movement X
     * @param mY movement Y
     */
    updateCamera(mX: number, mY: number): void;
    consumeRecoilCompensation(pitchDiff: number, yawDiff: number): void;
    /**
     * @param mul `(1 - t) / t`, where `t` is `TV.heldWeapon()?.followRecoil`
     */
    applyRecoil(pitch: number, yaw: number, mul?: number): void;
    recoilAimOffset(): {
        pitch: number;
        yaw: number;
    };
    recoilViewOffset(): {
        pitch: number;
        yaw: number;
    };
    notifyFired(): void;
    updateRecoil(): void;
    update(): void;
    fixedUpdate(v: Vector3Like): void;
    get camera(): Object3D;
    /**
     * **IMPORTANT: USE DUMPS**
     */
    get cameraPos(): Vector3;
}
