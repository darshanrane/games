GameDEV.Preloader = function(game) {};
GameDEV.Preloader.prototype = {
	preload: function() {

		this.preloadBg = this.add.sprite((1000-297)*0.5, (480-145)*0.5, 'preloaderBg');
		this.preloadBar = this.add.sprite((1000-158)*0.5, (480-50)*0.5, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);

		this.load.image('bg', 'assets/img/bg.jpg',1000,480);
		this.load.image('house', 'assets/img/house.png',1000,480);
		this.load.image('overlay', 'assets/img/overlay.png',1000,480);
		this.load.image('mesg1', 'assets/img/mesg1.png', 275, 290);
		this.load.image('mesg2', 'assets/img/mesg2.png', 245, 260);
		this.load.image('mesg3', 'assets/img/mesg3.png', 241, 70);
		this.load.spritesheet('playbtn', 'assets/img/play.png', 198, 90, 2);
		this.load.spritesheet('reindeer', 'assets/img/reindeer.png', 56, 73, 2);
		this.load.image('santa','assets/img/santa.png',292,113);
		this.load.spritesheet('scorebg','assets/img/statsbg.png',60,60,2);
		this.load.spritesheet('timerbg','assets/img/statsbg.png',60,60,2);
		this.load.image('logo','assets/img/logo.png',252,97);
		this.load.image('missed','assets/img/missed.png',149,110);
		this.load.image('success','assets/img/success.png',245,146);
	},
	create: function() {
		this.game.state.start('MainMenu');
	}
};