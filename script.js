/**
 * Name: Aisha Asad
 * 
 * Use this template to get started creating a simple 2D game for the web using P5.js. 
 */
var gameState = "splash"; //lab 12
var player1; //lab 13
var timer; //lab 14
var testBox;
var dropTimer;
var presents = new Array(0); //empty array
var score = 0;


function setup() {

  createCanvas(600, 400);
  player1 = new Player(width/2, height * 7/8);
  testBox = new Box (width/2, height * 2/12);

  timer = new Timer(20000); //20s timer
  dropTimer = new Timer(1000); //1s timer
  
}

function draw() {
  background(200);
  /* un-comment each line to see it work */
  //splash(); // call the splash screen function (below)
  //play(); // call the play screen function (below)
  //gameOver(); // call the gameOver screen function (below)
  switch (gameState){
    case "splash":
      splash();
      break;
    case "play":
      play()
      break;
    case "gameOver":
      gameOver();
      break;
    default:
      console.log ("no match! check your mousePressed function")
  }

}

function splash() {
  // this is what you would see when the game starts
  background(139, 0, 0);
  textAlign(CENTER);
  textSize(16);
  text("Christmas Dash: Use the arrow keys to collect Santa's gifts as fast as you can!", width / 2, height / 2);
  textSize(12);
  text("(click the mouse to continue)", width / 2, height / 2 + 30);
  testBox.display();
  testBox.spin();
  //testBox.move();
}

function play() {
  // this is what you see when the game is running 
  background(0, 139, 0);
  fill(0, 0, 200)
  textAlign(CENTER);
  textSize(16);
  text("Hurry! Time is ticking!", width / 2, height / 2);
// player1.x = mouseX;
// player1.y = mouseY;
player1.display();
player1.move();

  /*
if(keyIsPressed){
  switch(keyCode){
  case UP_ARROW :
    player1.thrust();
    break;
  case DOWN_ARROW :
    player1.brake();
    break;
  case LEFT_ARROW :
    player1.angle -= .02;
    break;
  case RIGHT_ARROW :
    player1.angle += .02;
    break;
  }
  }
  */
  if(timer.isFinished()){
  gameState = "gameOver";
}

if(dropTimer.isFinished()){
  let p = new Box(random(width), -40);
  presents.push(p); //add p to the array
  dropTimer.start();
} 
  for(let i = 0; i < presents.length; i++){
  presents[i].display();
  presents[i].move();
  presents[i].spin();

  if(presents[i].y > height){
    presents.splice(i, 1); //remove from array
    score --;
  }

let d = dist(presents[i].x, presents[i].y, player1.x, player1.y);
    if(d < 50) {
      presents.splice(i, 1);
      score ++;
    }
    
} //end of for() loop
  
textAlign(LEFT);
  text("Elapsed Time: " + timer.elapsedTime, 20, 20);

  text("Score: " + score, 20, 40);
  
}

function gameOver() {
  // this is what you see when the game ends
  background(0);
  fill(255, 0, 0)
  textAlign(CENTER);
  textSize(16);
  text("Game Over!", width / 2, height / 2);
  text("Final Score: " + score, width/2, height * 2/3);
}

function mousePressed() {
  if(gameState == "splash"){
  gameState = "play"; //go to play screen
    timer.start();
    dropTimer.start();
    score = 0; //reset the score
} else if (gameState == "play"){
  //gameState = "gameOver";
} else if (gameState == "gameOver"){
  gameState = "splash";
}
  console.log(gameState);

}


function keyPressed() {
  switch(keyCode){
    case UP_ARROW :
      player1.y -= 30; //subtract 30px from .y
     // player1.angle = 0;
      if(player1.y < 0) player1.y = height;
      break;
    case DOWN_ARROW :
      player1.y += 30; //add 30px from .y
     // player1.angle = PI;
      if(player1.y > height) player1.y = 0;
      break;
    case LEFT_ARROW :
      player1.x -= 30;
     // player1.angle = PI + PI/2;
      if(player1.x < 0) player1.x = width;
      break;
    case RIGHT_ARROW :
      player1.x += 30;
     // player1.angle = PI/2;
      if(player1.x > width) player1.x = 0;
      break;
    default :
      console.log("use the arrow keys to move!")
  }
}



