
//游戏主体
var gameEngine = {
	"ele": null,
	"bullets0": {},
	"bullets1": {},
	"enemys": {},
	"enemy_count": 0,
	gameInit: function () {
		gameEngine.ele = document.getElementById("main_body");
		return this;
	},
	gameStart: function() {
		//我方飞机和子弹
		gameEngine.gameLoad(function(){
			myPlane.meInit().meLanchBullet().meMove();
		//敌方飞机和子弹
		gameEngine.createEnemy();

		//碰撞
		gameEngine.cashListen();

		//得分
		gameEngine.gameScore();
		});
	},

	gameLoad: function(callback) {
		var logo = document.createElement("div");
		logo.className = "logo";
		gameEngine.ele.appendChild(logo);

		var loading = document.createElement("div");
		loading.className = "loading";
		gameEngine.ele.appendChild(loading);

		var loadingCount = 0;
		var loadingBg = ["images/loading0.png","images/loading1.png","images/loading2.png"];

		var loadingTimer = setInterval(function(){
			loadingCount++;
			if (loadingCount >= 3) {
				clearInterval(loadingTimer);

				gameEngine.ele.removeChild(logo);
				gameEngine.ele.removeChild(loading);

				if (callback){
					callback();
				}
				
			}else{
				loading.style.background = "url("+ loadingBg[loadingCount % 3] +") no-repeat";
			}
		},500);

	},

	createEnemy: function(){
		setInterval(function(){

			var flag = Math.random() > 0.8 ? true : false;
			if(flag){
				var enemy_big = new Enemy();
				enemy_big.init(1).move().lanchBullet();
			}
		},10000);

		setInterval(function(){

			var flag = Math.random() > 0.5 ? true : false;
			if(flag){
				var enemy_middle = new Enemy();
				enemy_middle.init(2).move().lanchBullet();
			}
		},5000);

		setInterval(function(){

			var flag = Math.random() > 0.3 ? true : false;
			if(flag){
				var enemy_samll = new Enemy();
				enemy_samll.init(3).move().lanchBullet();
			}
		},2000);
	},
	cashListen: function(){
		setInterval(function(){
			for(var i in gameEngine.enemys){
				for (var j in gameEngine.bullets0){
					if (isCrash (gameEngine.enemys[i].ele, gameEngine.bullets0[j].ele) ){

						gameEngine.bullets0[j].boom();
						var idnum = gameEngine.bullets0[j].id
						delete gameEngine.bullets0[idnum];
						gameEngine.enemys[i].hurt();
					}
				}
				if (isCrash( myPlane.ele, gameEngine.enemys[i].ele) ){

					myPlane.boom(function(){
						alert("game over!");
						location.reload();
					});
				}
			}
			if(isCrash(myPlane.ele, reword.ele)){
				myPlane.bullet_type = reword.type;

				myPlane.gameLevel = reword.speedChange[reword.type];

				myPlane.meLanchBullet().meMove();

				gameEngine.ele.removeChild(reword.ele);
				clearInterval(reword.timers);
			}

		},30);

		setInterval(function(){
			for (var k in gameEngine.bullets1 ){
				if (isCrash (myPlane.ele, gameEngine.bullets1[k].ele)){
					myPlane.boom(function(){
						alert("game over!");
						location.reload();
					});
				}
			}
		},30);
	},
	gameScore: function	() {
			var scoreboard = document.createElement("div");
			scoreboard.className = "score";
			gameEngine.ele.appendChild(scoreboard);
			scoreboard.innerHTML = 0;


			var y = 0;
		var bgtimer = setInterval(function () {
			gameEngine.ele.style.backgroundPositionY = y++ + "px";
		},40);
			
	},
	battleReword: function (_left, _top) {
		var onlyOne = document.getElementsByClassName("reword")[0];
		if (onlyOne == undefined){
			var rtype = parseInt(Math.random() * 4) + 1;
			if( Math.random() < 0.2 ){
				reword.init(_left, _top,rtype).move();
			}
		}
	}
}