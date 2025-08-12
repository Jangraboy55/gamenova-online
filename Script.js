let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

let snake = [{ x: 160, y: 160 }];
let food = { x: 320, y: 320 };
let dx = 16;
let dy = 0;

function startGame() {
    document.querySelector("canvas").style.display = "block";
    document.querySelector(".game-list").style.display = "none";
    document.addEventListener("keydown", changeDirection);
    setInterval(drawGame, 100);
}

function changeDirection(event) {
    if (event.key === "ArrowUp" && dy === 0) { dx = 0; dy = -16; }
    else if (event.key === "ArrowDown" && dy === 0) { dx = 0; dy = 16; }
    else if (event.key === "ArrowLeft" && dx === 0) { dx = -16; dy = 0; }
    else if (event.key === "ArrowRight" && dx === 0) { dx = 16; dy = 0; }
}

function drawGame() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "lime";
    snake.forEach(part => ctx.fillRect(part.x, part.y, 16, 16));

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, 16, 16);

    let head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food.x = Math.floor(Math.random() * 50) * 16;
        food.y = Math.floor(Math.random() * 37) * 16;
    } else {
        snake.pop();
    }

    if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height || 
        snake.slice(1).some(part => part.x === head.x && part.y === head.y)) {
        alert("Game Over! Refresh to play again.");
        snake = [{ x: 160, y: 160 }];
        dx = 16;
        dy = 0;
    }
                            }
