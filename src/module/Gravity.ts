import * as BABYLON from "babylonjs";

export class Gravity {
  private _scene : BABYLON.Scene;
  private _world: any;
  private _gravity : BABYLON.Vector3;

  constructor (scene : BABYLON.Scene, world : any) {
    this._scene = scene;
    this._world = world;
  }

  public async set() {
    return new Promise(async (resolve, reject) => {
      this._gravity = new BABYLON.Vector3(this._world.gravity.x, this._world.gravity.y, this._world.gravity.z);
      this._scene.enablePhysics(this._gravity, new BABYLON.CannonJSPlugin());
      return resolve(null);
    });
  }
}