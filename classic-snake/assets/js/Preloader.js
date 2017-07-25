GameDEV.Preloader = function(game) {};
GameDEV.Preloader.prototype = {
	preload: function() {

		this.preloadBg = this.add.sprite((window.innerWidth-297)*0.5, (window.innerHeight-145)*0.5, 'preloaderBg');
		this.preloadBar = this.add.sprite((window.innerWidth-158)*0.5, (window.innerHeight-50)*0.5, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);

		this.load.image('menu', './assets/img/opener.png');
		this.load.image('snake', './assets/img/snake.png');
        this.load.image('apple', './assets/img/apple.png');
        this.load.image('gameover', './assets/img/gameover.png');

	},
	create: function() {
		this.game.state.start('MainMenu');
	}
};