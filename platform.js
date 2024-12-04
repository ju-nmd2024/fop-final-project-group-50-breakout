import { width, powerups, gameScore } from "./game.js";

export default class Platform {
  constructor() {
    this.width = 120;
    this.height = 20;
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

    for (let powerup of powerups) {
      if (
        !powerup.consumed &&
        powerup.xPos + 20 >= this.xPos &&
        powerup.xPos - 20 <= this.xPos + this.width &&
        powerup.yPos + 20 >= this.yPos &&
        powerup.yPos - 20 <= this.yPos + this.height
      ) {
        powerup.consumed = true;
        gameScore.currentPowerups.push({
          type: powerup.type,
          duration: 300,
        });
      }
    }

    if (
      gameScore.currentPowerups.some(
        (powerup) => powerup.type === "wideplatform"
      )
    ) {
      this.width = 180;
    } else {
      this.width = 120;
    }
  }
  draw() {
    noStroke();
    fill("white");
    rect(this.xPos, this.yPos, this.width, this.height, 5);
  }
}
