
//game states
var gamestate = "serve"
//background
var bg,bgimg;
//global variables
var allpipes1,allpipes2;
//images for top pipes
var pipe1img,pipe2img,pipe3ig,pipe4img;
//top pipes
var pipe1,pipe2,pipe3,pipe4;
//ground
var ground,groundimg;
//bird
var bird,birdimg;
//bottom pipes
var pipe5,pipe6,pipe7,pipe8;
//images for bottom pipes
var pipe5img,pipe6img,pipe7img,pipe8img;
//groups
var pipes;
//scoring system
var score = 0;
//game over image
var game_overimg;

function preload()
{
  //load the images for background
  backgroundimg = loadImage("background.png");
  //load the image for bird
  birdimg = loadImage("bird.png");
  //load the images for top pipes
  pipe1img = loadImage("pipe1.png");
  pipe2img = loadImage("pipe2.png");
  pipe3img = loadImage("pipe3.png");
  pipe4img = loadImage("pipe4.png");
  //load the images for bottom pipes
  pipe5img = loadImage("pipe5.png");
  pipe6img = loadImage("pipe6.png");
  pipe7img = loadImage("pipe7.png");
  pipe8img = loadImage("pipe8.png");
  
  game_overimg = loadImage("Gane over.jpg");
}

function setup() {
  createCanvas(1000,600);
  //background
  background = createSprite(0, 0, 800, 600);
  background.addImage(backgroundimg);
  background.scale = 2.5;
  //bird
  bird = createSprite(200,200,20,20);
  bird.velocityY = 12;
  bird.addImage(birdimg);
  bird.scale = 0.25;
  

  /*//top pipes

  //pipe-1
  pipe1 = createSprite(200,500,200,10);
  pipe1.addImage(pipe1img);
  pipe1.scale = 0.45;

  //pipe-2
  pipe2 = createSprite(500,550,20,20);
  pipe2.addImage(pipe2img);
  pipe2.scale = 0.35;

  //bottom pipes

  //pipe-5;
  pipe5 = createSprite(200,100,200,10);
  pipe5.addImage(pipe5img);
  pipe5.scale = 0.45;*/

  pipes= new Group();
}

function draw() {
  //background(bgimg); 
  if(gamestate === "serve")
  { 
    bird.velocityY = 0;
    gamestate = "play"
    //textSize(40);
    //fill("yellow");
    //stroke("white")
    //text("Press Spacebar to Serve",500,300);
  }
  
  if(gamestate === "play")
  {
    spawnpipesbottom();
    spawnpipestop();
    
    score = score + Math.round(frameCount/60);

  //keyDown Commands
  if(keyDown("left"))
  {
    bird.x = bird.x - 5;
  }
  
  if(keyDown("right"))
  {
  bird.x = bird.x + 5
  }

  if(keyDown("space")){
    bird.velocityY=-10;
    gamestate = "play"
  }
  
  //giving it a gravity
  bird.velocityY = bird.velocityY + 0.8
    background.velocityX = -3;
    if(pipes.isTouching(bird))
  {
    gamestate = "end"
  }
  if(bird.x<0 || bird.x>=1000 || bird.y<0 || bird.y>=1000)
  {
    gamestate = "end";
  }
    //re-curring background
  if (background.x < 0){
    background.x = background.width/2;
    }
  }
  
  
  if(gamestate === "end")
  {
    background.addImage(game_overimg);
    background.x = 500;
    background.y = 300;
    background.scale = 2.8;
  }
  drawSprites();
  textSize(40);
  fill("purple");
  stroke("white")
  text("Score:"+score, 800,50)

  //for checking x and y postion
  //textSize(40)
  //text( mouseX + "," +mouseY ,200,300);
  
  
}
function spawnpipestop() {
  if(frameCount % 300 === 0) {
    var a = random(10,900);
    allpipes1 = createSprite(a,10,30,30);
    allpipes1.setCollider('circle',0,0,45)
    //pipes.debug = true
  
    //allpipes.velocityX = -(6 + 3*score/100);
    
    //generate random allpipes
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: allpipes1.addImage(pipe5img);
              break;
      case 2: allpipes1.addImage(pipe6img);
              break;
      case 3: allpipes1.addImage(pipe7img);
              break;
      case 4: allpipes1.addImage(pipe8img);
              break;
      
      default: break;
    }
    
    //assign scale and lifetime to the pipes           
    allpipes1.scale = 0.5;
    allpipes1.lifetime = 300;
    allpipes1.depth = pipes.depth;
    allpipes1.depth +=1;
    //add each pipes to the group
    pipes.add(allpipes1);
  }
}
function spawnpipesbottom()
{
  if(frameCount % 300 === 0) {
    var a = random(10,900);
    allpipes2 = createSprite(a,550,30,30);
    allpipes2.setCollider('circle',0,0,45)
    //pipes.debug = true
  
    //allpipes.velocityX = -(6 + 3*score/100);
    
    //generate random allpipes
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: allpipes2.addImage(pipe1img);
              break;
      case 2: allpipes2.addImage(pipe2img);
              break;
      case 3: allpipes2.addImage(pipe3img);
              break;
      
      default: break;
    }
    
    //assign scale and lifetime to the pipes           
    allpipes2.scale = 0.5;
    allpipes2.lifetime = 300;
    allpipes2.depth = pipes.depth;
    allpipes2.depth +=1;
    //add each pipes to the group
    pipes.add(allpipes2);
  }

}
