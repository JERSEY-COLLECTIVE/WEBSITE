let rad = 15; // Width of the shape
let xpos, ypos; // Starting position of shape

let xspeed = 2.0; // Speed of the shape
let yspeed = 2.0; // Speed of the shape

let xdirection = 1; // Left or Right
let ydirection = 1; // Top to Bottom

let widthDelta = 1;

var sWidth = 10;

function setup() {
  var myCanvas = createCanvas(windowWidth, 200);
  myCanvas.parent("cum-slot");
    
  noStroke();
  frameRate(30);
  ellipseMode(RADIUS);
  // Set the starting position of the shape
  xpos = width / 2;
  ypos = height / 2;
}

function draw() {
  background(255);
    
  // Update the position of the shape
  xpos = xpos + xspeed * xdirection;
  ypos = ypos + yspeed * ydirection;

  // Test to see if the shape exceeds the boundaries of the screen
  // If it does, reverse its direction by multiplying by -1
  if (xpos > width - rad || xpos < rad) {
    xdirection *= -1;
    xspeed += .1;
    if (xspeed > 20){
        xspeed = 2.0;
    }
  }
  if (ypos > height - rad || ypos < rad) {
    ydirection *= -1;
    yspeed += .05;
    if (yspeed > 20){
        yspeed = 2.0;
    }
  }

  // Draw the shape
  ellipse(xpos, ypos, rad, rad);
  fill(0);
}

function windowResized() {
  sWidth = document.getElementById("cum-slot").offsetWidth;
  resizeCanvas(sWidth, 200);
}
