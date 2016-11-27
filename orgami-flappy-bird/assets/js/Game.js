
BasicGame.Game = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:
    //  #f8a420
    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;    //  the tween manager
    this.state;	    //	the state manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator

    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

BasicGame.Game.prototype = {

	create: function(){
        
        // Set the physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // Display the bird at the position x=100 and y=245
        this.bird = this.game.add.sprite(window.innerWidth/2, window.innerHeight/2, 'bird');

        // Add physics to the bird
        // Needed for: movements, gravity, collisions, etc.
        this.game.physics.arcade.enable(this.bird);

        // Add gravity to the bird to make it fall
        this.bird.body.gravity.y = 1000;  
        this.bird.anchor.setTo(-0.2, 0.5); 

        // Call the 'jump' function when the spacekey is hit
        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); 

        this.pipes = this.game.add.group(); 
        this.timer = this.game.time.events.loop(1500, this.addRowOfPipes, this); 

        this.score = 0;
        this.labelScore = this.game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });

        this.jumpSound = this.game.add.audio('jumpsnd'); 
	},
    update: function(){

        if (this.bird.y < 0 || this.bird.y > window.innerHeight)
            this.restartGame();

        if (this.bird.angle < 20)
            this.bird.angle += 1; 

		//	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        if (this.spaceKey.isDown)
        {
            this.jump();
        }
        this.game.physics.arcade.overlap(this.bird, this.pipes, this.hitPipe, null, this);
	},
	jump: function() {
        if (this.bird.alive == false)
            return;

        // Add a vertical velocity to the bird
        this.bird.body.velocity.y = -250;
        this.game.add.tween(this.bird).to({angle: -20}, 100).start(); 

        this.jumpSound.play(); 
    },
    addOnePipe: function(x, y) {
        
        var pipe = this.game.add.sprite(x, y, 'pipe');
        this.pipes.add(pipe);
        this.game.physics.arcade.enable(pipe);
        pipe.body.velocity.x = -200; 
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;

    },
    addRowOfPipes: function() {
        
        var hole = Math.floor(Math.random() * 5) + 1;

        for (var i = 0; i < (window.innerWidth / 50); i++)
            if (i != hole && i != hole + 1) 
                this.addOnePipe(window.innerWidth, i * 80 + 10);  

        this.score += 1;
        this.labelScore.text = this.score; 
    },
    restartGame: function() {
        // Start the 'main' state, which restarts the game
        this.game.state.start('Game');
    },
    hitPipe: function() {
        if (this.bird.alive == false)
            return;

        this.bird.alive = false;

        this.game.time.events.remove(this.timer);

        // Go through all the pipes, and stop their movement
        this.pipes.forEach(function(p){
            p.body.velocity.x = 0;
        }, this);
    }, 
};
