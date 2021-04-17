import * as BABYLON from "babylonjs";

export class Camera {
  private _scene : BABYLON.Scene;
  private _canvas : HTMLCanvasElement;
  private _camera : BABYLON.Camera;
  private _world : any;

  constructor (scene : BABYLON.Scene, canvas : HTMLCanvasElement, world : any) {
    this._scene = scene;
    this._canvas = canvas;
    this._world = world;
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