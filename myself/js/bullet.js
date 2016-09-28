function Bullet (_type) {
	this.ele = null;

	this.bulletTimer = null;
	this.type = _type;
	this.id = Math.random() * 100000;
	this.speed = -10;
	this.no = 0;
}

Bullet.prototype.init = function(){
	var self = this;
	switch(self.type){
		case 0:
	 		stand_bullet_create(self);
	 	break;
	 	case 1:
			double_bullet_create(self);
	 		break;
	 	case 2:
			four_bullet_create(self);
	 		break;
	 	case 3:
			stand_bullet_create(self);
	 		break;
	 	case 4:
			stand_bullet_create(self);
	 		break;
	}
	return this;
}
Bullet.prototype.init1 = function (obj) {
	var self = this;
	enemy_bullet(obj,self);
	return this;
}

Bullet.prototype.fly = function (){
	var self = this;
	switch(self.type){
		case 0:
		case 1:
			me_bullet_move(self);
			break;
		case 2:
			four_move(self);
			break;
		case 3:
			me_bullet_move(self);
			break;
		case 4:
			five_move(self);
			break;
	}
}
Bullet.prototype.fly1 = function(){
	enemyMove(this);
}

Bullet.prototype.boom = function () {
	clearInterval(this.bulletTimer);
	var self = this;
	this.ele.className = 'bullet-die';
	var dieImg = ["images/die1.png","images/die2.png"];
	var index = 0;
	self.bulletTimer = setInterval(function(){
		if (index < dieImg.length){
			self.ele.style.background = "url(" + dieImg[index] + ") no-repeat";
			index++;
		}else{
			clearInterval(self.bulletTimer);
			gameEngine.ele.removeChild(self.ele);			
		}
		
	},30);
}
//敌方子弹
function enemy_bullet (enemy_obj,obj){
	obj.ele = document.createElement("div");
	obj.ele.className = "bullet1";

	gameEngine.ele.appendChild(obj.ele);
	gameEngine.bullets1[obj.id] = obj;

	obj.ele.style.left = enemy_obj.ele.offsetLeft + enemy_obj.ele.offsetWidth / 2 - obj.ele.offsetWidth / 2 + "px";
	obj.ele.style.top = enemy_obj.ele.offsetTop + enemy_obj.ele.offsetHeight + "px";
	return obj;
}
function enemyMove (this1) {
	var self = this1;

	var enxspeed = 1;
	var meplane_currl = myPlane.ele.offsetLeft;
	var emcurrl = self.ele.offsetLeft;

	enxspeed = (meplane_currl - emcurrl > 0 ) ?  enxspeed : -1 * enxspeed;

	var eneTimer = setInterval (function() {
		var current = self.ele.offsetTop;

		if ( current < gameEngine.ele.offsetHeight){
			self.ele.style.top = current + 10 + "px";
			self.ele.style.left = self.ele.offsetLeft + enxspeed + "px";
		}else{
			clearInterval(eneTimer);
			gameEngine.ele.removeChild(self.ele);
			delete gameEngine.bullets1[self.id];
		}

	},30);
}
//我方子弹
//type = 0,标准子弹创建
function stand_bullet_create(self){
	self.ele = document.createElement("div");
	self.ele.className = "bullet";
	gameEngine.ele.appendChild(self.ele);

	gameEngine.bullets0[self.id] = self;

	self.ele.style.left = myPlane.ele.offsetLeft + myPlane.ele.offsetWidth / 2 - self.ele.offsetWidth / 2 + "px";
	self.ele.style.top = myPlane.ele.offsetTop - self.ele.offsetHeight + "px";
}

function me_bullet_move(self) {

		self.bulletTimer = setInterval (function(){
		var current = self.ele.offsetTop + self.speed;

		if (current < - self.ele.offsetHeight){
			clearInterval(self.bulletTimer);

			gameEngine.ele.removeChild(self.ele);
			delete gameEngine.bullets0[self.id];
		}else{
			self.ele.style.top = current + "px";
		}
	},40);	
}

