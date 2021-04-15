import * as BABYLON from "babylonjs";

export class Lighting {
  private _scene : BABYLON.Scene;
  private _lighting: BABYLON.Light;

  constructor (scene : BABYLON.Scene) {
    this._scene = scene;
  }

  public async set(type : string = "default") {
    return new Promise(async (resolve, reject) => {
      switch (type) {
        case "default":
          await this.default();
          break;
      
        default:
          return reject({ status: "failed", contents: "Invalid camera type" });
      }
      return resolve(null);
    });
  }

  private async default() {
    return new Promise(async (resolve, reject) => {
      this._lighting = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), this._scene);
      return resolve(null);
    })
  }
}