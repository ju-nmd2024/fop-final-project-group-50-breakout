import { width } from "./game.js";

export default class Platform {
  constructor() {
    this.xPos = width / 2;
    this.yPos = 570;
    this.velocity = 8;
    this.width = 120;
  }

  update() {
    if (keyIsDown(LEFT_ARROW)) {
      this.xPos = max(0, this.xPos - this.velocity);
    }

    if (keyIsDown(RIGHT_ARROW)) {
      this.xPos = min(width - this.width, this.xPos + this.velocity);
    }
  }
  draw() {
    rect(this.xPos, this.yPos, this.width, 20);
  }
}
