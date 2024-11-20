import { width, height } from "./game.js";

export default class Ball {
  constructor() {
    this.xPos = 350;
    this.yPos = 500;
    this.radius = 10;
    this.xVelocity = 1;
    this.yVelocity = 1;
  }

  update() {
    this.xPos += this.xVelocity;
    this.yPos += this.yVelocity;

    if (this.xPos - this.radius < 0 || this.xPos + this.radius > width) {
      console.log("hit wall");
      this.xVelocity *= -1;
    }

    if (this.yPos - this.radius < 0 || this.yPos + this.radius > height) {
      console.log("hit ground");
      this.yVelocity *= -1;
    }
  }

  draw() {
    fill(255, 255, 255);
    ellipse(this.xPos, this.yPos, 20, this.radius * 2);
  }
}
