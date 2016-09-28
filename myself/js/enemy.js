function Enemy(){
	this.ele = document.createElement("div");
	this.hp = 0;
	this.score = 0;
	this.type = 0;
	this.speed = 0;
	this.bullet_type = 1;
	this.id = Math.random() * 100000;
	this.dieImgs = [];
	this.timers = null;

	this.init = function(_type){
		var self = this;
		switch(_type){
			case self.Enemy_Type_Big:
				self.ele.className = "enemy-big";
				self.hp = self.Enemy_HP_Big;
				self.type = self.Enemy_Type_Big;
				self.score = self.Enemy_Score_Big;
				self.speed = self.Enemy_Speed_Big;
				gameEngine.ele.appendChild(self.ele);
				self.ele.style.left = parseInt(Math.random() * (gameEngine.ele.offsetWidth - self.ele.offsetWidth)) + "px";
				self.ele.style.top = -self.ele.offsetHeight + "px";
				this.dieImgs = ['images/plane4_die1.png', 'images/plane4_die2.png', 'images/plane4_die3.png', 'images/plane4_die4.png', 'images/plane4_die5.png', 'images/plane4_die6.png'];

				gameEngine.enemys[self.id] = self;
				break;
			case self.Enemy_Type_Middle:
				self.ele.className = "enemy-middle";
				self.hp = self.Enemy_HP_Middle;
				self.type = self.Enemy_Type_Middle;
				self.score = self.Enemy_Score_Middle;
				self.speed = self.Enemy_Speed_Middle;
				gameEngine.ele.appendChild(self.ele);
				self.ele.style.left = parseInt(Math.random() * (gameEngine.ele.offsetWidth - self.ele.offsetWidth)) + "px";
				self.ele.style.top =  -self.ele.offsetHeight + "px";

				this.dieImgs = ['images/plane2_die1.png', 'images/plane2_die2.png', 'images/plane2_die3.png', 'images/plane2_die4.png'];
				gameEngine.enemys[self.id] = self;
				break;
			case self.Enemy_Type_Small:

				self.ele.className = "enemy-small";
				self.hp = self.Enemy_HP_Small;
				self.type = self.Enemy_Type_Small;
				self.score = self.Enemy_Score_Small;
				self.speed = self.Enemy_Speed_Small;
				gameEngine.ele.appendChild(self.ele);
				self.ele.style.left = parseInt(Math.random() * (gameEngine.ele.offsetWidth - self.ele.offsetWidth)) + "px";
				self.ele.style.top = -self.ele.offsetHeight + "px";
		
				this.dieImgs = ['images/plane1_die1.png', 'images/plane1_die2.png', 'images/plane1_die3.png'];
				gameEngine.enemys[self.id] = self;
				break;
		}
		return this;
	};

	this.move = function () {
		var self = this;
		
		this.timer = setInterval (function () {

			var current = self.ele.offsetTop;

			if(current > gameEngine.ele.offsetHeight){
				clearInterval(self.timer);
				clearInterval(self.timers);
				gameEngine.ele.removeChild(self.ele);
				delete gameEngine.enemys[self.id];
			}else{
				self.ele.style.top = current + self.speed + "px";
			}
		},30);
		return this;
	};

	this.hurt = function () {
		
		this.hp--;
		if(this.hp == 0){
			gameEngine.enemy_count++;
			clearInterval(this.timer);
			var self = this;
			var index = 0;
			self.timer = setInterval(function() {
				if(index < self.dieImgs.length){
					self.ele.style.background = "url(" + self.dieImgs[index] + ") no-repeat";
					index++;
				}else{
					clearInterval(self.timer);
					clearInterval(self.timers);
					gameEngine.battleReword(self.ele.style.left,self.ele.style.top);
					gameEngine.ele.removeChild(self.ele);
					delete gameEngine.enemys[self.id];
				}
			},30);

			var scoreboard = document.getElementsByClassName("score")[0];
			scoreboard.innerHTML = parseInt(scoreboard.innerHTML )	+ self.score;
		//--boss	
			if (gameEngine.enemy_count == 20 || gameEngine.enemy_count % 100 == 0){
				var Boss_one = new Enemy_Boss(100 + gameEngine.enemy_count,100);
				Boss_one.init().move().lanchBullet();
			}
		}
	}
}

Enemy.prototype = {
	Enemy_Type_Big : 1,
	Enemy_Type_Middle : 2,
	Enemy_Type_Small : 3,

	Enemy_HP_Big : 10,
	Enemy_HP_Middle : 4,
	Enemy_HP_Small : 1,

	Enemy_Score_Big : 50,
	Enemy_Score_Middle : 30,
	Enemy_Score_Small : 10,

	Enemy_Speed_Big : 2,
	Enemy_Speed_Middle : 4,
	Enemy_Speed_Small : 6,
}

