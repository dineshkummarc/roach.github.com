// Content handling
$('#menu-wrap ul#menu li a').bind('click', function() {
	var url = $(this).attr("href");
	// need check to verify relative URL
	var height = $(this).attr("hash").substring(1);
	// bad asumption: hash is always height, always a numeric value
	loadContent(url, height);
	// Do I want this to load based on URL or Hash? (#home vs. home.html#400)
	return false
});

function loadContent(url, height){	
	$('#page-content').fadeOut('fast', function(){
		$('#page-container').animate({height: height},1000, function(){
			$('#page-content').load(url, function() {
				$('#page-content').fadeIn('fast');
				if(url = "home.html#400"){logoInit()};
			});
		})
	})
}

$('#page-content').load('home.html', function() {
	$('#page-content').fadeIn('fast');
	logoInit();
});
// End content handling

// Begin animation functions
var logopulseTimer = 0;
function logoInit(){
	// Define opacity for header element (MS filter properties)
	$('#urbandev-logo, #urbandev-logo-glow, #urbandev-logo .slogan').css('opacity', 0);

	// Animate UD logo
	$('#urbandev-logo').animate(
	   { opacity: 0.6
	   },
	   500,
	   function(){
	    $('h2.slogan').animate({top: [275, 'swing'], opacity: 0.6}, 500, function(){
				$('#urbandev-logo-glow').animate({opacity: 0.2},150, function(){
					$('#urbandev-logo-glow').animate({opacity: 0.1},50).animate({opacity: 0.4},1000);			
				});
				logoPulse();
	    });
	  }
	)
}

function logoPulse()
{
  function pulseAnimation()
  {
		$('#urbandev-logo-glow').animate({opacity: 0.2},500).animate({opacity: 0.4},1000);
  }
	if(!logoTimer){ var logoTimer = setTimeout(pulseAnimation, 5000)};
}
// End animation functions