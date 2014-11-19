$(function (){

// Setup variables for canvas
var Width = 800;
var Height = 450;
var canvas = document.getElementById("game");
canvas.width = Width;
canvas.height = Height;
canvas.setAttribute('tabindex', 1);
var ctx = canvas.getContext("2d");
var FPS = 1000 / 60;

// Fill the canvas background
var BG = {
    Color: '#333',
    Paint: function(){
        ctx.fillStyle = this.Color;
        ctx.fillRect(0, 0, Width, Height);
    }
};

// Create a ball with coordinates, color, radius and velocity and methods
var Ball = {
		// Variables
    Radius: 5,
    Color: '#999',
    X: 0,
    Y: 0,
    VelX: 0,
    VelY: 0,

    // Method to paint the ball
    Paint: function(){
    ctx.beginPath();
    ctx.fillStyle = this.Color;
    ctx.arc(this.X, this.Y, this.Radius, 0, Math.PI * 2, false);
    ctx.fill();
    this.Update();
		},

		// Method to update the balls position
		Update: function(){
    this.X += this.VelX;
    this.Y += this.VelY;
		},

		// Reset balls position and set a random velocity (left or right) when scoring or game ends
		Reset: function(){
    this.X = Width/2;
    this.Y = Height/2;
    this.VelX = (!!Math.round(Math.random() * 1) ? 1.5 : -1.5);
    this.VelY = (!!Math.round(Math.random() * 1) ? 1.5 : -1.5);
		}
};

// Create paddles for player and computer. Set left or right positions. Add scores above each paddle.
function Paddle(position){
	this.Color = '#999';
	this.Width = 5;
	this.Height = 100;
	this.X = 0;
	this.Y = Height/2 - this.Height/2;
	this.Score = 0;

	if(position == 'left'){
    this.X = 0;
  }else{
		this.X = Width - this.Width;
	};

	this.Paint = function(){
    ctx.fillStyle = this.Color;
    ctx.fillRect(this.X, this.Y, this.Width, this.Height);
    ctx.fillStyle = this.Color;
    ctx.font = "normal 10pt Calibri";
    if(position == 'left'){
        ctx.textAlign = "left";
        ctx.fillText("score: " + Player.Score, 10, 10);
    }else{
        ctx.textAlign = "right";
        ctx.fillText("score: " + Computer.Score, Width - 10, 10);
    }
	};

	this.IsCollision = function () {
    if (Ball.X - Ball.Radius > this.Width + this.X || this.X > Ball.Radius * 2 + Ball.X - Ball.Radius)
        return false;
    if (Ball.Y - Ball.Radius > this.Height + this.Y || this.Y > Ball.Radius * 2 + Ball.Y - Ball.Radius)
        return false;
    return true;
	};

};

window.requestAnimFrame = (function(){
  return window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function( callback ){ return window.setTimeout(callback, FPS); }; }
)();

window.cancelRequestAnimFrame = (function() {
  return window.cancelAnimationFrame ||
  window.webkitCancelRequestAnimationFrame ||
  window.mozCancelRequestAnimationFrame ||
  window.oCancelRequestAnimationFrame ||
  window.msCancelRequestAnimationFrame ||
  clearTimeout; }
)();

// Create player and computer opponent
var Computer = new Paddle();
var Player = new Paddle('left');

// Function for starting drawing up stuff on canvas
function Paint(){
    ctx.beginPath();
    BG.Paint();
    Computer.Paint();
    Player.Paint();
    Ball.Paint();
}

// A function to check where player mouse is and move paddle accordingly
function MouseMove(e){
    Player.Y = e.pageY - Player.Height/2;
}

// Add listener for mouse movenments
canvas.addEventListener("mousemove", MouseMove, true);

// Game loop, create animation loop and then call Paint() function, check for collisions
function Loop(){
    init = requestAnimFrame(Loop);
    Paint();

    if(Player.IsCollision() || Computer.IsCollision()){
			Ball.VelX = Ball.VelX * -1;
			Ball.VelX += (Ball.VelX > 0 ? 0.5 : -0.5 );

			if(Math.abs(Ball.VelX) > Ball.Radius * 1.5){
				Ball.VelX = (Ball.VelX > 0 ? Ball.Radius * 1.5 : Ball.Radius * -1.5);
			}
		}

		if(Ball.Y - Ball.Radius < 0 || Ball.Y + Ball.Radius > Height){
			Ball.VelY = Ball.VelY * -1;
		}

		if(Ball.X - Ball.Radius <= 0){
			Computer.Score++;
			Ball.Reset();
		}else if(Ball.X + Ball.Radius > Width){
			Player.Score++;
			Ball.Reset();
		}

		if(Computer.Score === 10){
			GameOver(false);
		}else if(Player.Score === 10){
			GameOver(true);
		}

		Computer.Y = (Computer.Y + Computer.Height/2 < Ball.Y ? Computer.Y + Computer.Vel : Computer.Y - Computer.Vel);
};

// If game is over stop animation and display winnar
function GameOver(win){
    cancelRequestAnimFrame(init);
    BG.Paint();
    ctx.fillStyle = "#999";
    ctx.font = "bold 40px Calibri";
    ctx.textAlign = "center";
    ctx.fillText((win ? "A WINNER IS YOU" : "GAME OVER"), Width/2, Height/2);
    ctx.font = "normal 16px Calibri";
    ctx.fillText("refresh to reply", Width/2, Height/2 + 20);
};

// Function for starting game, reset ball and scores
function NewGame(){
    Ball.Reset();
    Player.Score = 0;
    Computer.Score = 0;
    Computer.Vel = 1.25;
    Loop();
};

// Start the game and have lulz
NewGame();


});