import * as BABYLON from "babylonjs";

export class Model {
  private _scene : BABYLON.Scene;
  private _model : any;
  private _importMesh : BABYLON.ISceneLoaderAsyncResult;

  constructor (scene : BABYLON.Scene, model : any) {
    this._scene = scene;
    this._model = model;
  }

  public async render() {
    return new Promise(async (resolve, reject) => {
      try {
        this._importMesh = await BABYLON.SceneLoader.ImportMeshAsync(null, this._model.include.uri, null, this._scene);
      } catch (error) {
        return reject({ status: "error", contents: error })
      }
      this._importMesh.meshes[0].position = new BABYLON.Vector3(this._model.pose.x, this._model.pose.y, this._model.pose.z);
      return resolve(null);
    });
  }

  public async physics() {
    return new Promise(async (resolve, reject) => {
      let physicsRoot = new BABYLON.Mesh("", this._scene);
      physicsRoot.addChild(this._importMesh.meshes[0]);
      physicsRoot.physicsImpostor = new BABYLON.PhysicsImpostor(physicsRoot, BABYLON.PhysicsImpostor.NoImpostor, { mass: 3 }, this._scene);
      return resolve(null);
    });
  }
}