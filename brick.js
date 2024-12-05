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
      // changed rectangle mode to center which puts the start of x and y position in the center of the rectangle.
      // some brick position calculations may look a bit different because of this
      rectMode(CENTER);

      //different color depending on hitpoints left
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
