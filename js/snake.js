import { ctx, chessSquare} from './canvas.js';
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
drowSnake()