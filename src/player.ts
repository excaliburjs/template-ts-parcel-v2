import { Actor, Color, vec } from "excalibur";
import { Resources } from "./resources";

export class Player extends Actor {
  constructor() {
    super({
      pos: vec(150, 150)
    });
  }

  onInitialize() {
    this.graphics.add(Resources.Sword.toSprite());
  }
}
