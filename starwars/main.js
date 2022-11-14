// variables declaration 
const COLOR_SPACE = "black";
const COLOR_STARS = "white";
const STAR_NUM = "300";
const STAR_SIZE = "0.005";
const STAR_SPEED = "0.05";

//canvas & context
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.height = document.documentElement.clientHeight;
canvas.width = document.documentElement.clientWidth;
document.body.appendChild(canvas);

//set up the STAR
let stars = [];
let starSpeed = STAR_SPEED*canvas.width;
let xv = starSpeed*randomSign()*Math.random();
let yv = Math.sqrt(Math.pow(starSpeed,2)- Math.pow(xv,2))*randomSign();

for (let i = 0; i< STAR_NUM; i++){
    let speedMult = Math.random()*1.5 + 0.5;
    stars[i] = {
        r: Math.random() * STAR_SIZE * canvas.width / 2,
        x : Math.floor(Math.random() * canvas.width),
        y : Math.floor(Math.random() * canvas.height),
        xv : xv * speedMult,
        yv : yv * speedMult,

    }
}

//seting up the animation loop
let timeDelta, timeLast = 0;
requestAnimationFrame(loop);


function loop(timeNow){
     //calculating the time difference
     timeDelta = timeNow - timeLast;
     timeLast = timeNow;
 
    //Space background setup
    ctx.fillStyle = COLOR_SPACE;
    ctx.fillRect(0,0,canvas.width,canvas.height);

    //Drawing the stars
    ctx.fillStyle = COLOR_STARS;
    for (let i=0; i<STAR_NUM; i++){
        ctx.beginPath()
        ctx.arc(stars[i].x, stars[i].y, stars[i].r, 0, Math. PI*2);
        ctx.fill();

       //Updating x position of {stars}
       stars[i].x += stars[i].xv * timeDelta * 0.001;
       // Reposition the star to the other side if it goes off screen
       if(stars[i].x < 0 - stars[i].r){
        stars[i].x = canvas.width + stars[i].r;
       } else if(stars[i].x > canvas.width + stars[i].r){
        stars[i].x = 0 - stars[i].r;
       }

       //Updating x position of {stars}
       stars[i].y += stars[i].yv * timeDelta * 0.001;
       // Reposition the star to the other side if it goes off screen
       if(stars[i].y < 0 - stars[i].r){
        stars[i].y = canvas.height + stars[i].r;
       } else if(stars[i].y > canvas.height + stars[i].r){
        stars[i].y = 0 - stars[i].r;
       }
    }
    //calling next frame
    requestAnimationFrame(loop);

}
function randomSign(){
    return Math.random() >= 0.5 ? 1 : -1;
}
