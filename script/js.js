$(function(){

	// Main game class
	function Game(){
		// Gamefield vars
		this.fieldH = $(".field").css("height");
		this.fieldW = $(".field").css("width");

		// Ballsize and startposition
		this.ballW = "20px";
		this.ballH = "20px";
		this.ballY = parseInt(this.fieldH, 10) / 2;
		this.ballX = parseInt(this.fieldW, 10) / 2;

		// Paddlesizes and startpositions
		this.paddleH = "100px";
		this.paddleW = "15px";
		this.paddleY = parseInt(this.fieldH, 10) / 2 - 50;
		this.paddle1X = 20;
		this.paddle2X = parseInt(this.fieldW, 10) - 35;

		// Ball speed and movement variables
		this.ballXVelocity = 4;
		this.ballYVelocity = 1;
		this.ballMovingRight = Math.round(Math.random());
		this.ballMovingUp = Math.round(Math.random());

		// Player and ai scores
		this.playerScore = 0;
		this.aiScore = 0;

		// Spawn the ball
		this.spawnBall();

		// Draw up paddles
		this.createPaddles();

		// Setup movement for left paddle
		this.paddleMoveMent();

		// Start the game
		this.Start();
	};

	Game.prototype.Start = function (){
		// Keep track of this
		var self = this;

		// Start ai
		self.ai();

		// Main interval
		setInterval(function(){
			// Start moving ball at random direction
			self.moveBall();

			// Check for collision with walls
			self.collisionDetection();

		},15);
	};

	Game.prototype.spawnBall = function (){
		// Create balldiv and set size, position and color. Append to field div
		var ball = $("<div class='ball'>");
		ball.css({width:this.ballW, height:this.ballH, left:this.ballX, top:this.ballY, position:"relative", "background-color":"grey"});
		ball.appendTo(".field");
	};

	Game.prototype.createPaddles = function (){
		// Keep track of this
		var self = this;

		// Create paddles and set, size, position and color. Append to field div
		var paddle1 = $("<div class='paddle1'>");
		var paddle2 = $("<div class='paddle2'>");
		paddle1.css({width:self.paddleW, height:self.paddleH, left:self.paddle1X, top:self.paddleY, position:"absolute", "background-color":"grey"});
		paddle1.appendTo(".field");
		paddle2.css({width:self.paddleW, height:self.paddleH, left:self.paddle2X, top:self.paddleY, position:"absolute", "background-color":"grey"});
		paddle2.appendTo(".field");
	};

	Game.prototype.paddleMoveMent = function (){
		// Keep track of this
		var self = this;

		// Object for storing mouse position
		var divPos = {};
		$(".field").on("mousemove", function(e){
			var $div = $(".field");
			divPos = {
				left: e.pageX - $div.offset().left,
				top: e.pageY - $div.offset().top - 40
			};

			// When mouse is moving inside field div, change Y-position of paddle1
			$(".paddle1").css("top", divPos.top);

			// Check if moving out of field, if so then hold movement
			if (parseInt($(".paddle1").css("top"),10) >= parseInt(self.fieldH,10)-100){
				var temp = parseInt(self.fieldH,10)-100;
				$(".paddle1").css("top", temp);
			}else if (parseInt($(".paddle1").css("top"),10) <= 0){
				$(".paddle1").css("top", 0);
			}
		});

	};

	Game.prototype.ai = function (){
		// Keep track of this
		var self = this;

		// Set ai paddle velocity, a temp var and initial aiPaddleYPos
		var aiVel = 1;
		var tempYPos;
		var paddle2YPos = this.paddleY;

		setInterval(function(){
			// Get ball Y position
			var tempBallYPos = parseInt($(".ball").css("top"),10);

			// Get paddle2 Y position
			var tempPaddle2YPos = parseInt($(".paddle2").css("top"),10);

			//console.log("Ball: " + tempBallYPos + " Paddlepos: " + (tempPaddle2YPos + 50));
			//$(".paddle2").css("top", tempBallYPos-40);

			// Check where balls y pos is, if isn't equal to paddle2 pos, then move 1px towards it
			if(tempBallYPos < paddle2YPos+40){
				paddle2YPos -= 1;
				$(".paddle2").css("top", paddle2YPos);
				console.log("moving up?");
			}else if(tempBallYPos > paddle2YPos+40){
				paddle2YPos += 1;
				$(".paddle2").css("top", paddle2YPos);
				console.log("moving DOWN?");
			}

			// Check if moving out of field, if so then hold movement
			if (parseInt($(".paddle2").css("top"),10) >= parseInt(self.fieldH,10)-100){
				var temp = parseInt(self.fieldH,10)-100;
				$(".paddle2").css("top", temp);
			}else if (parseInt($(".paddle2").css("top"),10) <= 0){
				$(".paddle2").css("top", 0);
			}

		},15);
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

		// Get ball Y and Xposition
		var tempBallYPos = parseInt($(".ball").css("top"),10);
		var tempBallXPos = parseInt($(".ball").css("left"),10);

		// Get paddle1 Y and X position
		var tempPaddle1YPos = parseInt($(".paddle1").css("top"),10);
		var tempPaddle1XPos = parseInt($(".paddle1").css("left"),10);

		// Get paddle2 Y and X position
		var tempPaddle2YPos = parseInt($(".paddle2").css("top"),10);
		var tempPaddle2XPos = parseInt($(".paddle2").css("left"),10);

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

			// Scoring and restart placed here later, also check for finishing score (5 points?)
		}

		// Get position from ball and paddles and check for collision. If collision occurs then change direction
		var ball = {x: tempBallXPos, y: tempBallYPos, width: parseInt(self.ballW,10), height: parseInt(self.ballH,10)};
		var paddle1 = {x: tempPaddle1XPos, y: tempPaddle1YPos, width: parseInt(self.paddleW,10), height: parseInt(self.paddleH,10)};
		var paddle2 = {x: tempPaddle2XPos, y: tempPaddle2YPos, width: parseInt(self.paddleW,10), height: parseInt(self.paddleH,10)};

		if (ball.x < paddle1.x + paddle1.width &&	ball.x + ball.width > paddle1.x && ball.y < paddle1.y + paddle1.height &&	ball.height + ball.y > paddle1.y){
			// When colliding with left paddle, change direction
			self.ballMovingRight = 1;
			console.log ("collision detected left paddle");
		}

		if (ball.x < paddle2.x + paddle2.width &&	ball.x + ball.width > paddle2.x && ball.y < paddle2.y + paddle2.height &&	ball.height + ball.y > paddle2.y){
			// When colliding with left paddle, change direction
			self.ballMovingRight = 0;
			console.log ("collision detected right paddle");
		}
	};

	Game.prototype.countScores = function (){
		// Keep track of this
		var self = this;
	};


	// Start the game
	var play = new Game();

	//console.log(play.ballY);
	//console.log(play.ballX);

});