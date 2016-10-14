// nodejs 搭建简单服务器

	var http = new require("http");
// 处理url
	var url = require("url");
// 处理字符串
	var querystring = require("querystring");

// 请求指定地址数据: args:参数数组[] 、 resp: 返回事件
	function applyData(args, resp) {
		http.request ({
			// 域名
				hostname: "",
			// 端口
				port: "",
			// 路径
				path: "",
			method: "GET/POST",
			header: {}

		}, function(request) {	// 请求成功
			var data = "",
		// 获取请求数据
			request.on("data", function(chunk) { 
				data += chunk
			};
		// 请求结束处理
			request.on("end", function() {
				// 此处以jsonp的形式已解决ajax的跨域问题
				resp.end( args.callback + "("+ data + ")" );
			});
		}).on("error", function(msg) { 	// 请求失败
			console.log(msg.message);
		}).end() //结束request请求
	}

// 接受前端请求
	http.createServer(function(request, response) {
	// 获取前端请求url
		var pathname = url.parse(request.url).pathname;
	// 获取请求参数
		var params = url.parse(request.url).query;

		var paramsObj = querystring.parse(params); // JSON.stringify()

		applyData(paramsObj, response) 
		
	}).listen(1206) 	// 设置监听的端口

