var gameState;
var PLAY = 1;
var END = 0;
gameState = PLAY;
var king,kingattack;
var kinganimation,kingimage,kinganimation2,kinganimation3,kinganimation4,kingImagedying;
var kinganimation1Sound;
var ground;
var ObstaclesGroup,Obstacles,Obstaclesimage;
var Coin,CoinImage;
var Coin1,Coin1Image;
var bg,bg1;
var count = 0;
textSize(58);
textFont("calibrie");
textStyle(BOLD);


//Animations and Images
function preload(){
kinganimation =loadAnimation("Images/MY GAME FILES/ninja1.png","Images/MY GAME FILES/ninja2.png","Images/MY GAME FILES/ninja4.png","Images/MY GAME FILES/ninja3.png","Images/MY GAME FILES/ninja5.png","Images/MY GAME FILES/ninja6.png");
kinganimation1Sound =loadSound("Sounds/footsteps.mp3");
kingimage = loadImage("Images/MY GAME FILES/ninja7.png")
kinganimation2 = loadAnimation("Images/MY GAME FILES/ninja8.png");
kinganimation3 = loadAnimation("Images/MY GAME FILES/ninja17.png","Images/MY GAME FILES/ninja16.png");
Obstaclesimage = loadAnimation("Images/MY GAME FILES/nonpc1.png");
kingImagedying = loadImage("Images/MY GAME FILES/ninja123.png");
CoinImage = loadImage("Images/MY GAME FILES/coin1.png");
Coin1Image = loadImage("Images/MY GAME FILES/coin1.png");
bg1 = loadImage("Images/MY GAME FILES/bg8.jpg");
}

function setup() {
  createCanvas(1600,600);
  ObstaclesGroup = new Group ();
  CoinGroup = new Group ();
  Coin1Group = new Group ();
  bg = createSprite(800,300,20,20);
  king = createSprite(200, 490, 50, 50);
  kingattack = createSprite(200,500,50,50);
  kingattack.visible = false;
  king.setCollider("rectangle",-10,11,king.width+20,king.height+50);
   //debug
  // king.debug = true;
  // ObstaclesGroup.debug = true;
  ground=createSprite(600,560,2000,10);
  ground.visible = false;
  bg.addImage("bg",bg1);
  bg.scale = 1.6;
  king.addImage("king",kingimage);
  king.scale =1.5;
}

function draw() {
  background("white"); 
  edges = createEdgeSprites();

 


  if(gameState === PLAY){
  // count = king.velocityX + Math.round(king.velocityX);

  // Moving of the king
  if(keyDown(RIGHT_ARROW)){
  bg.x = bg.x -7;
  if(bg.x < 0){
       bg.x = bg.width/2;
         }
         
         count = count +1; 
  }
  if(keyWentDown(RIGHT_ARROW)){
  king.addAnimation("king",kinganimation);
  // king.addSound("foot",kinganimation1Sound);
  king.scale =0.9;
  }

  if(keyWentUp(RIGHT_ARROW)){
    touches;
    //  king.velocityX = 0;
    king.addImage("king",kingimage);
    king.scale = 1.5;
  } 
  //  Jumping of the king
  if(keyWentDown(UP_ARROW)&& king.collide(ground)){ 
    king.velocityY = -20;
    king.addAnimation("king",kinganimation2);
 king.scale =1.5;
 
  }

if(keyWentUp(UP_ARROW) && king.collide(ground)){
  king.addImage("king",kingimage);
  king.scale = 1.5;
}
  //Attacking of the king
  if(keyWentDown("space")||touches.length>0){
  king.addAnimation("king",kinganimation3)
  king.scale = 2.5;
  touches = []
}
if(keyWentUp("space")){
  king.velocityX = 0;
  king.addAnimation("king",kingimage);
  king.scale = 1.5;
}
 //Gravity 
 king.velocityY = king.velocityY +  0.7; 
 spawnObstacles();

 
 if(king.isTouching(ObstaclesGroup)){
   gameState = END;
 }
 if( keyDown("space")){
   kingattack.addAnimation("1",kinganimation3);
   kingattack.scale = 2.5;
   kingattack.visible = true;
   king.visible = false;
   ObstaclesGroup.destroyEach(); 
 }
 
 else if(keyDown("space")){

 }

 else {
    king.visible = true;
    kingattack.visible = false;

 }

}

else if(gameState === END){
  bg.velocityX = 0;
  ObstaclesGroup.setVelocityXEach(0);
  Obstacles.velocityX = 0;
  king.addImage("king",kingImagedying);
  king.x = 0;
  king.y = 450;
console.log(mouseX + ","+mouseY);
  king.scale = 1.5;
}
king.collide(ground);

  drawSprites();
    //Score
    textSize(30);
    text("Score: "+ count, 250, 100);
}

function spawnObstacles(){
  if(World.frameCount % 120===0){
    Obstacles=createSprite(1500,520,60,60);
    Obstacles.scale = 1.2;
     Obstacles.addAnimation("nonpc1",Obstaclesimage);
     ObstaclesGroup.scale = 1.5;
  // Obstacles.debug = true;
    Obstacles.velocityX = -10;
    ObstaclesGroup.add(Obstacles);
    Obstacles.lifetime = 170;
  }
}

