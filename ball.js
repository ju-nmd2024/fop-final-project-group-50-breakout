import { width, height, platform, bricks, gameScore } from "./game.js";
export default class Ball {
  constructor() {
    this.xPos = width / 2;
    this.yPos = 530;
    this.radius = 10;
    this.xVelocity = 5;
    this.yVelocity = 5;
  }

  update() {
    this.xPos += this.xVelocity;
    this.yPos += this.yVelocity;

    if (this.xPos - this.radius < 0 || this.xPos + this.radius > width) {
      console.log("hit wall");
      this.xVelocity *= -1;
    }

    if (this.yPos - this.radius < 0) {
      console.log("hit ground");
      this.yVelocity *= -1;
    }
    if (this.yPos + this.radius > height + 100) {
      this.yPos = 500;
      this.xPos = width / 2;
      this.xVelocity = 5;
      this.yVelocity = 5;
      platform.xPos = width / 2 - platform.width / 2;
      gameScore.lives -= 1;
    }

    if (
      this.xPos >= platform.xPos &&
      this.xPos <= platform.xPos + platform.width &&
      this.yPos + this.radius === platform.yPos
    ) {
      this.yVelocity *= -1;
    }
    //brick check
    for (let brick of bricks) {
      if (
        !brick.destroyed &&
        this.xPos + this.radius > brick.xPos &&
        this.xPos - this.radius < brick.xPos + brick.width &&
        this.yPos + this.radius > brick.yPos &&
        this.yPos - this.radius < brick.yPos + brick.height
      ) {
        //smallest distance from left/right and top/bottom
        let distanceFromX = Math.min(
          this.xPos - brick.xPos,
          brick.xPos + brick.width - this.xPos
        );
        let distanceFromY = Math.min(
          this.yPos - brick.yPos,
          brick.yPos + brick.height - this.yPos
        );

        //if left/right is closest bounce as if wall, else as if ground/roof
        if (distanceFromX < distanceFromY) {
          this.xVelocity *= -1;
        } else {
          this.yVelocity *= -1;
        }

        //break/damage brick
        if (brick.hitpoints === 1) {
          brick.destroyed = true;
          gameScore.score += 1;
        }
        brick.hitpoints -= 1;
      }
    }
  }
  draw() {
    fill(255, 255, 255);
    ellipse(this.xPos, this.yPos, 20, this.radius * 2);
  }
}
