import { width, height, platform, bricks, gameScore } from "./game.js";
export default class Ball {
  constructor() {
    this.xPos = width / 2;
    this.yPos = 530;
    this.radius = 10;
    this.xVelocity = 0;
    this.yVelocity = 5;
    this.powerup;
  }

  update() {
    // ball movement
    this.xPos += this.xVelocity;
    this.yPos += this.yVelocity;

    // wall bounce
    if (this.xPos - this.radius < 0 || this.xPos + this.radius > width) {
      this.xVelocity *= -1;
    }
    // roof bounce
    if (this.yPos - this.radius < 0) {
      this.yVelocity *= -1;
    }
    // floor death check
    if (this.yPos + this.radius > height + 100) {
      this.yPos = 500;
      this.xPos = width / 2;
      this.xVelocity = 0;
      this.yVelocity = 5;
      platform.xPos = width / 2 - platform.width / 2;
      gameScore.lives -= 1;
    }

    // paddle bounce
    // extra feature, ball bounces at different angle depending where it hits the platform
    if (this.yPos + this.radius === platform.yPos) {
      // loops through all x positions within the platforms width
      for (let i = 0; i <= platform.width; i++) {
        // to account for some error, (the balls ypos increases too fast and falls through the platform before finding a matching platform xpos)
        // we istead check if the positions are equal with margin of 3. take the difference and check if smaller or equal to 3
        if (Math.abs(this.xPos - (platform.xPos + i)) <= 3) {
          this.yVelocity *= -1;
          // left side of platform vel. is negative, right side positive. closer to middle less vel.
          this.xVelocity = -0.15 * (platform.width / 2 - i);
          // break to not loop and double bounce
          break;
        }
      }
    }

    // brick bounce
    for (let brick of bricks) {
      if (
        !brick.destroyed &&
        this.xPos + this.radius > brick.xPos - brick.width / 2 &&
        this.xPos - this.radius < brick.xPos + brick.width / 2 &&
        this.yPos + this.radius > brick.yPos - brick.height / 2 &&
        this.yPos - this.radius < brick.yPos + brick.height / 2
      ) {
        // smallest distance from left/right and top/bottom
        let distanceFromX = Math.min(
          this.xPos - (brick.xPos - brick.width / 2),
          brick.xPos + brick.width / 2 - this.xPos
        );
        let distanceFromY = Math.min(
          this.yPos - (brick.yPos - brick.height / 2),
          brick.yPos + brick.height / 2 - this.yPos
        );

        // if left/right is closest bounce as if wall, else as if ground/roof
        if (distanceFromX < distanceFromY) {
          this.xVelocity *= -1;
        } else {
          this.yVelocity *= -1;
        }

        // break/damage brick
        // also extra feature where we check if player has powerball
        if (
          brick.hitpoints === 1 ||
          gameScore.currentPowerups.some(
            (powerup) => powerup.type === "powerball"
          )
        ) {
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
