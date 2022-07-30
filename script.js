// Const
const blockSize = 25;
const rows = 20;
const cols = 20;

// Board
let board;
let context;
let gameOver = false;

// Snake head
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let velocityX = 0;
let velocityY = 0;

let snakeBody = [];

// Food
let foodX;
let foodY;

// Touch
let xDown = null;                                                        
let yDown = null;

// Const variables
const supportsTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);

// Functions
const update = () => {
    if (gameOver) return;

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    for (let i = snakeBody.length-1; i > 0; i--) snakeBody[i] = snakeBody[i-1];
    if (snakeBody.length) snakeBody[0] = [snakeX, snakeY];

    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);

    // Game over conditions
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) gameOver = true;
    for (let i = 0; i < snakeBody.length; i++) if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) gameOver = true;
    if(gameOver) {
        alert("Game Over");
        location.reload();
    }
};

const changeDirection = (e) => {
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
};

const placeFood = () => {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
};

const load = () => {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 100);
};

const getTouches = (evt) => {
  return evt.touches || // browser API
         evt.originalEvent.touches; // jQuery
};

const handleTouchStart = (evt) => {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};

const handleTouchMove = (evt) => {
    if (! xDown || ! yDown ) return;

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
    
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
        if ( xDiff > 0 ) {
            /* right swipe */
            document.dispatchEvent(new KeyboardEvent('keypress', {'key': 'ArrowRight'}));
        } else {
            /* left swipe */
            document.dispatchEvent(new KeyboardEvent('keypress', {'key': 'ArrowLeft'}));
        }
    } else {
        if ( yDiff > 0 ) {
            /* down swipe */
            document.dispatchEvent(new KeyboardEvent('keypress', {'key': 'ArrowDown'}));
        } else {
            /* up swipe */
            document.dispatchEvent(new KeyboardEvent('keypress', {'key': 'ArrowUp'}));
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};

// Initialization
window.addEventListener("load", load);
if (supportsTouch) {
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);
}
