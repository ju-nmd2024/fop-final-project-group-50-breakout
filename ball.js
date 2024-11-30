import { width, height, platform, bricks, gameScore } from "./game.js";
export default class Ball {
  constructor() {
    this.xPos = width / 2;
    this.yPos = 530;
    this.radius = 10;
    this.xVelocity = 0;
    this.yVelocity = 5;
  }

  update() {
    this.xPos += this.xVelocity;
    this.yPos += this.yVelocity;

    //wall bounce
    if (this.xPos - this.radius < 0 || this.xPos + this.radius > width) {
      this.xVelocity *= -1;
    }
    //roof bounce
    if (this.yPos - this.radius < 0) {
      this.yVelocity *= -1;
    }
    //floor death check
    if (this.yPos + this.radius > height + 100) {
      this.yPos = 500;
      this.xPos = width / 2;
      this.xVelocity = 0;
      this.yVelocity = 5;
      platform.xPos = width / 2 - platform.width / 2;
      gameScore.lives -= 1;
    }

    //paddle bounce

    if (this.yPos + this.radius === platform.yPos) {
      for (let i = 0; i <= platform.width; i++) {
        if (
          Math.abs(this.xPos - (platform.xPos + i)) <= 3 &&
          i < platform.width / 2
        ) {
          console.log("left");
          this.yVelocity *= -1;
          this.xVelocity = -0.15 * (platform.width / 2 - i);
          break;
        }
        if (
          Math.abs(this.xPos - (platform.xPos + i)) <= 3 &&
          i > platform.width / 2
        ) {
          console.log("right");
          this.yVelocity *= -1;
          this.xVelocity = -0.15 * (platform.width / 2 - i);
          break;
        }
      }
    }

    //brick bounce
    for (let brick of bricks) {
      if (
        !brick.destroyed &&
        this.xPos + this.radius > brick.xPos - brick.width / 2 &&
        this.xPos - this.radius < brick.xPos + brick.width / 2 &&
        this.yPos + this.radius > brick.yPos - brick.height / 2 &&
        this.yPos - this.radius < brick.yPos + brick.height / 2
      ) {
        //smallest distance from left/right and top/bottom
        let distanceFromX = Math.min(
          this.xPos - (brick.xPos - brick.width / 2),
          brick.xPos + brick.width / 2 - this.xPos
        );
        let distanceFromY = Math.min(
          this.yPos - (brick.yPos - brick.height / 2),
          brick.yPos + brick.height / 2 - this.yPos
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
