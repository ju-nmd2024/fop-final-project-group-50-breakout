export default class Platform {
  constructor() {
    this.xPos = width / 2;
    this.yPos = 570;
  }
  draw() {
    rect(this.xPos, this.yPos, 120, 20);
  }
}
