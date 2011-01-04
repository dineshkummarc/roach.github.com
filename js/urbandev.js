// Content handling

var currentPage = '';

$('a.inline-content').live('click', function(event){
	var requestedURI = $(this).attr('href');
	loadContent(requestedURI)
  event.preventDefault();
});

function loadContent(URL){
	var page = parseUri(URL).file;
	var height = parseUri(URL).queryKey.height;
	if(parseUri(URL).file!=currentPage){
		$('#page-container').stop(true,true);
		$('#page-content').fadeOut('fast', function(){
			$('#page-container').animate({height: height}, 500,
				function(){
				$('#page-content').load(page, function() {
					currentPage = page;
					$('#page-content').fadeIn('fast');
				})
			})
		})
	}
}
// End content handling

// Begin animation functions
var logoTimer;
function logoInit(){
	// Define opacity for logo elements (MS filter properties)
	$('#home-urbandev-logo, #home-urbandev-logo-glow, #home-urbandev-logo .slogan').css('opacity', 0);
	// Animate UD logo
	$('#home-urbandev-logo').animate(
		{ opacity: 0.6 },
		500,
		function(){
			clearInterval(logoTimer);
			$('h2#home-slogan').stop(true,false);
			$('h2#home-slogan').animate({top: [375, 'swing'], opacity: 0.6}, 500, function(){
				$('#home-urbandev-logo-glow').animate({opacity: 0.2},150, function(){
					$('#home-urbandev-logo-glow').animate({opacity: 0.1},50).animate({opacity: 0.4},1000, function(){
						logoTimer = setInterval(logoPulse, 6000);
					})
				})
			})
		}
	)
}

function logoPulse()
{
	$('#home-urbandev-logo-glow').animate({opacity: 0.2},500).animate({opacity: 0.4},1000);
}
// End animation functions

// Handle external links (Open in new window/tab)
$('a.external-link').live('click', function(event){
	var requestedLink = $(this).attr('href');
	window.open(requestedLink,'_blank');
  event.preventDefault();
});