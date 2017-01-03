GameDEV.Game = function(game) {};
GameDEV.Game.prototype = {
    create: function() {
        this.reindeerCount = 0;
        // 
        this.reindeerArr = [[120, 380, 2, 1, 0],[190, 350, 1, 0.7, 0],[420, 360, 2, 0.8, 0],[595, 380, 2, 0.8, 0],[520, 375, 1, 0.8, 0],[625, 335, 1, 0.7, 0],[735, 335, 2, 0.7, 0], [800, 330, 1, 0.75, 0], [10, 400, 1, 1, 0], [510, 300, 2, 0.5, 0], [765, 236, 1, 0.4, 1], [445, 235, 1, 0.5, 1], [895, 330, 2, 0.75, 0], [940, 285, 2, 0.4, 0]];
        this.reindeerInGame = [];
        this.score = 0;
        this.gameTime = 10;
        this.gameTimeCounter=0;
        this.gametimerEvent;
        this.gametimer;     

        this.add.image(0, 0, 'bg');
        this.logo = this.add.image(10, 10, 'logo');
        this.scoreBg = this.add.sprite(860, 10, 'scorebg', 2);
        this.timerBg = this.add.sprite(930, 10, 'timerbg', 1);
        this.scoreText = this.add.text(878, 25, "00", {font: "30px ARCHRISTY",fill: "#006837", align: "center"});
        this.timerText = this.add.text(945, 25, this.gameTime, {font: "30px ARCHRISTY",fill: "#c1272d",align: "center"}); 

        this.reindeerGroup = this.add.group();
        this.reindeerInGame = this.reindeerArr;
        this.add.image(0, 0, 'house');

        this.gametimer = this.time.create(false);
        this.gametimer.loop(1000, this.updateTimer, this);
        this.gametimer.start();
    },
    catchReindeer: function(r){
        this.reindeerGroup.remove(r);
        this.score += 1;
        if(this.score < 10){
            this.scoreText.setText('0'+this.score);
        }else{
            this.scoreText.setText(this.score);
        }
    },
    resetValues: function(){
        this.score = 0;
        this.gameTime = 10;
        this.gameTimeCounter = 0;
        this.reindeerInGame = [];
        this.timerText.setText(this.gameTime);
        this.scoreText.setText('00');
    },
    replayGame: function(){
        this.resetValues();

        this.reindeerGroup.forEach(function(member){
            this.reindeerGroup.remove(member);
        }, this, true);
        this.reindeerGroup.visible = true;
        this.reindeerInGame = this.reindeerArr;

        this.remove(this.playbtn);
        //this.missed.remove();
        //this.overlay.remove();

        this.gametimer = this.time.create(false);
        this.gametimer.loop(1000, this.updateTimer, this);
        this.gametimer.start();
    },
    gameOver: function(){
        this.tweens.removeAll();
        this.reindeerInGame = [];
        this.reindeerGroup.forEach(function(member){
            this.reindeerGroup.remove(member);
        }, this, true);
        this.reindeerGroup.visible = false;

        this.add.image(0, 0, 'overlay');

        this.playbtn = this.add.button(500, 290, 'playbtn', this.create, this, 1, 1, 1);
        this.playbtn.inputEnabled=true;
        this.playbtn.input.useHandCursor=true;

        if(this.score < 8)
            this.mesg = this.add.image(520, 120, 'missed');
        else
            this.mesg = this.add.image(475, 130, 'success');
    },
    updateTimer: function() {
        this.gameTimeCounter++;
            
        if(this.gameTime == this.gameTimeCounter)
        {
            this.gametimer.stop();
            this.gameOver();
        }   

        if(this.gameTime - this.gameTimeCounter < 10){
            this.timerText.setText("0"+(this.gameTime - this.gameTimeCounter));
        }else{
            this.timerText.setText((this.gameTime - this.gameTimeCounter));
        }

        if(this.gameTime - this.gameTimeCounter <= 0)
            this.timerText.setText("0"+(this.gameTime - this.gameTimeCounter));
        
        if(this.reindeerInGame.length > 0)
        {
            this.rndno = this.rnd.integerInRange(0, this.reindeerInGame.length - 1)
            this.rndrow = this.reindeerInGame[this.rndno];
            this.reindeerInGame.splice(this.rndno, 1);
            this.reindeer = this.add.button(this.rndrow[0], this.rndrow[1], 'reindeer', this.catchReindeer, this);
            this.reindeer.frame = this.rndrow[2];
            this.reindeer.scale.set(this.rndrow[3] , this.rndrow[3]);
            this.reindeerGroup.add(this.reindeer);

            if(this.rndrow[4] == 0)
            {
                if(this.reindeer.frame == 1)
                {
                    this.reindeer.x = this.rndrow[0] + 15;
                    this.ctween = this.add.tween(this.reindeer).to( { x: this.rndrow[0] }, 200, "Linear", false, 0, 0).to( { x: this.rndrow[0] + 25 }, 200, "Linear", false, 2000).start();
                }    
                else 
                {
                    this.reindeer.x = this.rndrow[0] - 15;
                    this.ctween = this.add.tween(this.reindeer).to( { x: this.rndrow[0] }, 200, "Linear", false, 0, 0).to( { x: this.rndrow[0] - 25}, 200, "Linear", false, 2000).start();
                }                    
            }
            else
            {
                this.reindeer.y = this.rndrow[1] + 15;
                this.ctween = this.add.tween(this.reindeer).to( { y: this.rndrow[1] }, 200, "Linear", false, 0, 0).to( { y: this.rndrow[1] + 25 }, 200, "Linear", false, 2000).start();
            }
            
        }
    },
    replayTween: function(t, val) {
        console.log(t)
        console.log("axis : ", "val ", val);
    }
};