Enemy.prototype.lanchBullet = function () {
	var self = this;
	var count = 0;
	switch(self.type){
		case 1:
			self.timers = setInterval(function(){
				var enemy_bul = new Bullet(0);
				enemy_bul.init1(self).fly1(self);
			},2000);
			
			break;
		case 2:
			var n = 0;
			self.timers = setInterval(function(){
				n++;
				if (n % 3 == 1){
					var enemy_bul = new Bullet(0);
					enemy_bul.init1(self).fly1(self);
				}
			},700);

			break;
		case 3:			
			var enemy_bul = new Bullet(0);
			enemy_bul.init1(self).fly1(self);
			break;
	}
}




//boss   try

function Enemy_Boss (_hp, _score){
	this.ele = document.createElement("div");
	this.hp = _hp;
	this.allhp = _hp;
	this.score = _score;
	this.hptype = 0;			//0 、1、 2
	this.speed = 2;
	this.id = Math.random() * 100000;
	this.bullet_type = 1;
	this.dieImgs = ['images/plane3_die1.png', 'images/plane3_die2.png', 'images/plane3_die3.png', 'images/plane3_die4.png', 'images/plane3_die5.png', 'images/plane3_die6.png'];
	this.timers = null;
	this.timers_bul = null;

	this.init = function () {
		this.ele.className = "enemy-boss";
		gameEngine.ele.appendChild(this.ele);
		this.ele.style.left = (gameEngine.ele.offsetWidth - this.ele.offsetWidth) / 2 + "px";
		this.ele.style.top = -this.ele.offsetHeight + "px"; 
		gameEngine.enemys[this.id] = this;
		return this;
	};

	this.move = function () {
		var self = this;
		this.timer = setInterval(function(){
			var current_left = self.ele.offsetLeft;
			var current_top = self.ele.offsetTop;
			if(current_top <= -self.ele.offsetHeight * 0.3){
				self.ele.style.top = current_top + self.speed + "px";
			}else{
				if (current_left >= gameEngine.ele.offsetWidth - self.ele.offsetWidth || current_left <= 0){
					self.speed *= -1;
				}
				self.ele.style.left = current_left + self.speed + "px";
			}
		},50);
		return this;
	};

	this.hurt = function () {
		
		this.hp--;
		var self = this;

		switch(self.hp){
			case self.allhp * 0.8:
				self.ele.style.background = "url(" + self.dieImgs[0] + ") no-repeat";
				break;
			case self.allhp * 0.6:
				self.ele.style.background = "url(" + self.dieImgs[0] + ") no-repeat";
				break;
			case self.allhp * 0.4:
				self.hptype = 1;
				self.bullet_type = 2;
				clearInterval(self.timers);
				createBul(self);
				self.ele.style.background = "url(" + self.dieImgs[1] + ") no-repeat";
				break;
			case self.allhp * 0.2:
				self.hptype = 2;
				self.bullet_type = 3;
				clearInterval(self.timers);
				createBul(self);
				self.ele.style.background = "url(" + self.dieImgs[2] + ") no-repeat";
				break;
			case self.allhp * 0:
				clearInterval(self.timer);
				clearInterval(self.timers_bul);
				var index = 0;
				self.timer = setInterval(function(){
					if(index < self.dieImgs.length){
						self.ele.style.background = "url(" + self.dieImgs[index] + ") no-repeat";
						index++;
					}else{
						clearInterval(self.timer);
						gameEngine.ele.removeChild(self.ele);
						delete gameEngine.enemys[self.id];
					}
				},100);
				var scoreboard = document.getElementsByClassName("score")[0];
				scoreboard.innerHTML = parseInt(scoreboard.innerHTML )	+ self.score;
				break;
		}
	}
}
Enemy_Boss.prototype.lanchBullet = function () {
	var self = this;
	this.timers_bul = setInterval(function () {
		createBul(self);
	},2000);
}

function createBul(obj){
	switch(obj.hptype){
		case 0:			
			var enemy_bul = new Bullet(0);
			enemy_bul.boss_init(obj).boss_fly(obj);		
			break;
		case 1:	
			for (var i = 0 ; i < 4; i++){
				var enemy_bul = new Bullet(0);
				enemy_bul.no = i;
				enemy_bul.boss_init(obj).boss_fly(obj);
			}
			break;
		case 2:
			for (var i = 0 ; i < 4; i++){
				var enemy_bul = new Bullet(0);
				enemy_bul.no = i;
				enemy_bul.boss_init(obj).boss_fly(obj);
			}
			break;
	}
}