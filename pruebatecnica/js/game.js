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

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
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

    //dibujar pala
    drawPaddle();
    //dibujar
    drawBall();


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
    if(y + dy < ballRadius) {
        dy = -dy;
    } else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            alert("GAME OVER");
            //document.location.reload();
        }
    }
    
    //mover la pala
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    
    //actualizar posicion
    x += dx;
    y += dy;
}


setInterval(draw, 10);


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