//type = 1; 双子弹创建move
function double_bullet_create(self){
		self.ele = document.createElement("div");
		self.ele.className = "bullet";
		gameEngine.ele.appendChild(self.ele);
		gameEngine.bullets0[self.id] = self;

		self.ele.style.top = myPlane.ele.offsetTop - self.ele.offsetHeight + "px";
		if(self.no == 0){
			self.ele.style.left = myPlane.ele.offsetLeft + myPlane.ele.offsetWidth / 2 - 3 * self.ele.offsetWidth / 2 + "px";
		}else if(self.no == 1){
			self.ele.style.left = myPlane.ele.offsetLeft + myPlane.ele.offsetWidth / 2 + self.ele.offsetWidth / 2 + "px";
		}
	}

//type = 2; 四子弹创建move
function four_bullet_create(self){
		self.ele = document.createElement("div");
		self.ele.className = "bullet";
		gameEngine.ele.appendChild(self.ele);
		gameEngine.bullets0[self.id] = self;
		self.ele.style.top = myPlane.ele.offsetTop - self.ele.offsetHeight + "px";
		if(self.no == 0){
			self.ele.style.left = myPlane.ele.offsetLeft + myPlane.ele.offsetWidth / 2 - 3 * self.ele.offsetWidth / 2 + "px";
		}else if(self.no == 1){
			self.ele.style.left = myPlane.ele.offsetLeft + myPlane.ele.offsetWidth / 2 + self.ele.offsetWidth / 2 + "px";
		}else if(self.no == 2){
			self.ele.style.left = myPlane.ele.offsetLeft + myPlane.ele.offsetWidth / 2 - 7 * self.ele.offsetWidth / 2 + "px";
		}else if(self.no == 3){
			self.ele.style.left = myPlane.ele.offsetLeft + myPlane.ele.offsetWidth / 2 + 5 * self.ele.offsetWidth / 2 + "px";
		}
	}

function four_move(obj){
		var json = {};
		switch(obj.no){
			case 0:				
				json = {"left": 0,"top": 0,"xspeed": -1};
				break;
			case 1:
				json = {"left":120,"top":0,"xspeed": 1};
				break;
			case 2:
				json = {"left":240,"top":0,"xspeed": -3};
				break;
			case 3:
				json = {"left":360,"top":0,"xspeed": 3};
				break;
		}
		obj.bulletTimer = setInterval (function(){
 		
	 		var currt = obj.ele.offsetTop;
	 		var currl = obj.ele.offsetLeft;
           
	 		if (currt == json.top || currl < 0 || currl > gameEngine.ele.offsetWidth - obj.ele.offsetWidth){
	 			clearInterval(obj.bulletTimer);
	 			gameEngine.ele.removeChild(obj.ele);
	 			delete gameEngine.bullets0[obj.id];
	 		}else{
		 		obj.ele.style.top = currt + obj.speed + "px";
		 		obj.ele.style.left = currl + json.xspeed + "px";
		 	}

	 },40);
}


function five_move(obj){
	var json = {};
	var xleft = myPlane.ele.offsetLeft + obj.ele.offsetWidth;
	var xWidth = myPlane.ele.offsetLeft + myPlane.ele.offsetWidth - obj.ele.offsetWidth;
	json = {'top':0,"xmin":xleft,"xmax":xWidth,"xspeed":10};

	obj.bulletTimer = setInterval (function(){
	
	 		var currt = obj.ele.offsetTop;
	 		var currl = obj.ele.offsetLeft;
           
	 		if ( currl >= json.xmax || currl <= json.xmin){
	 			json.xspeed *= -1;
	 		}

	 		if (currt <= json.top){
	 			clearInterval(obj.bulletTimer);
	 			gameEngine.ele.removeChild(obj.ele);
	 			delete gameEngine.bullets0[obj.id];
	 		}else{
		 		obj.ele.style.top = currt + obj.speed + "px";
		 		obj.ele.style.left = currl + json.xspeed + "px";
		 	}

	 },40);
}
Bullet.prototype.boss_fly = function(ene_obj){
		var self = this;
		switch (ene_obj.bullet_type){
			case 1:
				enemyMove(self);
			break;
			case 2:
				boss_bullet1_move(self);
			break;
			case 3:
				boss_bullet2_move(self);
			break;
		}
		
}

