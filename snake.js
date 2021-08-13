var SIZE = 20;
var SQUARESIZE;
var apple = [];
var snake = [];

var isPause = false;

var x = 0;
var y = 0;

function setup() {
  createCanvas(400,400);
  this.SQUARESIZE = width / this.SIZE;
  startGame();
}

function draw() {
  background(0);
  if (checkWin()) {
    textSize(50);
    textAlign(CENTER, CENTER);
    fill(255);
    text('Well play', width /2 , height / 2);
  } else {

    if (frameCount % 5 == 0) {
      moveSnake();
    }

    if (snake[0][0] == apple[0] && snake[0][1] == apple[1]) {
      eaten();
    }

    if (snake.length > 4) {
      for (let i = 1; i < snake.length; i++) {
        part = snake[i];
        if (snake[0][0] == snake[i][0] && snake[0][1] == snake[i][1]) {
          startGame();
        }
      }
    }

    if (snake[0][0] > this.SIZE - 1 || snake[0][0] < 0 || snake[0][1] > this.SIZE - 1 || snake[0][1] < 0) {
      startGame();
    }

    drawApple();
    drawSnake();

  }
}

function checkWin() {
  if (snake.length == this.SIZE * this.SIZE) {
    return true;
  }
}

function startGame() {
  this.x = 0;
  this.y = 0;
  newApple();
  snake = [];
  snake.push(new Array());
  snake[0].push(int(random(this.SIZE)),int(random(this.SIZE)));
}

function eaten() {
  newSnakeX = snake[snake.length - 1][0];
  newSnakeY = snake[snake.length - 1][1];
  snake.push(new Array());
  snake[snake.length - 1][0] = newSnakeX;
  snake[snake.length - 1][1] = newSnakeY;
  newApple();
}

function drawSnake(){
  for (let partId = 0; partId < snake.length; partId++) {
    fill(255);
    rect(snake[partId][0] * this.SQUARESIZE,snake[partId][1] * this.SQUARESIZE,this.SQUARESIZE,this.SQUARESIZE);
  }
}

function moveSnake(){
  if (!this.isPause) {
    //Move the snake
    snake.unshift(new Array());
    snake[0][0] = snake[1][0] + x;
    snake[0][1] = snake[1][1] + y;
    snake.pop();
  }
}

function newApple(){
  var goodPosition = false;
  while (!goodPosition) {
    apple = [];
    goodPosition = true;
    var appleX = int(random(this.SIZE));
    var appleY = int(random(this.SIZE));
    for (let i = 0; i < snake.length; i++) {
      part = snake[i];
      if (part[0] == appleX && part[1] == appleY) {
        goodPosition = false;
      }
    }
  }
  apple.push(appleX, appleY);
}

function drawApple(){
  fill(255,0,0);
  rect(apple[0] * this.SQUARESIZE,apple[1] * this.SQUARESIZE,this.SQUARESIZE,this.SQUARESIZE);
}

function keyPressed(){
  if (key == 'ArrowUp') {
    if (!(this.x == 0 && this.y == 1)) {
      this.x = 0;
      this.y = -1;
      this.isPause = false;
    }
  } else if (key == 'ArrowLeft') {
    if (!(this.x == 1 && this.y == 0)) {
      this.x = -1;
      this.y = 0;
      this.isPause = false;
    }
  } else if (key == 'ArrowDown') {
    if (!(this.x == 0 && this.y == -1)) {
      this.x = 0;
      this.y = 1;
      this.isPause = false;
    }
  } else if (key == 'ArrowRight') {
    if (!(this.x == -1 && this.y == 0)) {
      this.x = 1;
      this.y = 0;
      this.isPause = false;
    }
  } else if (key == 'Escape') {
    startGame();
  } else if (key == ' ') {
    this.isPause = !this.isPause;
  }
}