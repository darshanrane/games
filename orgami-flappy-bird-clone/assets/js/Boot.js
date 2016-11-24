var BasicGame = {
    _WIDTH: 480,
    _HEIGHT: 800
};
BasicGame.Boot = function (game) {
};
BasicGame.Boot.prototype = {
    init: function () {
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;
        this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        this.game.stage.backgroundColor = '#f5ce0f';
    },
    preload: function () {
        this.load.image('preloaderImg', 'assets/img/loading-bar.png');
    },
    create: function () {
        this.game.scale.pageAlignVertically = true;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.refresh();
        this.game.state.start('Preloader');
    }
};