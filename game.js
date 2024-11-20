import Platform from "./platform";
import Brick from "./brick";
import Ball from "./ball";

export const width = 800;
export const height = 600;
let bricks = [];
let ball;
let platform;

function setup() {
  createCanvas(800, 600);
  ball = new Ball();
  for (let row = 0; row < 4; row++) {
    //row
    for (let i = 0; i < 5; i++) {
      bricks.push(new Brick(10 + i * 160, 0 + row * 50));
    }
  }

  platform = new Platform();
}
window.setup = setup;

function draw() {
  background("grey");

  for (let brick of bricks) {
    brick.draw();
  }

  ball.draw();
  ball.update();

  platform.draw();
}
window.draw = draw;
