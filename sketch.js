
var monkey , monkeyRunning;
var banana ,bananaImage,ground,obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var survivalTime = 0;

function preload(){
  
  
  monkeyRunning =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() 
{
  createCanvas(600,400);
  
  monkey = createSprite(50,300);
  monkey.addAnimation("running",monkeyRunning);
  monkey.scale = 0.18;
  
  ground = createSprite(500,350,800,5);
  ground.velocityX = -5;
  ground.x = ground.width/2;
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
}


function draw() 
{
  background("white")
  
  monkey.collide(ground);
  
  monkey.velocityY = monkey.velocityY + 0.5;
  
  if(keyDown("space") && monkey.y>=250)
    {
      monkey.velocityY = -10;
    }
  
  if(ground.x<200)
    {
      ground.x = ground.width/2;
    }
  
  if(monkey.isTouching(obstacleGroup))
    {
      ground.velocityX = 0;
      banana.velocityX = 0;
      obstacle.velocityX = 0;
      banana.lifetime = -1;
      obstacle.lifetime = -1;
      FoodGroup.destroyEach(); 
    }
  
  
  spawnBanana();
  spawnObstacles();
  

  drawSprites();
  
  fill("red");
  textSize(15);
  text("Survival Time:"+survivalTime,30,50)
  fill("blue");
  text("Score:"+score,500,50);
}

function spawnBanana()
{
  if(frameCount%120 === 0)
    {
      banana = createSprite(570,random(80,120));
      banana.addImage(bananaImage);
      banana.scale = 0.08;
      banana.velocityX = -6;
      banana.lifetime = 100;
      FoodGroup.add(banana);
    }
}

function spawnObstacles()
{
  if(frameCount%300 === 0)
    {
      obstacle = createSprite(670,310);
      obstacle.addImage("blocker",obstacleImage);
      obstacle.velocityX = -6;
      obstacle.scale = 0.2;
      obstacle.lifetime = 150;
      obstacleGroup.add(obstacle);
    }
}



