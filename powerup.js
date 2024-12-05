import { bricks } from "./game.js";
export default class Powerup {
  constructor(index, xPos, yPos, type) {
    this.index = index;
    this.xPos = xPos;
    this.yPos = yPos;
    this.type = type;
    this.consumed = false;
  }

  update() {
    for (let brick of bricks) {
      if (bricks[this.index] === brick && brick.destroyed) {
        this.yPos += 3;
      }
    }
  }

  draw() {
    if (!this.consumed) {
      push();
      colorMode(HSB); //aksed chatgpt to help with rainbow strobe effect in p5
      rectMode(CENTER);
      angleMode(DEGREES);

      let hue = frameCount % 360; //gpt
      let col = color(hue, 255, 255); //gpt

      fill(col);
      translate(this.xPos, this.yPos);
      push();
      rotate(45);
      rect(0, 0, 25);
      pop();
      pop();
    }
  }
}