Bullet.prototype.boss_init = function (bossobj){
	var self = this;
	switch (bossobj.hptype){
		case 0:
			return enemy_bullet(bossobj,self);
			break;
		break;
		case 1:
			return boss_bullet1(bossobj,self);
			break;
		case 2:
			return boss_bullet1(bossobj,self);
			break;
	}
}

function boss_bullet1(bossobj,self){
		self.ele = document.createElement("div");
		self.ele.className = "bullet1";
		gameEngine.ele.appendChild(self.ele);
		gameEngine.bullets1[self.id] = self;
		self.ele.style.top = bossobj.ele.offsetTop + bossobj.ele.offsetHeight + "px";
		if(self.no == 0){
			self.ele.style.left = bossobj.ele.offsetLeft + bossobj.ele.offsetWidth / 2 - 3 * self.ele.offsetWidth / 2 + "px";
		}else if(self.no == 1){
			self.ele.style.left = bossobj.ele.offsetLeft + bossobj.ele.offsetWidth / 2 + self.ele.offsetWidth / 2 + "px";
		}else if(self.no == 2){
			self.ele.style.left = bossobj.ele.offsetLeft + bossobj.ele.offsetWidth / 2 - 7 * self.ele.offsetWidth / 2 + "px";
		}else if(self.no == 3){
			self.ele.style.left = bossobj.ele.offsetLeft + bossobj.ele.offsetWidth / 2 + 5 * self.ele.offsetWidth / 2 + "px";
		}
		return self;
	}
function boss_bullet1_move (bul_obj) {
		bul_obj.speed = 10;
		bul_obj.bulletTimer = setInterval (function(){
		var current = bul_obj.ele.offsetTop + bul_obj.speed;

		if (current >  gameEngine.ele.offsetHeight){
			clearInterval(bul_obj.bulletTimer);
			gameEngine.ele.removeChild(bul_obj.ele);
			delete gameEngine.bullets1[bul_obj.id];
		}else{
			bul_obj.ele.style.top = current + "px";
		}
	},40);	
}
function boss_bullet2_move (bul_obj) {
		var json = {};
		var iw = gameEngine.ele.offsetHeight
		switch(bul_obj.no){
			case 0:				
				json = {"left": 0,"bottom": iw,"xspeed": -1,"yspeed":10};
				break;
			case 1:
				json = {"left":120,"bottom":iw,"xspeed": 1,"yspeed":10};
				break;
			case 2:
				json = {"left":240,"bottom":iw,"xspeed": -3,"yspeed":10};
				break;
			case 3:
				json = {"left":360,"bottom":iw,"xspeed": 3,"yspeed":10};
				break;
		}
	    bul_obj.bulletTimer = setInterval (function(){
 		
	 		var currt = bul_obj.ele.offsetTop;
	 		var currl = bul_obj.ele.offsetLeft;
           
	 		if (currt == json.bottom || currl < 0 || currl > gameEngine.ele.offsetWidth - bul_obj.ele.offsetWidth){
	 			clearInterval(bul_obj.bulletTimer);
	 			gameEngine.ele.removeChild(bul_obj.ele);
	 			delete gameEngine.bullets0[bul_obj.id];
	 		}else{
		 		bul_obj.ele.style.top = currt + json.yspeed + "px";
		 		bul_obj.ele.style.left = currl + json.xspeed + "px";
		 	}

	 },40);
}