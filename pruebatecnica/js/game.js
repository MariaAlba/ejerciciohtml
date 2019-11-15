/*
    JS para el mítico juego de arkanoid
*/

console.log("Comenzamos a jugar");

var canvas = document.getElementById("myCanvas");
// sobre la variable canvas el contexto sera en 2 d
var ctx = canvas.getContext("2d");

var x = canvas.width / 2;
var y = canvas.height - 30;

//cambiando el  avance cambio la velocidad y la direccion
var dx = 0.5; //(- hacia la izquierda y + hacia la derecha)
var dy = -0.5; //(- hacia arriba y + hacia abajo)

//para que no se hunda en las paredes
var ballRadius = 10;

//definir pala para golpear la bola
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

//para controlar la pala
var rightPressed = false;
var leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

//variables ladrillos
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];
for (c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

//contador
var score = 0;

//vidas
var lives = 3;

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    }
    else if (e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    }
    else if (e.keyCode == 37) {
        leftPressed = false;
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function collisionDetection() {
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score == brickRowCount * brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

//dibujar ladrillos
function drawBricks() {
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

//dibujar pelota
function drawBall(color) {

    ctx.beginPath();
    // ctx.arc(x, y, 10, 0, Math.PI*2);
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    // ctx.fillStyle = "#0095DD";
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();

}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    //borrar rectangulo
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //dibujar ladrillos
    drawBricks();
    //dibujar
    drawBall();
    //dibujar pala
    drawPaddle();
    //contador
    drawScore();
    //vidas
    drawLives();
    //
    collisionDetection();


    //borde izquierda y derecha
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
        drawBall(randomColor());

    }

    //borde inferior y superior
    /*  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
         dy = -dy;
         drawBall(randomColor());
     } */
    //modificacion para que no pueda tocar el borde inferior
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;

        }
        else {
            lives--;
            if (!lives) {
                alert("GAME OVER");
                document.location.reload();
            }
            else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }

    //mover la pala
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    //actualizar posicion
    x += dx;
    y += dy;

    requestAnimationFrame(draw);
}


draw();


function randomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


//cuadrado
/* ctx.beginPath();
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();

//circulo
ctx.beginPath();
ctx.arc(240, 160, 20, 0, Math.PI*2, false);
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath()

//stroke en vez de fill
ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
ctx.stroke();
ctx.closePath(); */