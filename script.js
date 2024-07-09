const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

// Game objects and variables
const paddle = { x: 350, y: 580, width: 100, height: 10 };
const ball = { x: 400, y: 300, radius: 5, dx: 3, dy: -3 };
const bricks = [];
const brickRowCount = 5;
const brickColumnCount = 10;
const brickWidth = 75;
const brickHeight = 20;

let score = 0;
let gameOver = false;

// Create bricks
for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
        bricks.push({ x: c * (brickWidth + 5) + 5, y: r * (brickHeight + 5) + 5, width: brickWidth, height: brickHeight, visible: true });
    }
}

// Mouse movement
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    paddle.x = e.clientX - rect.left - paddle.width / 2;

    // Keep paddle within canvas bounds
    if (paddle.x < 0) {
        paddle.x = 0;
    }
    if (paddle.x + paddle.width > canvas.width) {
        paddle.x = canvas.width - paddle.width;
    }
});

// Game loop
function gameLoop() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw paddle
    ctx.fillStyle = '#0f0';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    
    // Draw ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#0f0';
    ctx.fill();
    ctx.closePath();
    
    // Draw bricks
    bricks.forEach(brick => {
        if (brick.visible) {
            ctx.fillStyle = '#0f0';
            ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
        }
    });
    
    // Move ball
    ball.x += ball.dx;
    ball.y += ball.dy;
    
    // Ball collision detection
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
    }
    if (ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }
    
    // Paddle collision detection
    if (ball.y + ball.radius > paddle.y && ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
        ball.dy = -ball.dy;
    }
    
    // Brick collision detection
    bricks.forEach(brick => {
        if (brick.visible && 
            ball.x > brick.x && 
            ball.x < brick.x + brick.width && 
            ball.y > brick.y && 
            ball.y < brick.y + brick.height) {
            ball.dy = -ball.dy;
            brick.visible = false;
            score++;
        }
    });
    
    // Game over condition
    if (ball.y + ball.radius > canvas.height) {
        gameOver = true;
        ctx.fillStyle = '#0f0';
        ctx.font = '30px
