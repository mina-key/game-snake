import { ctx, chessSquare,canvas } from './canvas.js';
import { snake } from './snake.js';


export let foodX;
export let foodY;
// load image food & create random food
const foodImg = new Image();
foodImg.src = "image/food.png";
//===========================
//functions
//===========================
function createFood() {
    foodX = randomNumber(0, canvas.width - 32);
    foodY = randomNumber(0, canvas.height - 32);
    snake.forEach((snakepart) => {
        if (snakepart.x === foodX && snakepart.y === foodY) {
          createFood();
        }
      });

  }
  //=======================================
  function randomNumber(max, min) {
    return Math.round((Math.random() * (max - min) + min) / chessSquare) * chessSquare;
  }
  //=====================================
  function drowFood() {
    
    ctx.drawImage(foodImg, foodX, foodY);
  
  }
//=====================================
  foodImg.onload = () => {
    
    createFood();
    drowFood()
  };
  
  export { createFood, drowFood };