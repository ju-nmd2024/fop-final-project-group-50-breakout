export default class Platform {
  constructor() {
    this.xPos = width / 2;
    this.yPos = 570;
  }

  update() {
    if (keyIsDown(LEFT_ARROW)) {
    }
  }
  draw() {
    rect(this.xPos, this.yPos, 120, 20);
  }
}
