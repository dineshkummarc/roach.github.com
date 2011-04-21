var parseUri = function (str) {var o = parseUri.options, m = o.parser[o.strictMode ? "strict" : "loose"].exec(str), uri = {}, i = 14; while (i--) {uri[o.key[i]] = m[i] || ""; } uri[o.q.name] = {}; uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {if ($1) {uri[o.q.name][$1] = $2; } }); return uri; }; parseUri.options = {strictMode: false, key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"], q: {name: "queryKey", parser: /(?:^|&)([^&=]*)=?([^&]*)/g}, parser: {strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/, loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}};

var urbanDev = {
	initialize: function () {
		var URL = window.location.href;
		var homeUrl = $('#menu-wrap #menu .home-link').attr('href');
		if (parseUri(URL).anchor) { urbanDev.loadContent(URL); } else { urbanDev.loadContent(homeUrl); }
	},
	loadContent: function (URL) {
		var pages = { home: { file: "home.html", height: 420 }, services: { file: "services.html", height: 420 }, projects: { file: "projects.html", height: 420 }, portfolio: { file: "portfolio.html", height: 620 }, contact: { file: "contact.html", height: 620 } };
		var contentRequest = {};
		if (pages[parseUri(URL).anchor]) {
			contentRequest.page = pages[parseUri(URL).anchor].file;
			contentRequest.height = pages[parseUri(URL).anchor].height;
			$('#page-container').stop(true, true);
			$('#page-content').fadeOut('fast', function () {
				this.innerHtml = '';
				contentDiv = this;
				$.ajax({
					url: contentRequest.page,
					success: function (result) {
						urbanDev.currentpage = contentRequest.page;
						$(contentDiv).html(result);
						$('#page-container, #content-wrap').animate({height: contentRequest.height}, 500,
							function () { $(contentDiv).fadeIn('fast'); }
							);
					},
					error: function (request, status, error) {
						// TODO: Add error handling.
					}
				});
			});
		}
	}
};
$(document).ajaxStart(function () {
	// TODO: Show ajax loading message
}).ajaxStop(function () {
	// TODO: Hide ajax loading message
});

urbanDev.logo = {
	timer: null,
	initialize: function () {
		var udlogo = this;
		if (udlogo.timer) {
			clearInterval(udlogo.timer);
			udlogo.timer = null;
		}
		$('.home-urbandev-logo, .home-urbandev-logo-glow, .home-urbandev-logo .slogan').css('opacity', 0);
		$('.home-urbandev-logo').animate(
			{ opacity: 0.6 },
			500,
			function () {
				$('h2.home-slogan').stop(true, false);
				$('h2.home-slogan').animate({top: [375, 'swing'], opacity: 0.6}, 500, function () {
					$('.home-urbandev-logo-glow').animate({opacity: 0.2}, 150, function () {
						$(this).animate({opacity: 0.1}, 50).animate({opacity: 0.4}, 1000, function () {
							udlogo.timer = setInterval(udlogo.pulse, 6000);									
						});
					});
				});
			}
		);
	},
	pulse: function () {$('.home-urbandev-logo-glow').animate({opacity: 0.2}, 500).animate({opacity: 0.4}, 1000); }
};

$(window).bind('hashchange', function () {
	urbanDev.loadContent(window.location.href);
});

$('a.external-link').live('click', function (event) {
	window.open(this.href, '_blank');
	event.preventDefault();
});