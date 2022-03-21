let snake;
let rez = 20;
let food;
let w;
let h;
let score;

function setup() {
  createCanvas(600, 600);
  w = 600;
  h = 600;
  frameRate(15);

  snake = new Snake();
  foodLocation();
  score = 0;
}

function foodLocation() {
  let x;
  let y;
  const min = 20;
  const max = 580;

  x = randomCoord(min, max);
  y = randomCoord(min, max);
  console.log(`Food Coords: ${x},${y}`);
  food = createVector(x, y);
  score++;
}

function randomCoord(min, max) {
  let randomNum;
  while (randomNum % rez != 0) {
    randomNum = floor(min + Math.random() * (max - min));
  }
  return randomNum;
}

function keyPressed() {
  switch (keyCode) {
    case LEFT_ARROW:
      snake.setDir(-rez, 0);
      break;
    case RIGHT_ARROW:
      snake.setDir(rez, 0);
      break;
    case DOWN_ARROW:
      snake.setDir(0, rez);
      break;
    case UP_ARROW:
      snake.setDir(0, -rez);
      break;
    case 32:
      window.location.reload();
      break;
  }
}

function draw() {
  // scale(rez);
  background(220);

  if (snake.eat(food)) {
    foodLocation();
  }

  snake.update();
  snake.show();

  // Food
  strokeWeight(1);
  fill(91, 22, 16);
  rect(food.x, food.y, rez, rez);

  // Score
  textSize(16);
  fill(0);
  text(`Score: ${score}`, width / 12, height / 12);

  if (snake.endGame()) {
    print(`GAME OVER\nSCORE: ${score}`);
    background(0, 169, 165);

    fill(0);
    textSize(32);
    textAlign(CENTER);
    text('Game Over', width / 2, height / 2 - 10);
    text(`Score: ${score}`, width / 2, height / 2 + 40);
    textSize(16);
    text('SPACE to Play Again', width / 2, height / 2 + 80);

    noLoop();
  }
}
