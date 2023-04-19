import { ctx, chessSquare, canvas} from './canvas.js';
import { drowFood} from './food.js';

let snake = [{ x: 4 * chessSquare, y: 4 * chessSquare }];
let direction;
let dX = 32;
let dY = 0;
let changingDirection = false;

// add event listener to change snake's direction
document.addEventListener("keydown", changeDirection);
function changeDirection(event) {
  const keypress = event.keyCode;
  if(changingDirection) return;
  changingDirection = true;
  switch (keypress) {
    case 37:
      if (direction !== "RIGHT" && snake[0].x !== chessSquare) {
        direction = "LEFT";
      }
      break;
    case 38:
      if (direction !== "DOWN" && snake[0].y !== -chessSquare) {
        direction = "UP";
      }
      break;
    case 39:
      if (direction !== "LEFT" && snake[0].x !== -chessSquare) {
        direction = "RIGHT";
      }
      break;
    case 40:
      if (direction !== "UP" && snake[0].y !== chessSquare) {
        direction = "DOWN";
      }
      break;
  }
}
//=======================================

function drowSnakePart(snakepart) {
    ctx.fillStyle = "green";
    ctx.strokeStyle = "black";
    ctx.fillRect(snakepart.x, snakepart.y, chessSquare, chessSquare);
    ctx.strokeRect(snakepart.x, snakepart.y, chessSquare, chessSquare);
  }
//=======================================
  function drowSnake() {
    snake.forEach(drowSnakePart);
  }

//=======================================
function moveSnake(){
    switch (direction){
        case "LEFT":
          dX =-chessSquare
          dY=0
          break
        case "UP" :
          dY=-chessSquare
          dX=0
          break
        case "RIGHT" :
          dX=+chessSquare
          dY=0
          break
        case "DOWN" :
          dY=+chessSquare
          dX=0
          break
      }
  let move={x:snake[0].x+dX,y:snake[0].y+dY}
  snake.unshift(move)
   snake.pop()

}

//=======================================
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  //=======================================
  function firstMove() {
    setTimeout(() => {
        changingDirection = false;
      clearCanvas();
      drowFood();
      moveSnake();
      drowSnake();
      firstMove();
    }, 1000);
  }
// draw chessboard
   ctx.strokeRect(0, 0, canvas.width, canvas.height);
// start moving snake
firstMove();
export { snake};