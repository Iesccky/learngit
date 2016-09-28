var Mainctrl = {
	ele : null,
	attacker : null,
	num : 0,
	timer: null,

	init : function () {
		this.ele = document.getElementById ("list");
		return this;
	},
	start : function () {
		this.ele.innerHTML = "";
		clearInterval(this.timer);

		var self = this;
		self.timer = setInterval(function(){
			self.num++;
			var hurts = self.attacker.attack();

			var oli_hurt = document.createElement("li");
			oli_hurt.innerHTML = "第 " + self.num + " 轮【" + self.attacker.name+ "】" + hurts.hurtSkill +" "+hurts.hurtHP + " 点血量";
			self.ele.appendChild(oli_hurt);

			if (self.attacker.enemy.hp <= 0){
				var oli_vitory = document.createElement("li");
				oli_vitory.style.color = "red";
				oli_vitory.innerHTML = "恭喜【"+ self.attacker.name +"】获得最后的胜利！";
				self.ele.appendChild(oli_vitory);
				clearInterval(self.timer);
			}

			self.attacker = self.attacker.enemy;


		},1000);
	}
}