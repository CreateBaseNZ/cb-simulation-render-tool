import * as BABYLON from "babylonjs";
import { resolve } from "../../webpack.config";

export class Platform {
  private _scene : BABYLON.Scene;

  constructor (scene : BABYLON.Scene) {
    this._scene = scene;
  }

  public async render(world : any) {
    return new Promise (async (resolve, reject) => {
      let result;
      try {
        result = await BABYLON.SceneLoader.ImportMeshAsync(null, world.include.uri, null, this._scene);
      } catch (error) {
        return reject({ status: "error", contents: error })
      }
      return resolve(null);
    });
  }
}