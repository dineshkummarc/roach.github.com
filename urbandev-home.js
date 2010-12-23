// Define opacity for header element (MS filter properties)
$('#urbandev-logo, #urbandev-logo-glow, #urbandev-logo .slogan').css('opacity', 0);

// Begin animation functions
$('#urbandev-logo').animate(
 {
 opacity: 0.2,
 top: [100, 'swing']
 },
 1500
 ).animate(
   {
     opacity: 0.6
   },
   1000,
   function(){
    $('h2.slogan').animate({top: [275, 'swing'], opacity: 0.6}, 500, function(){
		    $('#urbandev-logo-glow').animate({opacity: 0.2},150, function(){
		    $('#urbandev-logo-glow').animate({opacity: 0.1},50).animate({opacity: 0.4},1000);			
		});
      var t=setInterval("logoPulse();",8000);
    });
  }
);      

function logoPulse(){$('#urbandev-logo-glow').animate({opacity: 0.2},500).animate({opacity: 0.4},1000);};

// End animation functions

// Content slider
$('#menu-wrap ul#menu li a').bind('click', function() {
	var url = $(this).attr("href");
	loadContent(url, 545);
	return false
});

function loadContent(url, height){
	$('#home-content').fadeOut('fast', function(){
		$('#home-content').hide().addClass('hidde');
		$('#page-container').animate({height: height},2500, function(){
			$('#page-content').load(url, function() {
				$('#page-content').fadeIn('fast');
			});
		})
	})
}
// End content slider