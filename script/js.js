$(function(){

	// Main game function
	function Game(){
		// Gamefield vars
		this.fieldH = $(".field").css("height");
		this.fieldW = $(".field").css("width");

		// Ballsize and position
		this.ballW = "20px";
		this.ballH = "20px";
		this.ballY = parseInt(this.fieldH, 10) / 2;
		this.ballX = parseInt(this.fieldW, 10) / 2;

		// Ball speed and movement variables
		this.ballXVelocity = 2;
		this.ballYVelocity = 4;
		this.ballMovingRight = Math.round(Math.random());
		this.ballMovingUp = 1; /*Math.round(Math.random());*/

		// Spawn the ball
		this.spawnBall();

		// Start moving ball at random direction
		this.moveBall();
	};

	Game.prototype.spawnBall = function (){
		// Create balldiv and set, size, position and color. Append to field div
		var ball = $("<div class='ball'>");
		ball.css({width:this.ballW, height:this.ballH, left:this.ballX, top:this.ballY, position:"relative", "background-color":"white"});
		ball.appendTo(".field");
	};

	Game.prototype.createPaddles = function (){

	};

	Game.prototype.moveBall = function (){
		// Keep track of this
		var self = this;

		setInterval(function(){
			//Start moving depending och false or true directions
			if (self.ballMovingUp){
				var ballPos = $(".ball").css("top");
				ballPos = parseInt(ballPos);
				var tempPos = ballPos -= self.ballYVelocity;
				$(".ball").css("top", tempPos);
			}

			if (this.ballMovingUp){
				this.ballY += this.ballYVelocity;
			}

			if (this.ballMovingRight){
				this.ballX += this.ballXVelocity;
			}

			if (this.ballMovingRight){
				this.ballX += this.ballXVelocity;
			}

			if (!this.ballMovingUp){
				this.ballY -= this.ballYVelocity;
			}

			if (!this.ballMovingUp){
				this.ballY -= this.ballYVelocity;
			}

			if (!this.ballMovingRight){
				this.ballX -= this.ballXVelocity;
			}

			if (!this.ballMovingRight){
				this.ballX -= this.ballXVelocity;
			}
		},1025);

		// Check for touching colliding with any walls

	};

	Game.prototype.countScores = function (){

	};

	Game.prototype.collisionDetection = function (){

	};

	var test = new Game();

	//console.log(test.ballY);
	//console.log(test.ballX);

});