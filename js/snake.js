import { ctx, chessSquare, canvas} from './canvas.js';
import { drowFood} from './food.js';

let snake = [{ x: 4 * chessSquare, y: 4 * chessSquare }];
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

  let move={x:snake[0].x+chessSquare,y:snake[0].y}
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