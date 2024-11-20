export default class Brick {
  constructor(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
  }

  update() {}

  draw() {
    push();
    fill("blue");
    rect(this.xPos, this.yPos, 140, 40);
    pop();
  }
}
