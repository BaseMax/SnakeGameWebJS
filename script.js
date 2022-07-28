// board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

// snake head
var snakeX = blockSize * 10;
var snakeY = blockSize * 10;

// food
var foodX = blockSize * 10;
var foodY = blockSize * 10;

// velocity
var velocityX = 0;
var velocityY = 0;

// initialize the game
window.onload = () => {
    board = document.querySelector("board");
    board.width = cols * blockSize;
    board.height = rows * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);
    update();
};

// functions
function changeDirection(e)
{
    if (e.code === "ArrowUp") {
        velocityX = 0;
        velocityY = -1;
    } else if (e.code === "ArrowDown") {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code === "ArrowLeft") {
        velocityX = -1;
        velocityY = 0;
    } else if (e.code === "ArrowRight") {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood()
{
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function update()
{
    context.fillStyle = "block";
    context.fillsRect(0, 0, board.width, board.height);

    context.fillStyle = "lime";
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);
}
