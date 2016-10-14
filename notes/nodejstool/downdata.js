// 简单网页爬虫
	var http = require("http");
	var cheerio = require("cheerio");
	var fs = require("fs");

// 获取网页的信息
	http.get(url, function(res) {
		var data = '';
		res.on("data", function(chunk) {
			data += chunk;
		});

		res.on("end", function() {
			var $ = cherrio.load(data);
		// 此处以img格式文件为例
			$("img").each( function(index, ele) {
				var imgSrc = $(ele).attr("src");
				downData(imgSrc); 
			})
		})
	})
// 下载数据
	function downData(src) {

	// 设置下载的文件的储存路径和文件名
		var filename = src.substring(src.lastIndexOf("/") + 1);
		var writestream = fs.createWriteStream(filename)
	
	// 下载文件
		http.get(src, function(res) {
			res.pipe(writestream);
		});
	// 下载完成
		writestream.on("finish", function() {
			console.log("success")
		})
	}



