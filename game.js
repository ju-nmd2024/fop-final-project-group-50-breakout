import Platform from "./platform.js";
import Brick from "./brick.js";
import Ball from "./ball.js";
import Powerup from "./powerup.js";

export const width = 750;
export const height = 600;
export let platform;
export let bricks = [];
export let powerups = [];
let rowAmount = 4;
let ball;
let gameState = "start";
const powerupAmount = 3; // extra
const powerupTypes = ["powerball", "wideplatform"]; // extra
export let gameScore = {
  lives: 3,
  score: 0,
  currentPowerups: [], // extra
};

// SETUP
function setup() {
  createCanvas(width, height);
  createAssets();
}
window.setup = setup;

// Ball, platform, bricks, powerup
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
  //extra
  generatePowerups();
}

//generate powerups, extra feature
function generatePowerups() {
  let n = 0;
  while (n < powerupAmount) {
    const index = Math.floor(Math.random() * bricks.length);
    const powerupType =
      powerupTypes[Math.floor(Math.random() * powerupTypes.length)];
    if (!powerups.some((powerup) => powerup.index === index)) {
      powerups.push(
        new Powerup(index, bricks[index].xPos, bricks[index].yPos, powerupType)
      );
      n++;
    }
  }
}

// DRAW
function draw() {
  background(32, 32, 32);

  //draw menu
  //we can put this here because it handles what text to show inside itself.
  menu();

  //draw platform
  platform.draw();

  //draw ball
  if (gameState !== "win" && gameState !== "lose") {
    ball.draw();
  }

  //powerups
  //extra feature starts here
  for (let powerup of powerups) {
    powerup.draw();
    powerup.update();
  }

  for (let powerup of gameScore.currentPowerups) {
    if (powerup.duration <= 0) {
      gameScore.currentPowerups.splice(
        gameScore.currentPowerups.indexOf(powerup),
        1
      );
      break;
    }
    powerup.duration -= 1;
  }
  //ends here

  //temporary variable
  let destroyedBricksAmount = 0;

  //bricks
  for (let brick of bricks) {
    brick.draw();
    if (brick.destroyed) {
      destroyedBricksAmount += 1;
    }
  }

  //win check
  if (destroyedBricksAmount === bricks.length) {
    gameState = "win";
  }

  //lose check
  if (gameScore.lives === 0) {
    gameState = "lose";
  }

  //playing state
  if (gameState === "play") {
    ball.draw();
    ball.update();
    platform.update();
  }

  //the life counter etc. are shown everywhere except on the start menu
  if (gameState !== "start") {
    push();
    textSize(30);
    textStyle(BOLD);
    fill(255);
    text(`Lives left = ${gameScore.lives}`, 10, 35);
    text(`Score = ${gameScore.score}`, 590, 35);
    gameScore.currentPowerups.forEach((powerup, index) => {
      text(
        `${powerup.type} ${Math.round(powerup.duration / 60)}s`,
        width / 3,
        index + 35
      );
    });

    pop();
  }
}
window.draw = draw;

//menu
//it changes text depending on the game state
function menu() {
  push();
  textAlign(CENTER);
  textSize(50);
  fill(255);
  textStyle(BOLD);
  if (gameState === "start") {
    text("BREAKOUT", width / 2, 330);
    button("press to play", "green");
  }
  if (gameState === "win") {
    text("YOU WIN", width / 2, 330);
    button("press to replay", "green");
  }
  if (gameState === "lose") {
    text("GAME OVER", width / 2, 330);
    button("press to retry", "red");
  }
  pop();
}

//play button
//sets state to play and resets variables and assets, bricks etc.
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
    gameScore = {
      lives: 3,
      score: 0,
      currentPowerups: [],
    };
    bricks = [];
    powerups = [];
    createAssets();
  }
}
