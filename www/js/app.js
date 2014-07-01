$(document).ready(function() {
	var timer;
	
	// конфиг: монеты, выбранное оружие по id (0 - дефолтная морковка)
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
		var hidetime = 800;
		show = setInterval(function() {
			var number = 1 + Math.floor(Math.random() * 9);
			$('#lunka-'+number+' .rabbit').addClass("rabbit-show");
			setTimeout(function() {
				$('#lunka-'+number+' .rabbit').removeClass("rabbit-show");
			}, hidetime);
		}, showtime);
	}
	
	
	function stop() {
		clearInterval(timer);
		clearInterval(show);
		alert("Конец");
	}
	
	function init() {
		config();
		
		$("body").addClass("gun-"+localStorage["gun"]+" theme-"+localStorage["theme"]);
		
		
		localStorage["time"] = 27;
		timer();
		$(".coins").text(localStorage["coins"]);
		
		show_rabbits();
		
	}
	
	init();
});