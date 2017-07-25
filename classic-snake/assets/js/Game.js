GameDEV.Game = function(game) {};
GameDEV.Game.prototype = {
    create: function() {
        
        snake = [];                     
        apple = {};                     
        squareSize = 15;                
        score = 0;                      
        speed = 0;                     
        updateDelay = 0;                
        direction = 'right';            
        new_direction = null;           
        addNew = false;                 

        cursors = this.input.keyboard.createCursorKeys();

        this.stage.backgroundColor = '#A3CE27';

        for(var i = 0; i < 10; i++){
            snake[i] = this.add.sprite(150+i*squareSize, 150, 'snake');
        }

        this.generateApple();

        textStyle_Key = { font: "bold 14px sans-serif", fill: "#000", align: "center" };
        textStyle_Value = { font: "bold 14px sans-serif", fill: "#000", align: "center" };
        this.add.text(30, 20, "SCORE: ", textStyle_Key);
        scoreTextValue = this.add.text(90, 20, score.toString(), textStyle_Value);
        this.add.text(30, 40, "SPEED: ", textStyle_Key);
        speedTextValue = this.add.text(90, 40, speed.toString(), textStyle_Value);

    },

    update: function() {

        if (cursors.right.isDown && direction!='left')
        {        new_direction = 'right';       }
        else if (cursors.left.isDown && direction!='right')
        {        new_direction = 'left';        }
        else if (cursors.up.isDown && direction!='down')
        {        new_direction = 'up';          }
        else if (cursors.down.isDown && direction!='up')
        {        new_direction = 'down';        }

        speed = Math.min(10, Math.floor(score/5));
        speedTextValue.text = '' + speed;
        updateDelay++;
        if (updateDelay % (10 - speed) == 0) {

            var firstCell = snake[snake.length - 1],
                lastCell = snake.shift(),
                oldLastCellx = lastCell.x,
                oldLastCelly = lastCell.y;

            if(new_direction){
                direction = new_direction;
                new_direction = null;
            }

            if(direction == 'right'){

                lastCell.x = firstCell.x + 15;
                lastCell.y = firstCell.y;
            }
            else if(direction == 'left'){
                lastCell.x = firstCell.x - 15;
                lastCell.y = firstCell.y;
            }
            else if(direction == 'up'){
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y - 15;
            }
            else if(direction == 'down'){
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y + 15;
            }

            snake.push(lastCell);
            firstCell = lastCell;
            if(addNew){
                snake.unshift(this.add.sprite(oldLastCellx, oldLastCelly, 'snake'));
                addNew = false;
            }

            this.appleCollision();
            this.selfCollision(firstCell);
            this.wallCollision(firstCell);
        }
    },

    generateApple: function(){

        var randomX = Math.floor(Math.random() * Math.floor((window.innerWidth-45)/15) ) * squareSize,
            randomY = Math.floor(Math.random() * Math.floor((window.innerHeight-45)/15) ) * squareSize;

        apple = this.add.sprite(randomX, randomY, 'apple');
    },

    appleCollision: function() {

        // Check if any part of the snake is overlapping the apple.
        // This is needed if the apple spawns inside of the snake.
        for(var i = 0; i < snake.length; i++){
            if(snake[i].x == apple.x && snake[i].y == apple.y){

                // Next time the snake moves, a new block will be added to its length.
                addNew = true;

                // Destroy the old apple.
                apple.destroy();

                // Make a new one.
                this.generateApple();

                // Increase score.
                score++;

                // Refresh scoreboard.
                scoreTextValue.text = score.toString();

            }
        }

    },

    selfCollision: function(head) {

        // Check if the head of the snake overlaps with any part of the snake.
        for(var i = 0; i < snake.length - 1; i++){
            if(head.x == snake[i].x && head.y == snake[i].y){
                this.game.state.start('GameOver');
            }
        }

    },

    wallCollision: function(head) {

        if(head.x >= window.innerWidth || head.x < 0 || head.y >= window.innerHeight || head.y < 0){
           this.game.state.start('GameOver');
        }

    }

};