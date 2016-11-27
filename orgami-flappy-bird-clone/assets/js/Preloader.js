BasicGame.Preloader = function (game) {
	this.background = null;
	this.preloadBar = null;
	this.ready = false;
};

BasicGame.Preloader.prototype = {
	preload: function () {
		this.preloadBar = this.add.sprite(300, 400, 'preloaderImg');
		this.load.setPreloadSprite(this.preloadBar);
		this.load.image('bird', 'assets/img/bird.png');
		this.load.image('pipe', 'assets/img/pipe.png');
		this.load.audio('jumpsnd', 'assets/sound/jump.wav'); 
	},
	create: function () {
		this.state.start('MainMenu');
	}
};
