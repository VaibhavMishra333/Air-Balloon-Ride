var balloon,balloonImage1,balloonImage2;
var database,height;

function preload(){
   bg =loadImage("Images/cityImage.png");
   balloonImage1=loadAnimation("Images/HotAirBallon01.png");
   balloonImage2=loadAnimation("Images/HotAirBallon01.png","Images/HotAirBallon01.png",
   "Images/HotAirBallon01.png","Images/HotAirBallon02.png","Images/HotAirBallon02.png",
   "Images/HotAirBallon02.png","Images/HotAirBallon03.png","Images/HotAirBallon03.png","Images/HotAirBallon03.png");
  }

//Function to set initial environment
function setup() {

   database=firebase.database();
  
  createCanvas(1360,600);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);

 var balloonHeight=database.ref('balloon/height');
 balloonHeight.on("value",readHeight, showError);
 balloon.scale=0.4;



  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  
  if(keyDown("right")){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.x = balloon.x + 10;
}
if(keyDown("left")){
  balloon.addAnimation("hotAirBalloon",balloonImage2);
  balloon.x = balloon.x - 10;
  
}
   if(keyDown("up")){
    
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.y = balloon.y - 10;
    balloon.scale=0.5;
  }
   if(keyDown(DOWN_ARROW)){
  
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.y = balloon.y +10;
     balloon.scale=0.3;
  } 

  
  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}


function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x': height.x+x ,
    'y': height.y+y
  })
}


function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}