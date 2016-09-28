var reword = {
	"ele" : null,
	"left": 0,
	"top" : 0,
	"timers": null,
	"type": 0,
	"bullet_speed":800,
	"speedChange": [],

	init: function(_left, _top, _type){
		reword.ele = document.createElement("div");
		reword.type = _type;
		reword.ele.className = "reword";
		reword.ele.style.left = _left;
		reword.ele.style.top = _top;
		gameEngine.ele.appendChild(reword.ele);
		return this;
	},
	move: function (){
		var speed = 10;
		reword.timers = setInterval(function(){
			var current = reword.ele.offsetTop;

			if (current > gameEngine.ele.offsetHeight){
				clearInterval(reword.timers);
				gameEngine.ele.removeChild(reword.ele);
			}else{
				reword.ele.style.top = current + speed + "px";
			}
		},100);
	}
}