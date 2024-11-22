import Platform from "./platform.js";
import Brick from "./brick.js";
import Ball from "./ball.js";

export const width = 800;
export const height = 600;
export let platform;
export let bricks = [];
let rowAmount = 4;
let ball;

console.log(Ball);

function setup() {
  createCanvas(800, 600);
  ball = new Ball();
  platform = new Platform();

  for (let rowNumber = 0; rowNumber < rowAmount; rowNumber++) {
    //row
    for (let brickNumber = 0; brickNumber < 5; brickNumber++) {
      bricks.push(
        new Brick(
          10 + brickNumber * 160,
          0 + rowNumber * 50,
          rowAmount - rowNumber
        )
      );
    }
  }
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
