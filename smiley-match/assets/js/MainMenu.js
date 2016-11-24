
BasicGame.MainMenu = function (game) {
	this.game;
};
BasicGame.MainMenu.prototype = {
	create: function () {
        
	    // The numbers given in parameters are the indexes of the frames, in this order: over, out, down
	    button = this.add.button(this.game.world.centerX, this.game.world.centerY, 'smiley', this.startGame, this, 4, 0, 3);

	    //  setting the anchor to the center
	    button.anchor.setTo(0.5, 0.5);
	},
	startGame: function(){
		this.state.start('Game');
	},
	resize: function (width, height) {
		button.x = this.game.world.centerX;
		button.y = this.game.world.centerY;
	}
};
