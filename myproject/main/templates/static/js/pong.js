const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

const paddleWidth = 10, paddleHeight = 100;
const leftPaddle = { x: 10, y: canvas.height/2 - paddleHeight/2, width: paddleWidth, height: paddleHeight, dy: 0 };
const rightPaddle = { x: canvas.width - paddleWidth - 10, y: canvas.height/2 - paddleHeight/2, width: paddleWidth, height: paddleHeight, dy: 0 };
const ball = { x: canvas.width/2, y: canvas.height/2, radius: 8, dx: 5, dy: 5 };

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Dessiner la balle
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = "#FFF";
    ctx.fill();
    ctx.closePath();
    // Dessiner les raquettes
    ctx.fillStyle = "#FFF";
    ctx.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
    ctx.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
}

document.addEventListener('keydown', function(e) {
    // Exemple : touche "Z" pour monter, "S" pour descendre pour le joueur gauche
    if (e.key === 'z' || e.key === 'Z') {
        leftPaddle.dy = 7;
    } else if (e.key === 's' || e.key === 'S') {
        leftPaddle.dy = -7;
    }
    // Pour le joueur droit, vous pouvez utiliser les flèches haut et bas
    if (e.key === 'ArrowUp') {
        rightPaddle.dy = -7;
    } else if (e.key === 'ArrowDown') {
        rightPaddle.dy = 7;
    }
});

function update() {
    // Mettre à jour la position des raquettes
    leftPaddle.y += leftPaddle.dy;
    rightPaddle.y += rightPaddle.dy;

    // Mouvements de la balle
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Gestion des collisions avec les murs (haut et bas)
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }

    // Gestion des collisions avec les raquettes (à compléter avec une détection de collision simple)
    // Exemple de collision pour la raquette gauche :
    if (ball.x - ball.radius < leftPaddle.x + leftPaddle.width &&
        ball.y > leftPaddle.y &&
        ball.y < leftPaddle.y + leftPaddle.height) {
        ball.dx = -ball.dx;
    }

    // Même logique pour la raquette droite...
}


document.addEventListener('keyup', function(e) {
    if (e.key === 'z' || e.key === 'Z' || e.key === 's' || e.key === 'S') {
        leftPaddle.dy = 0;
    }
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        rightPaddle.dy = 0;
    }
});


function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}
gameLoop();
