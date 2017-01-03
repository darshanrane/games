var GameDEV = {
	_WIDTH: 1000,
	_HEIGHT: 480
};
GameDEV.Boot = function(game) {};
GameDEV.Boot.prototype = {
	preload: function() {
		this.load.image('preloaderBg', 'assets/img/loading-bg.png');
		this.load.image('preloaderBar', 'assets/img/loading-bar.png');
	},
	create: function() {
	    this.game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
		this.game.state.start('Preloader');
	}
};