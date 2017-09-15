(function() {

	window.addEventListener("load", function() {

		// 拿到所有的侧栏数据分点
			// 标记点大小
		var W = Math.floor(width * 30 / 750);
		var N = Math.floor(width * 15 / 750);

		var data = [54, 78, 108, 208, 118, 238];

		// 左侧数据导航存储
		var arrData = [];

		// 获取上下文
		var a_canvas = document.getElementById('myCanvas');

		// 根据屏幕大小给画布赋值
		var canvasWidth = Math.floor(width * 653 / 750);
		a_canvas.setAttribute('width', canvasWidth + 'px');
		a_canvas.setAttribute('height', canvasWidth * 340 / 653 + 'px'); //translate方法也可以直接传入像素点坐标
		var cxt = context = a_canvas.getContext("2d");
		// 绘制背景
		var gradient = context.createLinearGradient(0, 0, 0, canvasWidth);


		// gradient.addColorStop(0,"#e0e0e0");
		//gradient.addColorStop(1,"#ffffff");


		context.fillStyle = gradient;

		context.fillRect(0, 0, a_canvas.width, a_canvas.height);


		// 描绘边框
		var grid_cols = data.length;
		var grid_rows = 5;
		var cell_height = a_canvas.height / grid_rows;
		var cell_width = a_canvas.width / grid_cols;
		console.log(cell_width, cell_height)
		context.lineWidth = 100;
		context.strokeStyle = "red";

		// 结束边框描绘
		context.beginPath();
		/* // 准备画横线
		for (var col = 0; col <= grid_cols; col++) {
		   var x = col * cell_width;
		   context.moveTo(x,0);
		   context.lineTo(x,a_canvas.height);
		 }
		 // 准备画竖线
		 for(var row = 0; row <= grid_rows; row++){
		   var y = row * cell_height;
		   context.moveTo(0,y);
		   context.lineTo(a_canvas.width, y);
		 }
		 context.lineWidth = 1;
		 context.strokeStyle = "#ed710f";
		 context.stroke();*/



		var max_v = 0;

		for (var i = 0; i < data.length; i++) {
			var d = 0;
			if (data[i] < 0) {
				d = d - data[i];
			} else {
				d = data[i];
			};
			if (d > max_v) {
				max_v = d
			};
		}
		max_v = Math.ceil(max_v * 1.1);
		// 给左侧导航数据赋值
		var sum;
		for (var i = 0; i < grid_rows; i++) {
			sum = Math.ceil(max_v * (grid_rows - i) / grid_rows);
			arrData.push(sum);
		}
		$(".chart_up .data").each(function(i, c) {
				$(c).text(arrData[i]);
			})
			// 将数据换算为坐标
		var points = [];
		for (var i = 0; i < data.length; i++) {
			var v = data[i];
			var px = cell_width * 　(i + 1) - cell_width / 2;
			var py = a_canvas.height - a_canvas.height * (v / max_v);
			points.push({
				"x": px,
				"y": py
			});
		}
		// 绘制折现
		context.beginPath();
		context.moveTo(points[0].x, points[0].y);
		for (var i = 1; i < points.length; i++) {
			context.lineTo(points[i].x, points[i].y);
		}


		context.lineWidth = 1.5;
		context.strokeStyle = "#ed710f";
		context.stroke();

		//绘制坐标图形
		for (var i in points) {
			var p = points[i];
			context.beginPath();
			context.arc(p.x, p.y, 8, 0, 2 * Math.PI);

			//实心圆
			/*
			 context.fillStyle = "#000";*/
			//空心圆
			context.strokeStyle = "#ed710f";
			context.stroke();
			context.fillStyle = "white";
			context.fill();

		}
		for (var i in points) {
			var p = points[i];
			context.beginPath();
			context.arc(p.x, p.y, 4, 0, 2 * Math.PI);

			//实心圆
			/*
			 context.fillStyle = "#000";*/
			//空心圆
			context.fillStyle = "#ed710f";
			context.fill();
		}
		//添加文字
		for (var i in points) {
			var p = points[i];
			context.beginPath();
			context.fillStyle = "#999999";
			context.font = "30red Courier New";
			if (data[i] < data[i - 1] && i >= 1 || p.y - 15 < 15) {
				context.fillText(data[i], p.x - 6, p.y + 20, 30);
			} else {
				context.fillText(data[i], p.x - 6, p.y - 15, 30);
			}

		}
	}, false);
})();
$(function() {
	// 获取当前月份
	var mydate = new Date();
	// 给月份赋值
	var old_date = mydate.toLocaleDateString();
	var arr = old_date.split("/");

	var new_date = "";
	for (var i = 0; i < arr.length - 1; i++) {
		if (i > 0&&arr[i].length<2) {
			new_date += "年";
			new_date +="0"+arr[i];
		}else{
			new_date +=arr[i];
		}
		
	}
	new_date+="月";
	var new_date_text = "本月（" + new_date + "）";
	// 给本月赋值
	$(".up_list .td").text(new_date_text);
	// 给下拉框选择月份赋值
	var Html1 = "<p class='list1'>" + new_date + "</p>"
	$(".up_down_wrap").append(Html1);
	//添加今年其它月份

	// 拿到年份
	var year = arr[0];
	var add_month = "";
	var month = arr[1] * 1;
	// 循环月份
	for (var i = 1; i < month; i++) {
		if(i<10){
			var Html = "<p class='list2'>" + year + "年" + "0"+i+ "月" + "</p>";
		}else{
			var Html = "<p class='list2'>" + year + "年" +i+ "月" + "</p>";
		}
		
		$(".up_down_wrap").append(Html);
	}

	// 近六个月曲线图 日期初始化
	initDate(month);

	$(".proect_profit .select_list").on("click", "li", function() {
			$(this).find(".down").slideToggle(500);
		})
	// 选择时间

	$(".select_date .center").on("click", ".up_list", function() {
		$(this).siblings(".up_down_wrap").slideToggle(500);
	})
	$(".up_down_wrap").on("click", "p", function() {
			var text = $(this).text();
			if(text==new_date){
				text="本月（"+text+"）";
			}
			var m = text.substr(text.length - 3, 2) * 1;
			initDate(m);
			$(this).parents(".up_down_wrap").hide().siblings(".up_list").find(".td").text(text);
		})
		// 选择年份
		// 控制月份选择栏
	var select_month = false;
	$(".select_date").on("click", ".prev,.next", function() {
		switch ($(this).attr("class")) {
			case "prev":
				year -= 1;
				break;
			case "next":
				year += 1;
				break;
		}
		var content = year + "年1月";
		$(this).siblings(".center").find(".td").text(content);
		if (year < arr[0]) {

		} else if (year = arr[0]) {
			location.reload();
			select_month = false;
		} else {

		}
		if (!select_month) {
			$(this).siblings(".center").find(".up_down_wrap").children().remove();
			for (var i = 1; i <= 12; i++) {
				if(i<10){
					var text = "<p class='list2'>" + year + "年" +"0" + i + "月" + "</p>";
				}else{
					var text = "<p class='list2'>" + year + "年"  + i + "月" + "</p>";
				}
				
				$(this).siblings(".center").find(".up_down_wrap").append(text);
			}
			select_month = true;
			initDate(6);
		}

	})
	// 选择项目部
	console.log($(".projectpart"))
	$(".projectpart").on("click","p",function(){

		var text=$(this).text();
		$(this).parents(".projectpart").siblings(".td").text(text);
	})


	// 近六个月曲线图 日期初始化 函数
	function initDate(m) {
		var arr_month = [];
		for (var i = 0; i < 6; i++) {
			arr_month.push(m + "月");
			if (m > 1) {
				m -= 1;
			} else {
				m = 12;
			}
		}
		$(".chart_down li").each(function(i, c) {
			$(c).text(arr_month[5 - i]);
		})
	}



})