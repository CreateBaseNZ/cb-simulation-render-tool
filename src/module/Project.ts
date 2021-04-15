import * as BABYLON from "babylonjs";
import { Platform } from "./Platform";
import { Camera } from "./Camera";
import { Lighting } from "./Lighting";

export class Project {
  private _world : any;
  private _canvas : HTMLCanvasElement;
  private _engine : BABYLON.Engine;
  private _scene : BABYLON.Scene;
  private _camera : Camera;
  private _lighting : Lighting;
  private _platform : Platform;
  private _loader : HTMLDivElement;

  constructor(canvasId : string, loaderId : string, world : any) {
    // Initialise Babylon.js Engine
    this._world = world;
    // Fetch the canvas element
    this._canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    // Fetch the loader element
    this._loader = document.getElementById(loaderId) as HTMLDivElement;
    // Create the Babylon.js Engine
    this._engine = new BABYLON.Engine(this._canvas, true);
    // Create the Scene
    this._scene = new BABYLON.Scene(this._engine);
    // Run the Babylon.js Engine and Render the Scene
    this._engine.runRenderLoop(() => this._scene.render());
  }

  public async create() {
    return new Promise(async (resolve, reject) => {
      // Create Loading Screen
      this.loader("add");
      // Set Camera Controls
      this._camera = new Camera(this._scene, this._canvas);
      try {
        await this._camera.set();
      } catch (data) {
        return reject(data);
      }
      // Set Lighting
      this._lighting = new Lighting(this._scene);
      try {
        await this._lighting.set();
      } catch (data) {
        return reject(data);
      }
      // Render Platform
      this._platform = new Platform(this._scene);
      this._platform.render(this._world);
      // Remove Loading Screen
      this.loader("remove");
    });
  }

  private loader(status : string = "add") {
    if (status === "add") {
      this._loader.style.display = "block";
    } else if (status === "remove") {
      this._loader.style.display = "none";
    } else {
      return;
    }
  }

  /**
   * Test for asynchronous operations
   * @param ms 
   * @returns 
   */
  protected timeout(ms : number = 2000) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}