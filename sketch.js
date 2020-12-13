var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running, banana ,bananaImage, obstacle, obstacleImage, FoodGroup, obstacleGroup, score, groundImage;
var invisibleground;
function preload(){
  
  
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png");
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  groundImage = loadImage("ground2.png");
  
  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");
  deadmonkey=loadImage("dead monkey.jpg")
  
}



function setup() {
     createCanvas(600, 600);
  


  var survivalTime=0;
  
  //creating monkey
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
   monkey.scale=0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.addImage(groundImage);
  console.log(ground.x);

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
 
invisibleground=createSprite(400,370,900,10);
invisibleground.visible=false;  
  
   gameOver = createSprite(200,150);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(200,190);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
   
}


function draw() {
  
  background("lightblue");
  
  
  stroke("black");
  textSize(20);
  fill("black");
  
  text("Score: "+ score, 100,50);
  
 if(gameState === PLAY){
   
   gameOver.visible = false;
    restart.visible = false;
    //score=score+Math.round(frameRate()/60);
   if(ground.x<0) {
    ground.x=ground.width/2;
  }
  //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12; 
    }
    console.log(monkey.y);
    monkey.velocityY = monkey.velocityY + 1;
   
    spawnFood();
    spawnObstacles();
   
   if(FoodGroup.isTouching(monkey)){
       
     score = score+1;
     FoodGroup.destroyEach();
     
    }
   
    if(obstaclesGroup.isTouching(monkey)){
       
        gameState = END;
     
    }
 }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
     ground.velocityX = 0;
        monkey.velocityY = 0;
        monkey.velocityX = 0;
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
       
    if(mousePressedOver(restart)){
    reset();
      
      
  }
    
  }
  
    monkey.collide(invisibleground);   
   monkey.depth=ground.depth;
  monkey.depth=monkey.depth+1;
 
  drawSprites();
    
  
  
  
  
}



function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}



function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  
  obstaclesGroup.destroyEach();
  FoodGroup.destroyEach();

  ground.velocityX=-5
  score=0;
}