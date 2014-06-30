$(document).ready(function(){
	
	// demo
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
	
});