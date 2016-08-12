package src
{
	import flash.display.MovieClip;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	import flash.events.MouseEvent;
	import flash.events.TimerEvent;
	import flash.display.StageScaleMode;
	import flash.display.StageAlign;
	import flash.media.SoundChannel;
	import flash.ui.Keyboard;
	import flash.utils.Timer;
	
	import com.greensock.TweenLite;
	import com.greensock.easing.*;
	import com.greensock.plugins.*;
	TweenPlugin.activate([TintPlugin]);
	
	/**
	 * ...
	 * @author Freelance Flash Developer - http://www.darshanrane.com
	 */
	public class Main extends Sprite 
	{
		private var bgMc;
		private var timerMc;
		private var scoreMc;
		private var playerMc;
		private var rectcoverMc;
		private var playMc;
		private var logoMc;
		private var bgW:Number = 0;
		private var bgH:Number = 0;
		
		private var ballAddSpeed:Number = 1000;
		private var playerStep:uint = 60;
		private var gameTime:Number = 61;
		private var ballTimer:Timer;
		private var gameTimer:Timer;
		private var gameOverFlag:Boolean = false;
		private var ballCount:Number = 0;
		
		private var crowdS;
		private var crowdCh:SoundChannel;
		
		public function Main():void 
		{
			if (stage) init();
			else addEventListener(Event.ADDED_TO_STAGE, init);
		}
		
		private function init(e:Event = null):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, init);
			
			stage.align = StageAlign.TOP_LEFT;
			stage.scaleMode = StageScaleMode.NO_SCALE;
			stage.addEventListener(Event.RESIZE, stageResize);
			
			// entry point
			bgMc = new bgmc();
			addChild(bgMc);
			bgW = bgMc.width;
			bgH = bgMc.height;
			
			addLogoPlay();
		}
		
		private function addLogoPlay():void 
		{
			logoMc = new logomc();
			addChild(logoMc);
			logoMc.alpha = 0;
			
			playMc = new playmc();
			addChild(playMc);
			playMc.alpha = 0;
			
			stageResize(null);
			
			TweenLite.to(logoMc, 0.5, { alpha:1 } );
			TweenLite.to(playMc, 0, { alpha:1 } );	
			
			playMc.useHandCursor = true;
			playMc.buttonMode = true;
			playMc.addEventListener(MouseEvent.CLICK, playGame);
			
			crowdS = new crowdSnd();
			crowdCh = new SoundChannel();
			crowdCh = crowdS.play();
			crowdCh.addEventListener(Event.SOUND_COMPLETE, loopSound);
		}
		
		private function loopSound(e:Event):void 
		{
			crowdCh = crowdS.play();
		}
		
		private function playGame(e:Event):void
		{
			TweenLite.to(playMc, 0.5, { alpha:0, onComplete:function() {  removeChild(playMc); playMc = null; }  } );
			TweenLite.to(logoMc, 0.5, { alpha:0, onComplete:function() {  removeChild(logoMc); logoMc = null; }  } );
			
			if (!timerMc)
			{
				timerMc = new timermc();
				addChild(timerMc);
				timerMc.alpha = 0;
			}
			
			if (!scoreMc)
			{
				scoreMc = new scoremc();
				addChild(scoreMc);
				scoreMc.alpha = 0;
			}
			
			if (!playerMc)
			{
				playerMc = new playermc();
				addChild(playerMc);
				playerMc.alpha = 0;
				playerMc.cacheAsBitmap = true;
			}
			
			stageResize(null);
			TweenLite.to(playerMc, 0, { alpha:0, y:(stage.stageHeight) } );
			TweenLite.to(playerMc, 0.5, { alpha:1, y:(stage.stageHeight - playerMc.height), delay:1.2, onComplete:startGame } );
			TweenLite.to(timerMc, 0.5, { alpha:1, delay:0.9 } );
			TweenLite.to(scoreMc, 0.5, { alpha:1, delay:0.9 } );			
			
			ballCount = -1;
			updateScore();
			gameOverFlag = false;
		}
		
		private function startGame():void
		{
			addListener();
			startCountDown();
			
			ballTimer = new Timer(ballAddSpeed, 0);
			ballTimer.addEventListener(TimerEvent.TIMER, ballAdd);
			ballTimer.start();
		}
		private function ballAdd(e:TimerEvent):void 
		{
			var ballMc = new ballmc();
			ballMc.x = randomNumber(50, stage.stageWidth - 50);
			ballMc.y = -10;
			ballMc.id = 0;
			ballMc.scaleX = ballMc.scaleY = 0.4;
			this.addChild(ballMc);
			ballMc.addEventListener(Event.ENTER_FRAME, ballMcMove);
		}
		private function ballMcMove(e:Event):void 
		{
			var bmc = e.currentTarget
			bmc.y += 20;
			if (bmc.y > stage.stageHeight)
			{
				bmc.removeEventListener(Event.ENTER_FRAME, ballMcMove);
				this.removeChild(bmc);
				bmc = null;
			}
			else if (bmc.hitTestObject(playerMc.hitmc))
			{
				bmc.removeEventListener(Event.ENTER_FRAME, ballMcMove);
				playerMc.gotoAndPlay('hit');
				TweenLite.to(bmc, 0.2, { alpha:0, onComplete:function() {
					removeChild(bmc);
					bmc = null;
					updateScore();
				} } );
			}
		}
		
		private function updateScore():void 
		{
			ballCount++;
			scoreMc.txt.text = ballCount;
		}
		
		private function addListener():void 
		{
			stage.addEventListener(KeyboardEvent.KEY_DOWN, keyPressedDown);
		}
		
		private function keyPressedDown(event:KeyboardEvent):void 
		{
			var key:uint = event.keyCode;
			var xpos = playerMc.x;
		    switch (key) 
			{
				case Keyboard.LEFT :
					if(playerMc.x > 20)
					{
						var xpos1 = playerMc.x - playerStep;
						TweenLite.to(playerMc, 0.3, { x:xpos1, onComplete: function() { 
								
							TweenLite.delayedCall(2, function() {	playerMc.gotoAndStop('normal'); } );
							
							} } );
						playerMc.gotoAndStop('move');
					}
				break;
				case Keyboard.RIGHT :
					if(playerMc.x < stage.stageWidth-135)
					{
						var xpos2 = playerMc.x + playerStep;
						TweenLite.to(playerMc, 0.3, { x:xpos2, onComplete: function() { 
								
							TweenLite.delayedCall(2, function() {	playerMc.gotoAndStop('normal'); } );
							
							} } );
						playerMc.gotoAndStop('move');
					}
				break;
			}
		}
		
		private function startCountDown():void
		{
			gameTimer = new Timer(1000, gameTime);
			gameTimer.addEventListener(TimerEvent.TIMER, countDown);
			gameTimer.addEventListener(TimerEvent.TIMER_COMPLETE, gameComplete);
			gameTimer.start();
		}
		
		private function countDown(event:TimerEvent):void 
		{
			if ((gameTime) - gameTimer.currentCount == 60)
				timerMc.txt.text = "01:00";
			else
			{
				if ((gameTime) - gameTimer.currentCount < 10)
					timerMc.txt.text = "00:0" + String((gameTime)-gameTimer.currentCount);
				else
					timerMc.txt.text = "00:" + String((gameTime)-gameTimer.currentCount);
			}
		}
		
		private function gameComplete(e:TimerEvent):void 
		{
			if (gameOverFlag == false)
			{
				gameOverFlag = true;
				gameOver();
			}
		}
		
		private function gameOver():void 
		{
			gameTimer.removeEventListener(TimerEvent.TIMER, countDown);
			gameTimer.removeEventListener(TimerEvent.TIMER_COMPLETE, gameComplete);
			gameTimer.stop();
			
			ballTimer.removeEventListener(TimerEvent.TIMER, ballAdd);
			ballTimer.stop();
			
			TweenLite.to(timerMc, 0.5, { alpha:0 } );
			TweenLite.to(playerMc, 0.5, { alpha:0, y:(stage.stageHeight), onComplete:addLogoPlay } );
			stage.removeEventListener(KeyboardEvent.KEY_DOWN, keyPressedDown);
			
		}
		
		private function randomNumber(min:Number, max:Number):Number 
		{
			return Math.floor(Math.random() * (1 + max - min) + min);
		}
		
		private function stageResize(e:Event):void 
		{
			bgMc.width = stage.stageWidth;
			bgMc.height = bgH * (bgMc.width / bgW);
			bgMc.x = stage.stageWidth / 2 - bgMc.width / 2;
			bgMc.y = stage.stageHeight / 2 - bgMc.height / 2;
			
			if (logoMc!=null)
			{
				logoMc.scaleX = logoMc.scaleY = bgMc.width / bgW * 2;
				logoMc.x = stage.stageWidth / 2 - logoMc.width / 2;
				logoMc.y = stage.stageHeight / 2 - logoMc.height / 2 - 50;
			}
			
			if (playMc!=null)
			{
				playMc.scaleX = playMc.scaleY = bgMc.width / bgW * 2;
				playMc.x = stage.stageWidth / 2 - playMc.width / 2;
				playMc.y = logoMc.y + logoMc.height + 20;
			}
			
			if (playerMc!=null)
			{
				playerMc.x = stage.stageWidth / 2 - playerMc.width / 2;
				playerMc.y = stage.stageHeight - playerMc.height;
			}
			
			if(timerMc!=null)
				timerMc.x = stage.stageWidth - timerMc.width - 20;
				
			if(scoreMc!=null)
				scoreMc.x = scoreMc.y = 15;
		}
		
	}
	
}