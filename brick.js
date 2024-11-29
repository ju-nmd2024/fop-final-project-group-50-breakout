export default class Brick {
  constructor(xPos, yPos, hitpoints) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = 140;
    this.height = 40;
    this.destroyed = false;
    this.hitpoints = hitpoints;
  }

  update() {}

  draw() {
    if (!this.destroyed) {
      push();

      // switch (this.hitpoints) {
      //   case 4:
      //     fill("red");
      //     break;
      //   case 3:
      //     fill("orange");
      //     break;
      //   case 2:
      //     fill("lime");
      //     break;
      //   case 1:
      //     fill("yellow");
      //     break;
      // }

      if (this.hitpoints === 4) {
        fill("red");
      }
      if (this.hitpoints === 3) {
        fill("orange");
      }
      if (this.hitpoints === 2) {
        fill("lime");
      }
      if (this.hitpoints === 1) {
        fill("yellow");
      }
      noStroke();
      rect(this.xPos, this.yPos, this.width, this.height, 10);
      pop();
    }
  }
}
