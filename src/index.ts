import "./index.scss";
import * as world from "./world.json";
import { Project } from "./module/Project";

export class App {
  private _canvasId : string = "world";
  private _loaderId : string = "world-loader";
  private _project : Project;

  constructor () {
    this._project  = new Project(this._canvasId, this._loaderId, world);
    this._project.create();
  }
}

new App();