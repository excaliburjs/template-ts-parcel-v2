import { Graphics } from "excalibur";
import sword from "./images/sword.png"; // for parcelv2 this is configured in the .parcelrc

let Resources = {
  Sword: new Graphics.ImageSource(sword)
};

export { Resources };