function load(key) {
  	return JSON.parse(localStorage[key]);
}

function save(key, obj) {
	localStorage[key] = JSON.stringify(obj);
}
	 

$(document).ready(function() {
	var timer;
	
	var guns = {
		0 : {
			id : 0,
			name : "Морковка",
			coins : 0,
			img : "0-carrot.png"
		},
		1 : {
			id : 1,
			name : "Топор",
			coins : 500,
			img : "1-axe.png"
		}
	};
	
	function config() {
		if(typeof localStorage["coins"] == 'undefined') {
			 localStorage["coins"] = 0;
		}
		
		if(typeof localStorage["gun"] == 'undefined') {
			 localStorage["gun"] = 0;
		}
		
		if(typeof localStorage["theme"] == 'undefined') {
			 localStorage["theme"] = 0;
		}
		
		if(typeof localStorage["shop"] == 'undefined') {
			var data = {
				guns: [0]
			};
			
			save("shop", data);
		}
	}
	
	function timer() {
		timer = setInterval(function(){
			if(localStorage["time"] >= 60) {
				var minutes = Math.floor(localStorage["time"] / 60);
				$(".minutes").text(minutes);
				var seconds = localStorage["time"] - minutes * 60;
				$(".seconds").text(seconds);
			} else if(localStorage["time"] > 0) {
				$(".minutes").text("0");
				
				if(localStorage["time"] >= 10) {
					$(".seconds").text(localStorage["time"]);
				} else {
					$(".seconds").text("0"+localStorage["time"]);
				}
			} else {
				$(".seconds").text("00");
				stop();
			}
			
			localStorage["time"]--;
		}, 1000);
	}
		
	function show_rabbits() {
		var showtime = 1000;
		var hidetime = 900;
		var number;
		var prev;
		show = setInterval(function() {
			number = 1 + Math.floor(Math.random() * 9);
			if(number == prev) {
				number = 1 + Math.floor(Math.random() * 9);
				prev = number;
				return number;
			} else{
				el = $('#lunka-'+number+' .rabbit');
				el.data("ready", 1);
				el.addClass("rabbit-show");
				setTimeout(function() {
					el.removeClass("rabbit-show");
					el.data("ready", 0);
					
					setTimeout(function() {
						var randSkin = 1 + Math.floor(Math.random() * 4);
						
						var prefix = "rabbit-skin-";
						var classes = el.attr("class").split(" ").filter(function(c) {
						    return c.lastIndexOf(prefix, 0) !== 0;
						});
						el.attr("class", classes.join(" "));
						
						el.addClass("rabbit-skin-"+randSkin);
						el.data("money", randSkin*5);
					}, 800);

				}, hidetime);
			}
	
		}, showtime);
	}
	
	function stop() {
		clearInterval(timer);
		clearInterval(show);
		alert("Конец");
	}
	
	$(".lunka").click(function(){
		var self = $(this).find(".rabbit");
	
		if(self.data("ready") == 1) {
			localStorage["coins"] = parseInt(localStorage["coins"]) + parseInt(self.data("money"));
			localStorage["time"] = parseInt(localStorage["time"]) + 2;
			self.addClass("rabbit-dead");
			self.addClass("rabbit-show");
			
			setTimeout(function() {
				self.removeClass("rabbit-dead");
				self.removeClass("rabbit-show");
			}, 600);
			
			$(".coins").text(localStorage["coins"]);
			el.data("ready", 0);
		}
		return false;
	});
	
	$(".openShop").click(function(){
		$("#shop").slideToggle(1000);
	});
	
	function shop() {
		var data = load("shop");
			
		$.each(guns, function(i, val) {
			var id = val["id"];
			var coins = val["coins"];
			var name = val["name"];
			var img = val["img"];
			
			var status = 0;
			if (data.guns.indexOf(id) >= 0) {
				status = 1;
			}
			
			var icon = '<i class="fa fa-money"></i>';
			if(status == 1) {
				var checked = "fa-check-circle-o";
				if(parseInt(localStorage["gun"]) == parseInt(id)) {
					checked = "fa-check-circle";
				}
				icon = '<i class="fa '+checked+'"></i>';
				coins = "";
			}
			
	    	$(".shopjs .row").append('<div class="col-xs-4"><div class="buy-gun" data-id="'+id+'" data-coins="'+coins+'" data-status="'+status+'" style="cursor: url(img/guns/'+img+'), auto;"><div class="img"><img src="img/guns/'+img+'" alt=""></div><p class="gun-info"><strong class="gun-title">'+name+'</strong><br>'+icon+' '+coins+'</p></div></div>');
	    });
	}
	
	function init() {
		config();
		
		$("body.game").addClass("gun-"+localStorage["gun"]+" theme-"+localStorage["theme"]);
		
		
		localStorage["time"] = 27;
		timer();
		$(".coins").text(localStorage["coins"]);
		
		show_rabbits();
		
	}
	
	if($("body").hasClass("game")) {
		init();	
	}
	
	if($("body").hasClass("index")) {
		config();
		shop();
	}
});

$(document).on("click", ".buy-gun", function() {
	var cost = $(this).data("coins");
	var status = $(this).data("status");
	var id = $(this).data("id");
	var title = $(this).find(".gun-title").text();
	
	if(status == 0) {
		if(parseInt(localStorage["coins"]) >= parseInt(cost)) {
			var data = load("shop");
			data.guns.push(id);
			save("shop", data);
			
			localStorage["gun"] = id;
			
			alert("Вы успешно приобрели: " + title);
			
			localStorage["coins"] = parseInt(localStorage["coins"]) - parseInt(cost);
			
			location.reload();
		} else {
			alert("У вас недостаточно средств для покупки!");
		}
	} else {
		localStorage["gun"] = id;
		alert("Вы выбрали оружие: " + title);
		
		location.reload();
		/*
		$.ajax({
					data: "",
					url: "index.html",
					success: function(data) {
						var shop = $(data).filter("#shop").html();
						$("#shop").addClass("loading");
						
						setTimeout(function(){
							$("#shop").html(shop);
							$("#shop").removeClass("loading");
						}, 1500);
					}
				})
		*/
	}
});