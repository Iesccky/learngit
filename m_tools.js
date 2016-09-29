//获取样式对象:
function getStyleVal (obj,attr) {
	return window.getComputedStyle ? window.getComputedStyle(obj)[attr] : obj.currentStyle[attr];
}

//匀速移动
/** 
* obj 移动的对象   attr 改变的属性(left,top,width,height)
* speed 移动速度(正负) moveEnd 结束条件
*/
function uniformMove (obj,attr,speed,moveEnd,fn) {

	clearInterval(obj.timer);

	obj.timer = setInterval ( function () {
		
		var curr = parseInt(getStyleVal(obj,attr));

		if (curr == moveEnd){
			clearInterval(obj.timer);
			if(fn){
				fn();
			}
			return "";
		}

		obj.style[attr] = (curr + speed) + "px";
	},100);
}

//缓冲移动
function bufferMove (obj, attr, moveEnd,fn) {
	clearInterval(obj.timer);

	obj.timer = setInterval ( function () {
		
		var curr = parseFloat(getStyleVal(obj,attr));
		curr = Math.round(curr);
		
		var iSpeed = (moveEnd - curr) / 6;
		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

		if (curr == moveEnd){
			clearInterval(obj.timer);
			if(fn){
				fn();
			}
			return "";
		}

		obj.style[attr] = (curr + iSpeed) + "px";
	},40);
}


//透明度变化
//第二个参数 changeTo 范围为 0 ~ 100
function opaChange (obj,changeTo){
	clearInterval(obj.timer);

	obj.timer = setInterval(function () {

		var curr = parseFloat(getStyleVal(obj,"opacity") * 100);
		curr = Math.round(curr);
		var iSpeed = (changeTo - curr) / 6;
		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

		if(curr == changeTo){
			clearInterval(obj.timer);
			return "";
		}

		obj.style.opacity = (curr + iSpeed) / 100;
		obj.style.filter = "alpha(opacity = "+(curr + iSpeed)+")";

	},60);
} 

//弹性运动
function resilMove (obj,iTarget) {
			clearInterval(obj.timer);

			var ispeed = 0;

			obj.timer = setInterval(function() {

				var curr = parseInt(getStyleVal(obj,"left"));

				ispeed += (iTarget - curr) / 5;
				ispeed = ispeed * 0.7 ;

				if (Math.abs(ispeed) < 1 && Math.abs(curr - ispeed) < 1){

					obj.style.left = iTarget + "px";

					clearInterval(obj.timer);
				}

				obj.style.left = (curr + ispeed) + "px";

			},30);
		}

//多属性变化
function startMove(obj,json,fn){

	 clearInterval(obj.timer);

	 

	 obj.timer = setInterval (function(){
	 	var flags = true;
	 	for (var attr in json){

	 		if (attr == "opacity"){
	 			var curr = parseFloat(getStyleVal(obj, attr) * 100);
            	curr = Math.round(curr);
	 		} else{
	 			var curr = parseFloat(getStyleVal(obj, attr));
           		 curr = Math.round(curr);
	 		}

	 		var iSpeed = (json[attr] - curr) / 8;
	 		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor (iSpeed);

	 		if (curr != json[attr]){
	 			flags = false;
	 		} 

	 		if (attr == "opacity"){

	 			obj.style.opacity = (curr + iSpeed) / 100;
	 			obj.style.filter = "alpha(opacity = "+(curr + iSpeed)+")";

	 		}else{
	 			obj.style[attr] = curr + iSpeed + "px";
	 		}
	 	}
	 	
	 	if(flags){

	 		clearInterval(obj.timer);
	 		if (fn){
	 			fn();
	 		}
	 	}

	 },40);

}

//随机生成屏幕内坐标
function createPosition(){
	var iw = document.body.clientWidth || document.documentElement.clientWidth;
	var ih = document.body.clientHeight || document.documentElement.clientHeight;
	var x = parseInt(Math.random() * iw);
	var y = parseInt(Math.random() * ih);
	return {"left":x,"top":y}
}


// 设置cookie
	function setCookie (name, val, iday) {
		var obj = new Date();
		if (iday != ""){
			iday = iday;
		}else {
			iday = 0;
		}
		obj.setDate(obj.getDate() + iday);
		document.cookie = "" + name + "=" + val + ";expires=" + obj +"; path=/";
	}
// 获取cookie
	function getCookie (name) {
		/*
			var str = document.cookie;
			var arr = str.split("; ");
			for (var i = 0; i < arr.length; i++){
				var arr2 = arr[i].split("=");
				if (cookiename == arr2[0]){
					return arr2[1];
				}
			}
			return "";
		*/

		var str = "";
		var reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)","gi");

		if(str = reg.exec(document.cookie))
			return(str[2]);
			return null;
		}
	}

// 删除cookie
	function removeCookie (name){
		setCookie(name, "", -1);
	}	
