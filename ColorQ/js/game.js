var cArr = ['r','g','b','y'];
var score = 0;
var uArr = [];
var cQ;
var animateTime = 1000;
(function() {
	$(".gameContainer").addClass('animated zoomIn');
	$(".playBtn").bind('click', function(e){
		$(".opener").addClass('animated fadeOut');
	});
	$('.opener').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		$(".opener").hide();
		$(".gameMsg").show();
		$(".gameArena").show();
		$(".gameArena").addClass('animated fadeIn');
		animateColor();
	});

})();

function shuffle(arr) {
    var ctr = arr.length, temp, index;
    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arr[ctr];
        arr[ctr] = arr[index];
        arr[index] = temp;
    }
    return arr;
}

function animateColor(){
	cQ = shuffle(cArr);
	setTimeout(function() { $("#" + cQ[0]).addClass('animated bounceIn'); }, animateTime);
	setTimeout(function() { $("#" + cQ[1]).addClass('animated bounceIn'); }, animateTime*2);
	setTimeout(function() { $("#" + cQ[2]).addClass('animated bounceIn'); }, animateTime*3);
	setTimeout(function() { $("#" + cQ[3]).addClass('animated bounceIn'); }, animateTime*4);
	setTimeout(function() { 
		$("#" + cQ[0]).removeClass('animated bounceIn');
		$("#" + cQ[1]).removeClass('animated bounceIn');
		$("#" + cQ[2]).removeClass('animated bounceIn');
		$("#" + cQ[3]).removeClass('animated bounceIn');		
		$(".gameMsg").html("Your Turn");
		$(".gameMsg").removeClass('blue');
		$(".gameMsg").addClass('yellow');
		setListeners();
	}, animateTime*5);
}

function setListeners() {
	$('.animate').bind('click', function(e){
		$(e.target).unbind('click');
		uArr.push(e.target.id);
		if(uArr.length == 4)
		{
			var result = arraysAreIdentical(uArr, cQ);
			if(result){
				$(".gameMsg").html("Perfect Q<br/>Play Again");
				$(".gameMsg").removeClass('yellow');
				$(".gameMsg").addClass('green');
			}
			else
			{
				$(".gameMsg").html("Wrong Q<br/>Try Again");
				$(".gameMsg").removeClass('yellow');
				$(".gameMsg").addClass('red');
			}
			$('.gameMsg').bind('click', function(e){
				$(".gameMsg").html("Watch Q");
				$(".gameMsg").removeClass('green');
				$(".gameMsg").removeClass('red');
				$(".gameMsg").addClass('blue');
				uArr = [];
				$(e.target).unbind('click');
				animateColor();
			});
		}	
	});
}

function arraysAreIdentical(arr1, arr2){
    if (arr1.length !== arr2.length) return false;
    for (var i = 0, len = arr1.length; i < len; i++){
        if (arr1[i] !== arr2[i]){
            return false;
        }
    }
    return true; 
}