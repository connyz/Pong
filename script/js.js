$(function() {

	// Game class for canvas
	function Game() {
		var canvas = document.getElementById("game");
		this.width = canvas.width;
		this.height = canvas.height;
		this.context = canvas.getContext("2d");
		this.context.fillStyle = "white";
		// Create keylistener
		this.keys = new KeyListener();

		// When creating game, add player1 & 2 paddles at middle position
    this.p1 = new Paddle(5, 0);
    this.p1.y = this.height/2 - this.p1.height/2;
    this.p2 = new Paddle(this.width - 5 - 2, 0);
    this.p2.y = this.height/2 - this.p2.height/2;
	}

	// Add method to game class
	Game.prototype.draw = function(){
		// Fill a line in middle and clear the other space
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.fillRect(this.width/2, 0, 2, this.height);

    // Draw up paddles
    this.p1.draw(this.context);
    this.p2.draw(this.context);
	};

	// Add update method to game class
	Game.prototype.update = function(){
    if (this.paused){
			return;
    }

    // To which Y direction the paddle is moving
    if (this.keys.isPressed(83)) { // DOWN
        this.p1.y = Math.min(this.height - this.p1.height, this.p1.y + 4);
    } else if (this.keys.isPressed(87)) { // UP
        this.p1.y = Math.max(0, this.p1.y - 4);
    }

    if (this.keys.isPressed(40)) { // DOWN
        this.p2.y = Math.min(this.height - this.p2.height, this.p2.y + 4);
    } else if (this.keys.isPressed(38)) { // UP
        this.p2.y = Math.max(0, this.p2.y - 4);
    }
	};

	// Paddle class to store position, width, height and score
	function Paddle(x,y) {
    this.x = x;
    this.y = y;
    this.width = 2;
    this.height = 28;
    this.score = 0;
	}

	// Add draw method for paddle class for player
	Paddle.prototype.draw = function(p){
    p.fillRect(this.x, this.y, this.width, this.height);
	};

	// Create a keylistener class
	function KeyListener() {
    this.pressedKeys = [];

    this.keydown = function(e) {
        this.pressedKeys[e.keyCode] = true;
    };

    this.keyup = function(e) {
        this.pressedKeys[e.keyCode] = false;
    };

    document.addEventListener("keydown", this.keydown.bind(this));
    document.addEventListener("keyup", this.keyup.bind(this));
	}

	// Method to check if key is pressed
	KeyListener.prototype.isPressed = function(key){
		return this.pressedKeys[key] ? true : false;
	};

	// Method to set listener to key
	KeyListener.prototype.addKeyPressListener = function(keyCode, callback){
		document.addEventListener("keypress", function(e) {
			if (e.keyCode == keyCode){
				callback(e);
			}
		});
	};



	// Initialize our game instance
	var game = new Game();

	function MainLoop() {
		game.update();
		game.draw();
		// Call the main loop again at a frame rate of 30fps
		setTimeout(MainLoop, 33.3333);
	}

	// Start the game execution
	MainLoop();


});