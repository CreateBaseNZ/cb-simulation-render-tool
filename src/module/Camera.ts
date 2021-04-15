import * as BABYLON from "babylonjs";

export class Camera {
  private _scene : BABYLON.Scene;
  private _canvas : HTMLCanvasElement;
  private _camera : BABYLON.Camera;

  constructor (scene : BABYLON.Scene, canvas : HTMLCanvasElement) {
    this._scene = scene;
    this._canvas = canvas;
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
      this._camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0), this._scene);
      this._camera.attachControl(this._canvas, true);
      return resolve(null);
    })
  }
}