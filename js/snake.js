import { ctx, chessSquare, canvas } from './canvas.js';
import { createFood, drowFood, foodX ,foodY} from './food.js';
//game total score
let score = 0;
// snake properties
let snake = [{ x: 4 * chessSquare, y: 4 * chessSquare }];
let direction;
let dX = 32;
let dY = 0;
let changingDirection = false;
//gameover audio
let gameover = new Audio();
gameover.src="audio/gameover.wav"
//=======================================
// add event listener to change snake's direction
document.addEventListener("keydown", changeDirection);
// functions
//=======================================
//Check keypress direction
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
  if(move.x==foodX&&move.y==foodY){
      score+=10
document.getElementById('score').innerHTML=`Score: ${score}`
createFood()
  }else{

      snake.pop()
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
  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }


//======================================
//game over
function didGameEnd(){
    //the snake hit itself
    for(let i=1;i<snake.length;i++)
       
       {
 if(snake[0].x==snake[i].x&&snake[0].y==snake[i].y)
            return true
       
       } 
       
    
    //hit snake to wall
    const hitLeftWall=snake[0].x<0;
    const hitRightWall=snake[0].x>canvas.width-chessSquare
    const hitTopWall=snake[0].y<0
    const hitBottomWall=snake[0].y>canvas.height-chessSquare
    return hitLeftWall||hitRightWall||hitTopWall||hitBottomWall
}
//======================================
function showScore(){
    var end = document.getElementById('end');
    end.innerHTML = `Score: ${score} <br> Game over`;
    end.style.display = "block";
}
//======================================
  function firstMove() {
    if(didGameEnd()) {
        showScore()
        gameover.play()
        return
    }
    setTimeout(() => {
      changingDirection = false;
      clearCanvas();
      drowFood();
      moveSnake();
      drowSnake();
      firstMove();
    }, 500);
  }
  //======================================
  // draw chessboard
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
  
// start moving snake
  firstMove();
  export { snake};