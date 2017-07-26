var GameDEV = {
	_WIDTH: window.innerWidth,
	_HEIGHT: window.innerHeight
};
GameDEV.Boot = function(game) {};
GameDEV.Boot.prototype = {
	preload: function() {
		this.load.image('preloaderBg', 'assets/img/loading-bg.png');
		this.load.image('preloaderBar', 'assets/img/loading-bar.png');
		this.stage.backgroundColor = '#A3CE27';
	},
	create: function() {
	    this.game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
		this.game.state.start('Preloader');
	}
};