// Select elements
const ball = document.getElementById("ball");
const paddleLeft = document.getElementById("paddle-left");
const paddleRight = document.getElementById("paddle-right");
const gameContainer = document.querySelector(".game-container");

// Game state
let ballX = 390; // Ball initial position
let ballY = 240;
let ballSpeedX = 3; // Ball movement speed
let ballSpeedY = 3;

let paddleLeftY = 200; // Left paddle position
let paddleRightY = 200; // Right paddle (computer) position
const paddleSpeed = 10; // Speed for player paddle
const computerSpeed = 2.5; // Speed for computer paddle

// Dimensions
const paddleHeight = 100;
const ballSize = 20;
const containerHeight = 500;

// Event listeners for paddle movement
document.addEventListener("keydown", (e) => {
    // Left paddle controls (Up and Down arrow keys)
    if (e.key === "ArrowUp" && paddleLeftY > 0) {
        paddleLeftY -= paddleSpeed;
    } else if (e.key === "ArrowDown" && paddleLeftY < containerHeight - paddleHeight) {
        paddleLeftY += paddleSpeed;
    }

    updatePaddlePositions();
});

// Function to update paddle positions
function updatePaddlePositions() {
    paddleLeft.style.top = `${paddleLeftY}px`;
    paddleRight.style.top = `${paddleRightY}px`;
}

// Function to move the ball
function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom walls
    if (ballY <= 0 || ballY >= containerHeight - ballSize) {
        ballSpeedY *= -1;
    }

    // Ball collision with left paddle
    if (
        ballX <= 10 && // Left paddle boundary
        ballY >= paddleLeftY &&
        ballY <= paddleLeftY + paddleHeight
    ) {
        ballSpeedX *= -1; // Bounce back
    }

    // Ball collision with right paddle
    if (
        ballX >= 780 && // Right paddle boundary
        ballY >= paddleRightY &&
        ballY <= paddleRightY + paddleHeight
    ) {
        ballSpeedX *= -1; // Bounce back
    }

    // Check for scoring
    if (ballX <= 0 || ballX >= 800) {
        resetBall();
    }

    // Update ball position
    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;
}

// Function to control the computer paddle
function moveComputerPaddle() {
    // Move the right paddle to follow the ball
    if (paddleRightY + paddleHeight / 2 < ballY) {
        paddleRightY += computerSpeed; // Move down
    } else if (paddleRightY + paddleHeight / 2 > ballY) {
        paddleRightY -= computerSpeed; // Move up
    }

    // Prevent paddle from moving out of bounds
    paddleRightY = Math.max(0, Math.min(paddleRightY, containerHeight - paddleHeight));
}

// Function to reset the ball to the center
function resetBall() {
    ballX = 390;
    ballY = 240;
    ballSpeedX *= -1; // Reverse direction
    ballSpeedY = 3; // Reset speed
}

// Game loop
function gameLoop() {
    moveBall();
    moveComputerPaddle();
    updatePaddlePositions();
    requestAnimationFrame(gameLoop);
}

// Initialize game
updatePaddlePositions();
gameLoop();
