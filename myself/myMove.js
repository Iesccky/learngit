//获取样式对象:
	function getStyleVal (obj,attr) {
		return window.getComputedStyle ? window.getComputedStyle(obj)[attr] : obj.currentStyle[attr];
	}



//获取移动对象的属性。
	function getObjBor(obj){
		obj.endl = parseInt(getStyleVal(obj,"left"));
		obj.endt = parseInt(getStyleVal(obj,"top"));
		obj.w = parseInt(getStyleVal(obj,"width"));
		obj.h = parseInt(getStyleVal(obj,"height"));
		obj.endw = obj.endl + obj.w;
		obj.endh = obj.endt + obj.h;
	}
//获取障碍物的碰撞边界
	function getAbstBor(obj, objmove){
		obj.endl = parseInt(getStyleVal(obj,"left")) - objmove.w;
		obj.endt = parseInt(getStyleVal(obj,"top")) - objmove.h;
		obj.endw = parseInt(getStyleVal(obj,"width")) + parseInt(getStyleVal(obj,"left"));
		obj.endh = parseInt(getStyleVal(obj,"height")) + parseInt(getStyleVal(obj,"top"));
	}

//停止
	function stopMove(){
		
	}