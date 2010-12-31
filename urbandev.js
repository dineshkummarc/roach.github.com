// Content handling
var currentPage = "";
$('#menu-wrap ul#menu li a').bind('click', function() {
	var requestedPage = $(this).attr("href");
	var requestedHeight = $(this).attr("hash").substring(1);
	if(requestedPage!=currentPage){loadContent(requestedPage, requestedHeight)};
	return false
});

function loadContent(url, height){
	$('#page-container').stop(true,true);
	$('#page-content').fadeOut('fast', function(){
		$('#page-container').animate({height: height},
			500,
			function(){
			$('#page-content').load(url, function() {
				currentPage = url;
				$('#page-content').fadeIn('fast');
			})
		})
	})
}
// End content handling

var logoTimer;
// Begin animation functions
function logoInit(){
	// Define opacity for logo elements (MS filter properties)
	$('#urbandev-logo, #urbandev-logo-glow, #urbandev-logo .slogan').css('opacity', 0);
	// Animate UD logo
	$('#urbandev-logo').animate(
		{ opacity: 0.6 },
		500,
		function(){
			$('h2.slogan').animate({top: [275, 'swing'], opacity: 0.6}, 500, function(){
				$('#urbandev-logo-glow').animate({opacity: 0.2},150, function(){
					$('#urbandev-logo-glow').animate({opacity: 0.1},50).animate({opacity: 0.4},1000, function(){
						var logoTimer = setTimeout(logoPulse, 5000);
					})
				})
	    })
	  }
	)
}

function logoPulse()
{
	$('#urbandev-logo-glow').animate({opacity: 0.2},500).animate({opacity: 0.4},1000);
}
// End animation functions