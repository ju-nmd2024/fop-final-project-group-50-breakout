export default class Powerup {
  constructor(xPos, yPos, type) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.type = type;
  }

  update() {
    if (this.type === "slowball") {
    }
  }

  draw() {
    push();
    colorMode(HSB); //aksed chatgpt to help with rainbow strobe effect in p5
    rectMode(CENTER);
    angleMode(DEGREES);

    let hue = frameCount % 360; //gpt
    let col = color(hue, 255, 255); //gpt

    fill(col);
    translate(this.xPos, this.yPos);
    push();
    rotate(45);
    rect(0, 0, 30);
    pop();
    pop();
  }
}
