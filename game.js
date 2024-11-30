import Platform from "./platform.js";
import Brick from "./brick.js";
import Ball from "./ball.js";
import Powerup from "./powerup.js";

export const width = 750;
export const height = 600;
export let platform;
export let bricks = [];
const powerups = [];
let rowAmount = 4;
let ball;
let gameState = "start";
const powerupAmount = 5;
const powerupTypes = ["powerball", "slowball", "wideplatform"];
export let gameScore = {
  lives: 3,
  score: 0,
};

function setup() {
  createCanvas(width, height);
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
          75 + brickNumber * 150,
          25 + (rowNumber + 1) * 50,
          rowAmount - rowNumber
        )
      );
    }
  }
  generatePowerups();
}

function generatePowerups() {
  let n = 0;
  while (n < powerupAmount) {
    const index = Math.floor(Math.random() * bricks.length);
    const powerup =
      powerupTypes[Math.floor(Math.random() * powerupTypes.length)];
    if (!powerups.some((powerupObject) => powerupObject.index === index)) {
      powerups.push({
        index: index,
        powerup: new Powerup(bricks[index].xPos, bricks[index].yPos, powerup),
      });
      n++;
    }
  }
  console.log(powerups);
}

function draw() {
  background(32, 32, 32);
  let destroyedBricksAmount = 0;

  for (let brick of bricks) {
    // brick.draw();
    if (brick.destroyed) {
      destroyedBricksAmount += 1;
    }

    for (let powerupObject of powerups) {
      powerupObject.powerup.update();
      powerupObject.powerup.draw();
    }
  }
  if (destroyedBricksAmount === bricks.length) {
    gameState = "win";
  }
  platform.draw();

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

    push();
    textSize(30);
    textStyle(BOLD);
    fill(255);
    text(`Lives left = ${gameScore.lives}`, 10, 35);
    text(`Score = ${gameScore.score}`, 590, 35);
    pop();
  }
  if (gameState === "lose") {
    loseScreen();
  }

  if (gameState === "win") {
    winScreen();
  }
}
window.draw = draw;

function button(buttonText, color) {
  push();
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  fill(color);
  stroke(255);
  strokeWeight(3);
  rect(width / 2, height / 1.5, 250, 50, 10);
  noStroke();
  textSize(30);
  fill(255);
  text(buttonText, width / 2, height / 1.5);
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
function startScreen() {
  push();
  textAlign(CENTER);
  textSize(50);
  fill(255);
  textStyle(BOLD);
  text("BREAKOUT", width / 2, 330);
  button("press to play", "green");

  pop();
}

function winScreen() {
  push();
  textAlign(CENTER);
  textSize(40);
  textSize(50);
  fill(255);
  textStyle(BOLD);
  text("YOU WIN", width / 2, 330);
  button("press to replay", "green");
  pop();
}

function loseScreen() {
  push();
  textAlign(CENTER);
  textSize(50);
  fill(255);
  textStyle(BOLD);
  text("GAME OVER", width / 2, 330);
  button("press to retry", "red");
  pop();
  push();
  textSize(30);
  textStyle(BOLD);
  fill(255);
  text(`lives left = ${gameScore.lives}`, 10, 35);
  text(`Score = ${gameScore.score}`, 590, 35);
  pop();
}
