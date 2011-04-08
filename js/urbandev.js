var currentPage = '';

var loadContent = function(URL){
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

var logoInit = function(){
	$('#home-urbandev-logo, #home-urbandev-logo-glow, #home-urbandev-logo .slogan').css('opacity', 0);
	$('#home-urbandev-logo').animate(
		{ opacity: 0.6 },
		500,
		function(){
			var logoTimer;
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

var logoPulse = function()
{
	$('#home-urbandev-logo-glow').animate({opacity: 0.2},500).animate({opacity: 0.4},1000);
}

$('a.inline-content').live('click', function(event){
	var requestedURI = $(this).attr('href');
	loadContent(requestedURI)
  event.preventDefault();
});

$('a.external-link').live('click', function(event){
	var requestedLink = $(this).attr('href');
	window.open(requestedLink,'_blank');
  event.preventDefault();
});