export default class Brick {
  constructor(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = 140;
    this.height = 40;
    this.destroyed = false;
  }

  update() {}

  draw() {
    push();
    fill("blue");
    rect(this.xPos, this.yPos, this.width, this.height);
    pop();
  }
}
