GameDEV.GameOver = function(game) {};
GameDEV.GameOver.prototype = { 
    preload : function() {
        this.load.image('gameover', './assets/img/gameover.png');
    },
    create : function() {
        this.gameover = this.add.button((window.innerWidth/2) - (360/2), (window.innerHeight/2) - (480/2), 'gameover', this.startGame, this);
        this.add.text(this.gameover.x + 100, this.gameover.y + 240, "FINAL SCORE:", { font: "bold 20px sans-serif", fill: "#000", align: "center"});
        this.add.text(this.gameover.x + 250, this.gameover.y + 240, score.toString(), { font: "bold 20px sans-serif", fill: "#000", align: "center" });
    },
    startGame: function () {
        this.game.state.start('Game');
    }
};