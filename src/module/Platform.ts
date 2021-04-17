import * as BABYLON from "babylonjs";

export class Platform {
  private _scene : BABYLON.Scene;
  private _world : any;
  private _importMesh : BABYLON.ISceneLoaderAsyncResult;

  constructor (scene : BABYLON.Scene, world : any) {
    this._scene = scene;
    this._world = world;
  }

  public async render() {
    return new Promise (async (resolve, reject) => {
      try {
        this._importMesh = await BABYLON.SceneLoader.ImportMeshAsync(null, this._world.include.uri, null, this._scene);
      } catch (error) {
        return reject({ status: "error", contents: error });
      }
      this._importMesh.meshes[0].position = new BABYLON.Vector3(this._world.pose.x, this._world.pose.y, this._world.pose.z);
      return resolve(null);
    });
  }

  public async physics() {
    return new Promise (async (resolve, reject) => {

    });
  }
}