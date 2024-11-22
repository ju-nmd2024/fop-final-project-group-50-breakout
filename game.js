import Platform from "./platform.js";
import Brick from "./brick.js";
import Ball from "./ball.js";

export const width = 800;
export const height = 600;
export let bricks = [];
export let platform;
let ball;

console.log(Ball);

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
  platform.update();
}
window.draw = draw;
