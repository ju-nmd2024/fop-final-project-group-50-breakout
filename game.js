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
export let gameScore = {
  lives: 3,
  score: 0,
};

function setup() {
  createCanvas(800, 600);
  createAssets();
}
window.setup = setup;

function createAssets() {
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

function draw() {
  background(32, 32, 32);

  if (gameState === "start") {
    startScreen();
    ball.draw();
  }
  if (gameState === "play") {
    if (gameScore.lives === 0) {
      gameState = "lose";
    }

    ball.draw();
    ball.update();
    platform.update();
    textSize(30);
    textStyle(BOLD);
    fill(255);
    text(`lives left = ${gameScore.lives}`, 10, 35);
    text(`Score = ${gameScore.score}`, 630, 35);
  }
  if (gameState === "lose") {
    loseScreen();
  }

  if (gameState === "win") {
    winScreen();
  }

  let destroyedBricksAmount = 0;

  for (let brick of bricks) {
    brick.draw();
    if (brick.destroyed) {
      destroyedBricksAmount += 1;
    }
  }
  if (destroyedBricksAmount === 4) {
    gameState = "win";
  }

  platform.draw();
}
window.draw = draw;

function startScreen() {
  push();
  // fill("grey");
  // rect(200, 250, 400, 200);
  textSize(50);
  fill(255);
  textStyle(BOLD);
  text("BREAKOUT", 260, 330);
  stroke(255);
  strokeWeight(3);
  fill(32, 32, 32);
  rect(290, 360, 220, 50, 10);
  noStroke();
  textSize(30);
  fill(255);
  text("press to play", 307, 395);
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
  push();
  // fill("grey");
  // rect(200, 250, 400, 200);
  textSize(40);
  textSize(50);
  fill(255);
  textStyle(BOLD);
  text("YOU WIN", 290, 330);
  fill(255, 0, 0);
  stroke(255);
  strokeWeight(3);
  fill(32, 32, 32);
  rect(290, 360, 220, 50, 10);
  noStroke();
  textSize(30);
  fill(255);
  text("press to replay", 294, 395);
  pop();

  if (
    mouseIsPressed &&
    mouseX >= 290 &&
    mouseX <= 510 &&
    mouseY >= 360 &&
    mouseY <= 410
  ) {
    gameState = "play";
    gameScore.lives = 3;
    bricks = [];
    createAssets();
  }
}

function loseScreen() {
  push();
  // fill("grey");
  // rect(200, 250, 400, 200);
  textSize(50);
  fill(255);
  textStyle(BOLD);
  text("GAME OVER", 245, 330);
  fill(255, 0, 0);
  stroke(255);
  strokeWeight(3);
  fill(32, 32, 32);
  rect(290, 360, 220, 50, 10);
  noStroke();
  textSize(30);
  fill(255);
  text("press to retry", 305, 395);
  pop();

  if (
    mouseIsPressed &&
    mouseX >= 290 &&
    mouseX <= 510 &&
    mouseY >= 360 &&
    mouseY <= 410
  ) {
    gameState = "play";
    gameScore.lives = 3;
    bricks = [];
    createAssets();
  }
}
