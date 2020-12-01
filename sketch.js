var jungle2;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var jungle2Image;
var invisibleGround;
var monkeyStop;
var survival = 0;
var gameOver,gameOverImage;

var END = 0;
var PLAY = 1;
var gameState = PLAY;

var button,buttonImage;


function preload(){
  
  
  jungle2Image = loadImage("2.jpg");
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  monkeyStop = loadAnimation("sprite_0.png");
  
  gameOverImage = loadImage("game over.png");
  
  buttonImage = loadImage("button.png");
}



function setup() {
  createCanvas(600,600);
 
  
  jungle2 = createSprite(200,200);
  jungle2.addImage(jungle2Image);
  jungle2.scale = 5;
  
  
   monkey = createSprite(125,435);
  monkey.addAnimation("moving",monkey_running);
  monkey.addAnimation("out",monkeyStop);
  monkey.scale = 0.15;
  
  obstacleGroup = createGroup(500,300);
  bananaGroup = createGroup(500,300);
  
  invisibleGround = createSprite(300,480,600,10);
  
  gameOver = createSprite(300,300);
  gameOver.scale = 0.5;
  gameOver.addImage(gameOverImage);
  
  button = createSprite(500,500);
  button.addImage(buttonImage);
  button.scale = 0.5;
}


function draw() {
background("green");

  monkey.collide(invisibleGround);
  invisibleGround.visible = false;
  
  
  
  if(gameState===PLAY){
    spawnObstacles();
    spawnBananas();
    
    if(mousePressedOver(button)&&monkey.y>=350){
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY+0.8;
    
    if(jungle2.x<0){
    jungle2.x = jungle2.width/2;
  }
    
    jungle2.velocityX = -8;
    
    if(frameCount%30===0){
      survival = survival +1;
    }
    
    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      score = score+1;
    }
    
    gameOver.visible = false;
    
  }else if(gameState===END){
    obstacleGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityXEach(0);
    jungle2.velocityX = 0;
    monkey.velocityY = 0;
    bananaGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);
    monkey.changeAnimation("out",monkeyStop);
    gameOver.visible = true;
    
    if(mousePressedOver(gameOver)){
      restart();
    }
  }
  
  if(monkey.isTouching(obstacleGroup)){
    gameState = END;
  }
  
  drawSprites();  
  fill("yellow");
  textSize(20);
  text("survival time-"+survival,50,50);
  textSize(20);
  text("seconds",190,50);
  textSize(20);
  text("banana eaten-"+score,50,90);
  
  if(gameState===END){
    textSize(20);
    text("click to restart",200,300);
  }
}


function spawnObstacles(){
  if(frameCount%60===0){
    obstacle = createSprite(570,435);
   obstacle.addImage(obstacleImage);
    obstacle.scale = 0.18;
    obstacle.setCollider("circle",0.1000000000000,0.100000000000);
    
    obstacleGroup.add(obstacle);
    obstacleGroup.setVelocityXEach(-8);
    obstacleGroup.setLifetimeEach(60);
  }
}

function spawnBananas(){
  if(frameCount%60===0){
    banana = createSprite(570,300);
   banana.addImage(bananaImage);
    banana.scale = 0.18;
    
    bananaGroup.add(banana);
    bananaGroup.setVelocityXEach(-8);
    bananaGroup.setLifetimeEach(60);
  }
}

function restart(){
  gameState = PLAY;
  
  bananaGroup.destroyEach();
  obstacleGroup.destroyEach();
  
  score = 0;
  survival = 0;
  
  monkey.changeAnimation("moving",monkey_running);
}