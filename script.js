// board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;
var gameOver = false;

// snake head
var snakeX = blockSize * 10;
var snakeY = blockSize * 10;

// food
var foodX = blockSize * 10;
var foodY = blockSize * 10;

// velocity
var velocityX = 0;
var velocityY = 0;
var snakeBody = [];

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
    if (e.code === "ArrowUp" && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.code === "ArrowDown" && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code === "ArrowLeft" && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.code === "ArrowRight" && velocityX !== -1) {
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
    if (gameOver) return;

    context.fillStyle = "block";
    context.fillsRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push([
            foodX,
            foodY
        ]);
        placeFood();
    }

    for (let i = snakeBody.length; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    context.fillStyle = "lime";
    snakeY += velocityY * blockSize;
    snakeX += velocityX * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // game over
    if (snakeX < 0 || snakeX > board.width || snakeY < 0 || snakeY > board.height) {
        gameOver = true;
        alert("Game Over");
        return;
    }
    for (let i = 1; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
            return;
        }
    }

}
