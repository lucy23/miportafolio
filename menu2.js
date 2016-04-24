

$('#mobile-button').click(function() {
	var menu = $('#menu-container'); //scope

	if (menu.is(':visible') ) {
		menu.hide();
		

	

	} else {
		menu.show();
		$('#mobile-button').hide();
		$('#mobile-close').show();

	}
});




$('#mobile-close').click(function() {
	var menu = $('#menu-container'); 
	menu.hide();
	$('#mobile-button').show();
	$('#mobile-close').hide();
});


$(window).resize(function(){
	if($(window).windth()>991)
	{
		$('mobile-close').hide();
		$('mobile-button').hide();
	}else{
		$('mobile-button').show();

	}


})