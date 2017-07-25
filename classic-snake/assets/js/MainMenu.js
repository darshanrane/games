GameDEV.MainMenu = function(game) {};
GameDEV.MainMenu.prototype = {
	create: function() {
		this.playbtn = this.add.button((window.innerWidth/2) - (360/2), (window.innerHeight/2) - (480/2), 'menu', this.startGame, this);
		this.playbtn.inputEnabled=true;
        this.playbtn.input.useHandCursor=true;
	},
	startGame: function() {
		this.game.state.start('Game');
	}
};