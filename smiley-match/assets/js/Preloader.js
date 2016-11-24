BasicGame.Preloader = function (game) {
	this.background = null;
	this.preloadBar = null;
	this.ready = false;
};

BasicGame.Preloader.prototype = {
	preload: function () {
		this.preloadBar = this.add.sprite(300, 400, 'preloaderImg');
		this.load.setPreloadSprite(this.preloadBar);
		this.load.spritesheet('smiley', 'assets/img/smiley.png', 108.30, 123, 44);
	},
	create: function () {
		this.state.start('MainMenu');
	}
};
