$(document).ready(function(){
	
	// demo
	var i = 0;
	$(".test-rabbit").click(function(){
		if(i == 0) {
			$(".rabbit").addClass("rabbit-show"); // показывает кролика
			i = 1;
		} else {
			$(".rabbit").removeClass("rabbit-show"); // скрывает кролика
			i = 0;	
		}
		
		return false;
	});
	//
	
});