$(function(){

	// Main game class
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
		this.ballMovingRight = 0; //Math.round(Math.random());
		this.ballMovingUp = 1; //Math.round(Math.random());

		// Spawn the ball
		this.spawnBall();

		// Draw up paddles
		this.createPaddles();

		// Start the game
		this.Start();
	};

	Game.prototype.Start = function (){
		// Keep track of this
		var self = this;
		// Main interval
		setInterval(function(){
			// Start moving ball at random direction
			self.moveBall();

			// Check for collision with walls
			self.collisionDetection();
		},25);
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

		//Start moving depending och false or true directions
		//console.log("setinterval firing");

		// If bMU true then
		if (self.ballMovingUp){
			var ballYPos = $(".ball").css("top");
			ballYPos = parseInt(ballYPos, 10);
			var tempPos = ballYPos -= self.ballYVelocity;
			$(".ball").css("top", tempPos);
		}

		// If bMU NOT true then
		if (!self.ballMovingUp){
			var ballYPos = $(".ball").css("top");
			ballYPos = parseInt(ballYPos, 10);
			var tempPos = ballYPos += self.ballYVelocity;
			$(".ball").css("top", tempPos);
		}

		// If bMR true then
		if (self.ballMovingRight){
			var ballXPos = $(".ball").css("left");
			ballXPos = parseInt(ballXPos, 10);
			var tempPos = ballXPos += self.ballXVelocity;
			$(".ball").css("left", tempPos);
		}

		// If bMR NOT true then
		if (!self.ballMovingRight){
			var ballXPos = $(".ball").css("left");
			ballXPos = parseInt(ballXPos, 10);
			var tempPos = ballXPos -= self.ballXVelocity;
			$(".ball").css("left", tempPos);
		}
	};

	Game.prototype.collisionDetection = function (){
		// Keep track of this
		var self = this;

		// Get ball Y position
		var tempBallYPos = parseInt($(".ball").css("top"),10);
		// Get ball X position
		var tempBallXPos = parseInt($(".ball").css("left"),10);

		//console.log(tempBallYPos + " " + tempBallXPos);

		//Check for collision against upper wall
		if(tempBallYPos <= 0){
			self.ballMovingUp = 0;
		}

		//Check for collision against lower wall
		if(tempBallYPos >= parseInt(self.fieldH,10)-parseInt(self.ballH,10)){
			self.ballMovingUp = 1;
		}

		//Check for collision against right wall
		if(tempBallXPos <= 0){
			console.log("COLLIDED LEFT WALL");
			// Set ballMovingRight to "true"
			self.ballMovingRight = 1;

			// Scoring and restart placed here later, also check for finishing score (5 points?)
		}

		//Check for collision against left wall
		if(tempBallXPos >= parseInt(self.fieldW,10)-parseInt(self.ballW,10)){
			console.log("COLLIDED RIGHT WALL");
			// Set ballMovingRight to "false"
			self.ballMovingRight = 0;
		}

		// Scoring and restart placed here later, also check for finishing score (5 points?)
	};

	Game.prototype.countScores = function (){
		// Keep track of this
		var self = this;
	};


	// Start the game
	var test = new Game();

	//console.log(test.ballY);
	//console.log(test.ballX);

});