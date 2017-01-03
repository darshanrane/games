GameDEV.MainMenu = function(game) {};
GameDEV.MainMenu.prototype = {
	create: function() {

		//Load Basics
		this.add.image(0, 0, 'bg');
		this.add.image(0, 0, 'house');
		this.add.image(0, 0, 'overlay');
		this.logo = this.add.image(10, 10, 'logo');

		//Message 1
		this.mesg1 = this.add.button(460, 105, 'mesg1', this.mesg2, this);
		this.mesg1.inputEnabled=true;
        this.mesg1.input.useHandCursor=true;

        //Message 2
		this.mesg2 = this.add.button(475, 130, 'mesg2', this.mesg3, this);
		this.mesg2.inputEnabled=true;
        this.mesg2.input.useHandCursor=true;
		this.mesg2.visible = false;

		//Message 3
		this.mesg3 = this.add.image(475, 180, 'mesg3');

        this.playbtn = this.add.button(475, 260, 'playbtn', this.startGame, this);
		this.playbtn.inputEnabled=true;
        this.playbtn.input.useHandCursor=true;
		this.mesg3.visible = false;
		this.playbtn.visible = false;
	},
	startGame: function() {
		this.game.state.start('Game');
	},
	mesg2: function() {
		this.mesg1.visible = false;
		this.mesg2.visible = true;
	},
	mesg3: function() {
		this.mesg2.visible = false;
		this.mesg3.visible = true;
		this.playbtn.visible = true;
	}
};