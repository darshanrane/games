
BasicGame.Game = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:
    //  #f8a420
    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;    //  the tween manager
    this.state;	    //	the state manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator

    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

BasicGame.Game.prototype = {

	create: function(){
        this.level = 16;
        this.iWidth = 108.30;
        this.iHeight = 123;
        this.iconsArr = [];

        this.createGrid();
	},
    createGrid: function(){
        
        this.iconsGroup = this.add.group();

        while(this.iconsArr.length < this.level){
            var randomnumber = Math.ceil((Math.random()*43) + 1)
            if(this.iconsArr.indexOf(randomnumber) > -1) continue;
            this.iconsArr[this.iconsArr.length] = randomnumber;
            this.iconsArr[this.iconsArr.length] = randomnumber;
        }

        this.shuffleArr();
        var y = 0;
        var x = 0;
        for(i = 0; i < this.iconsArr.length; i++)
        {
            if((x+1) * this.iWidth > BasicGame._WIDTH)
            {
                y++;
                x = 0;
            } 
            var icons = this.make.button(x * this.iWidth, y * this.iHeight, 'smiley', this.iconClick, this, this.iconsArr[i], this.iconsArr[i], this.iconsArr[i]);   
            //this.icons = this.iconsGroup.create(x * this.iWidth, y * this.iHeight, 'smiley');
            //this.icons = this.add.sprite(x * this.iWidth, y * this.iHeight, 'smiley');
            //icons.frame = this.iconsArr[i];
            icons.tint = 0xFFffff;
            this.iconsGroup.add(icons);
            x++;
        }
        this.iconsGroup.x = this.game.world.centerX - (this.iconsGroup.width/2);
        this.iconsGroup.y = this.game.world.centerY - (this.iconsGroup.height/2);
    },
    shuffleArr: function(){
        var j, x, i;
        for (i = this.iconsArr.length; i; i--) {
            j = Math.ceil(Math.random() * i);
            x = this.iconsArr[i - 1];
            this.iconsArr[i - 1] = this.iconsArr[j];
            this.iconsArr[j] = x;
        }
    },
    iconClick: function(evt){
        //compare frame for same icons type
        //compare z for same icon click
        console.log(evt);
    },
	update: function(){

		//	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

	},
	quitGame: function(pointer){

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
		this.state.start('MainMenu');
	}

};
