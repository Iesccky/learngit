// node.js 创建服务器需要用到http的模块

	var http = require("http");					// 创建服务器
	var url = require("url");					// url处理
	var querystring = require("querystring");   // 字符串处理

	// console.log(http);

// 创建服务器	
		// require 请求 
		// response 响应
	var app = http.createServer(function(request, response){

	// 获取url上的键值对参数
		var paramStr = url.parse(request.url).query;
		// console.log(url.parse(request.url).query);

	// 把键值对参数转化成可用的js对象
		var param = querystring.parse(paramStr);
		console.log(param);

		var obj = [
			{
				"a": "i",
				"b": "wonder",
				"c": "nomean"
			},
			{
				"a": "myself",
				"b": "longtime",
				"c": "lost"
			}
		];


		response.end(param.callback+"("+JSON.stringify(obj)+")");

		// response.end(JSON.stringify(obj));
	})

// 设置端口
	app.listen(1206);
	console.log("server start at 1000");

