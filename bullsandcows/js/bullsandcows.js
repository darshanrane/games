var nums;
var tries = 0;
var num = new Array();

$(document).ready(function() 
{	
	$("#playBtn").click(function(){
		
		$("#screen1").hide();
		$("#screen2").show();
		
		$("#playBtn").hide();
		$("#guessBtn").show();
		$("#resetBtn").css("opacity", 1);
		$("#clearBtn").css("opacity", 1);
		$("#numContainer").css("opacity", 1);
		
		initGame();		
		
	});
	

});

function initGame()
{
	getRandom();
	
	$(".num").each(function() {
		
		$(this).click(function(){	
		
			if($("#userInput").text() == "____")
				$("#userInput").empty();
				
			if($("#userInput").text().length < 4)
			{
				$("#userInput").append(this.id.substr(3));
				num.push(this.id.substr(3));
			}
		});
		
	});
	
	$("#clearBtn").click(function(){
		
		if($("#userInput").text() == "____")
			$("#userInput").empty();
	
		if($("#userInput").text().length > 0)
		{
			$("#userInput").html($("#userInput").text().substr(0, $("#userInput").text().length - 1));
			num.pop();
		}
	});
	
	$("#resetBtn").click(function(){
		getRandom();
		$("#userInput").html('____');
		$("#userPreContainer").html('');
		tries = 0;
		$("#cows").html('0');
		$("#bulls").html('0');
	});
	
	$("#guessBtn").click(function(){
		checkNum();
	});
}

function getRandom()
{
	nums = new Array();
	for(i = 0; i < 4; i++)
	{
		var add = true;
		var n = Math.floor(Math.random()*9) + 1;
		for(j = 0; j < 4; j++)
		{
			if(nums[j] == n)
				add = false;
		}
		if(add)
			nums.push(n)
		else
			i--;
	}
}

function checkNum()
{
	var c=0;
	var b=0;
	
	for(var i = 0; i < 4; i++)
	{
		if(nums[i] == num[i])
			b++;
	}
	
	for(var i = 0; i < 4; i++)
	{
		for(var j = 0; j < 4; j++)
		{
			if(nums[j] == num[i] && j != i)
				c++;
		}
	}
	
	$("#cows").html(c);
	$("#bulls").html(b);
	
	var userstr = "";
	for (k in num)
    	userstr += (num[k]);
	
	$("#userPreContainer").append("<div class='userPreInput'>"+ userstr +"</div>");
	$("#userInput").html('____');
	num = new Array();
	
	if(b == 4)
	{
		alert("Wo Hoo!! You Win!! Its " + nums);
		resetGame();
	}

	tries++;
	if(tries == 10)
	{
		alert("Bad Luck!! You Lose!! Its " + nums);
		resetGame();
	}
	$(".tries").html(tries + '/10');
}
function resetGame()
{
	$("#userInput").html('____');
	$("#cows").html('0');
	$("#bulls").html('0');
	tries = 0;
    num = new Array();
	$("#userPreContainer").empty();		
	getRandom();
}