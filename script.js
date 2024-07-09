const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

// Game objects and variables
const paddle = { x: 350, y: 580, width: 100, height: 10 };
const ball = { x: 400, y: 300, radius: 5, dx: 2, dy: -2 };
const bricks = [];
const brickRowCount = 5;
const brickColumnCount = 10;
const brickWidth = 75;
const brickHeight = 20;

// Create bricks
for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
        bricks.push({ x: c * (brickWidth + 5) + 5, y: r * (brickHeight + 5) + 5, width: brickWidth, height: brickHeight });
    }
}

// Game loop
function gameLoop() {
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
        ctx.fillStyle = '#0f0';
        ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
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
    if (ball.y + ball.radius > paddle.y && ball.x > paddle.x && ball.x < paddle.x
