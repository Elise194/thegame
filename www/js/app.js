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
	
	function stop() {
		clearInterval(timer);
		clearInterval(show);
		alert("Конец");
	}
	
	function init() {
		config();
		
		localStorage["time"] = 27;
		
		timer();
		
		$(".coins").text(localStorage["coins"]);
		
		// сюда запилить функцию выпрыгивания кроликов
		var showtime = 1000;
		var hidetime = 500;
		show = setInterval(function() {
			var number = 1 + Math.floor(Math.random() * 9);
			$('#lunka-'+number+' .rabbit').addClass("rabbit-show");
				setInterval(function() {
					$('#lunka-'+number+' .rabbit').removeClass("rabbit-show");
				}, hidetime);
		}, showtime);
		
	}
	
	init();

	// demo
	/*
	var i = 0;
	$(".test-rabbit").click(function(){
		if(i == 0) {
			$(".rabbit").addClass("rabbit-show"); // показывает кролика
			$(this).text("Скрыть");
			i = 1;
		} else {
			$(".rabbit").removeClass("rabbit-show"); // скрывает кролика
			$(this).text("Показать");
			i = 0;	
		}
		
		return false;
	});
	//
	*/
});