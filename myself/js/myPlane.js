var myPlane = {
	"ele": null,
	"gameLevel": 1000,
	"bullet": [],
	"bullet_type": 0,
	"hp": 1,
	"meTimer": null,
	// "left": 0,
	// "top": 0,

	meInit: function () {
		myPlane.ele = document.createElement("div");
		myPlane.ele.className = "myplane";
		gameEngine.ele.appendChild(myPlane.ele);

		myPlane.ele.style.left = (gameEngine.ele.offsetWidth - this.ele.offsetWidth) / 2 + "px";
		myPlane.ele.style.bottom = "10px";

		myPlane.ele.onmousedown = function(e){
			dragmove(e)
		}
		document.onmouseup = function(){
			gameEngine.ele.onmousemove = null;
		}
		return this;
	},
	meMove: function () {
		document.onkeydown = function (e){
			var e = e || event;

			switch (e.keyCode){
				case 37:
					if(myPlane.ele.offsetLeft >= 10){
						myPlane.ele.style.left = myPlane.ele.offsetLeft - 10 + "px";
					}
					break;
				case 38:
					if(myPlane.ele.offsetTop >= 10){
						myPlane.ele.style.top = myPlane.ele.offsetTop - 10 + "px";
					}
					break;
				case 39:
					if (myPlane.ele.offsetLeft <= gameEngine.ele.offsetWidth - 10 - myPlane.ele.offsetWidth){
						myPlane.ele.style.left = myPlane.ele.offsetLeft + 10 + "px";
					}
					break;
				case 40:
					if (myPlane.ele.offsetTop <= gameEngine.ele.offsetHeight - 10 - myPlane.ele.offsetHeight){
						myPlane.ele.style.top = myPlane.ele.offsetTop + 10 + "px";
					}
					break;
				default:
					return;
			}
		}
	},
	meLanchBullet: function () {	
		clearInterval(this.meTimer);
		this.meTimer = setInterval(function(){
			createB(myPlane);
		},myPlane.gameLevel);		
		return this;
	},
	boom:function (callback) {
		clearInterval(this.meTimer);
		var index = 0;
		var dieImg = ["images/me_die1.png","images/me_die2.png","images/me_die3.png","images/me_die4.png"];
		var self = this;
		this.meTimer = setInterval(function() {
			if(index < dieImg.length){
				self.ele.style.background = "url("+ dieImg[index] +") no-repeat";
				index++;
			}else{
				clearInterval(self.meTimer);
				gameEngine.ele.removeChild(self.ele);
				if(callback){
					callback();
				}
			}
		},30);

	}
}
	function createB(obj){
		switch (obj.bullet_type){
			case 0:
				var mebullet = new Bullet(myPlane.bullet_type);
				mebullet.init().fly();
				break;
			case 1:
				for (var i = 0 ; i < 2 ;i++){
					var mebullet = new Bullet(myPlane.bullet_type);
					mebullet.no = i;
					mebullet.init().fly();
				}
				break;
			case 2:
				for (var i = 0 ; i < 4 ;i++){
					var mebullet = new Bullet(myPlane.bullet_type);
					mebullet.no = i;
					mebullet.init().fly();
				}
				break;
			case 3:
					var i = 0;
					var only_timer = setInterval(function(){
						if (i < 3){
							var mebullet = new Bullet(myPlane.bullet_type);
							mebullet.no = i;
							mebullet.init().fly();
							i++;
						}else{
							clearInterval(only_timer);
						}
					},140);
				break;
			case 4:
					var i = 0;
					var only_timer = setInterval(function(){
						if (i < 5){
							var mebullet = new Bullet(myPlane.bullet_type);
							mebullet.no = i;
							mebullet.init().fly();
							i++;
						}else{
							clearInterval(only_timer);
						}
					},140);
				break;
		}
	}

//tuo zhuai
	function dragmove(e) {
		var self = myPlane.ele;
		var e = e || event;
		var ox = e.offsetX;
		var oy = e.offsetY;

		gameEngine.ele.onmousemove = function (e){
			var e = event || e;

			var x = e.clientX - ox - gameEngine.ele.offsetLeft;
			var y = e.clientY - oy;

			if (x < 0){
				x = 0;
			}else if (x > gameEngine.ele.offsetWidth - self.offsetWidth){
				x = gameEngine.ele.offsetWidth - self.offsetWidth;
			}

			if(y < gameEngine.ele.offsetTop){
				y = 0;
			}else if(y > gameEngine.ele.offsetHeight - self.offsetHeight){
				y = gameEngine.ele.offsetHeight - self.offsetHeight;
			}

			self.style.left = x + "px";
			self.style.top = y + "px";
		}
	}


function myHelperPlane(){
	console.log("11");
}

