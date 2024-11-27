import Platform from "./platform.js";
import Brick from "./brick.js";
import Ball from "./ball.js";

export const width = 800;
export const height = 600;
export let platform;
export let bricks = [];
let rowAmount = 4;
let ball;
let gameState = "start";
let lives = 3;

export function decrementLives() {
  lives -= 1;
}

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
          0 + (rowNumber + 1) * 50,
          rowAmount - rowNumber
        )
      );
    }
  }
}
window.setup = setup;

function draw() {
  background("grey");

  if (gameState === "start") {
    startScreen();
  }
  if (gameState === "play") {
    if (lives === 0) {
      gameState = "lose";
    }

    ball.update();
    platform.update();
    textSize(30);
    fill(0, 0, 0);
    text(`lives = ${lives}`, 10, 30);
  }
  if (gameState === "lose") {
    loseScreen();
  }
  for (let brick of bricks) {
    brick.draw();
  }

  ball.draw();

  platform.draw();
}
window.draw = draw;

function startScreen() {
  push();
  fill("grey");
  rect(200, 250, 400, 200);
  textSize(40);
  fill(0, 0, 0);
  text("BREAKOUT", 290, 330);
  fill(0, 255, 0);
  rect(290, 360, 220, 50);
  textSize(30);
  fill(0, 0, 0);
  text("Press to play", 310, 395);
  pop();

  if (
    mouseIsPressed &&
    mouseX >= 290 &&
    mouseX <= 510 &&
    mouseY >= 360 &&
    mouseY <= 410
  ) {
    gameState = "play";
  }
}

function winScreen() {
  background(0, 255, 0);
  textSize(40);
  fill(0);
  text("You saved the CROC!", 210, 200);
  text("Press r to replay.", 255, 300);
}

function loseScreen() {
  push();
  fill("grey");
  rect(200, 250, 400, 200);
  textSize(40);
  fill(0, 0, 0);
  text("GAME OVER", 290, 330);
  fill(255, 0, 0);
  rect(290, 360, 220, 50);
  textSize(30);
  fill(0, 0, 0);
  text("Press to retry", 310, 395);
  pop();

  if (
    mouseIsPressed &&
    mouseX >= 290 &&
    mouseX <= 510 &&
    mouseY >= 360 &&
    mouseY <= 410
  ) {
    gameState = "play";
  }
}
