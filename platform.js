import { width } from "./game.js";

export default class Platform {
  constructor() {
    this.width = 120;
    this.xPos = width / 2 - this.width / 2;
    this.yPos = 570;
    this.velocity = 8;
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
    fill("white");
    rect(this.xPos, this.yPos, this.width, 20);
  }
}
