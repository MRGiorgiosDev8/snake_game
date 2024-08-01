const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreBox = document.getElementById("scoreBox");

const usernameModal = document.getElementById("usernameModal");
const startGameBtn = document.getElementById("startGameBtn");
const usernameInput = document.getElementById("usernameInput");

const gameOverModal = document.getElementById("gameOverModal");
const restartBtn = document.getElementById("restartBtn");
const finalScore = document.getElementById("finalScore");

const box = 20;
let snake;
let food;
let score;
let d;
let game;
let username;
let gamepadIndex = null;

document.addEventListener("keydown", direction);
restartBtn.addEventListener("click", restartGame);
startGameBtn.addEventListener("click", startGame);

window.addEventListener("gamepadconnected", (event) => {
    console.log("Gamepad connected:", event.gamepad);
    gamepadIndex = event.gamepad.index;
});

window.addEventListener("gamepaddisconnected", (event) => {
    console.log("Gamepad disconnected:", event.gamepad);
    if (gamepadIndex === event.gamepad.index) {
        gamepadIndex = null;
    }
});

function startGame() {
    username = usernameInput.value;
    if (username) {
        gsap.to("#usernameModal .modal-content", { 
            duration: 0.3, 
            opacity: 0, 
            onComplete: () => {
                usernameModal.style.display = "none";
                init();
                gsap.fromTo("#scoreBox", { 
                    x: 100, 
                    opacity: 0, 
                    ease: "power1.inOut", 
                    display: "none" 
                }, { 
                    duration: 0.6, 
                    x: 0, 
                    opacity: 1, 
                    display: "block" 
                });
            }
        });
    } else {
        alert("Please enter your name.");
    }
}

function init() {
    snake = [];
    snake[0] = { x: 9 * box, y: 10 * box };
    food = {
        x: Math.floor(Math.random() * 19 + 1) * box,
        y: Math.floor(Math.random() * 19 + 1) * box
    };
    score = 0;
    d = null;
    scoreBox.textContent = "Score: " + score;
    scoreBox.style.display = "block"; 
    if (game) clearInterval(game);
    game = setInterval(draw, 100);
    gameOverModal.style.display = "none";
    updateGamepad();
}

function direction(event) {
    if (event.keyCode == 37 && d != "RIGHT") {
        d = "LEFT";
    } else if (event.keyCode == 38 && d != "DOWN") {
        d = "UP";
    } else if (event.keyCode == 39 && d != "LEFT") {
        d = "RIGHT";
    } else if (event.keyCode == 40 && d != "UP") {
        d = "DOWN";
    }
}

function collision(newHead, snake) {
    return snake.some(segment => newHead.x === segment.x && newHead.y === segment.y);
}

function sendScore(score) {
    fetch('/save_score/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify({ score: score, username: username })
    })
    .then(response => response.json())
    .then(data => console.log('Score saved:', data))
    .catch(error => console.error('Error:', error));
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? "#49C75D" : "#88C635";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "white";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "#F75656";
    ctx.fillRect(food.x, food.y, box, box);
    ctx.strokeStyle = "white";
    ctx.strokeRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (d === "LEFT") snakeX -= box;
    if (d === "UP") snakeY -= box;
    if (d === "RIGHT") snakeX += box;
    if (d === "DOWN") snakeY += box;

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
        scoreBox.textContent = "Score: " + score;
        animateFood();
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        sendScore(score);
        showGameOverModal();
        return;
    }

    snake.unshift(newHead);
}

function showGameOverModal() {
    finalScore.textContent = "Score: " + score;
    gameOverModal.style.display = "flex";
    gsap.fromTo("#gameOverModal .modal-content", 
        { scale: 0, opacity: 0 }, 
        { duration: 0.4, scale: 1, opacity: 1, ease: "power2.inOut" }
    );
}

function restartGame() {
    init();
}

function updateGamepad() {
    if (gamepadIndex !== null) {
        const gamepad = navigator.getGamepads()[gamepadIndex];
        if (gamepad) {
            if (gamepad.buttons[14].pressed && d != "RIGHT") { 
                d = "LEFT";
            } else if (gamepad.buttons[12].pressed && d != "DOWN") { 
                d = "UP";
            } else if (gamepad.buttons[15].pressed && d != "LEFT") { 
                d = "RIGHT";
            } else if (gamepad.buttons[13].pressed && d != "UP") { 
                d = "DOWN";
            }
        }
    }
    requestAnimationFrame(updateGamepad);
}

function animateFood() {
    gsap.fromTo("#gameCanvas", 
        { backgroundColor: "#d9fad29c" }, 
        {   ease: "bounce.out",
            duration: 0.3, 
            backgroundColor: "#fff", 
            onComplete: () => {
                canvas.style.backgroundColor = "";
            }
        }
    );
}

init();

setTimeout(() => {
    usernameModal.style.display = "flex";
    gsap.fromTo("#usernameModal .modal-content", 
        { scale: 0, opacity: 0, display: "none" }, 
        { duration: 0.4, scale: 1, opacity: 1, ease: "power2.inOut", display: "block" }
    );
}, 100);