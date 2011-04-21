var parseUri = function (str) {var o = parseUri.options, m = o.parser[o.strictMode ? "strict" : "loose"].exec(str), uri = {}, i = 14; while (i--) {uri[o.key[i]] = m[i] || ""; } uri[o.q.name] = {}; uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {if ($1) {uri[o.q.name][$1] = $2; } }); return uri; }; parseUri.options = {strictMode: false, key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"], q: {name: "queryKey", parser: /(?:^|&)([^&=]*)=?([^&]*)/g}, parser: {strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/, loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}};

var urbanDev = {
	loadContent: function (URL) {
		var contentRequest = {};
		contentRequest.page = parseUri(URL).file;
		contentRequest.height = parseUri(URL).queryKey.height;
		$('#page-container').stop(true, true);
		$('#page-content').fadeOut('fast', function () {
			this.innerHtml = '';
			contentDiv = this;
			$.ajax({
				url: contentRequest.page,
				success: function (result) {
					urbanDev.currentpage = contentRequest.page;
					$(contentDiv).html(result);
					console.log(contentDiv.innerHtml);
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
};
$(document).ajaxStart(function () {
	// TODO: Show ajax loading message
}).ajaxStop(function () {
	// TODO: Hide ajax loading message
});

urbanDev.logo = {
	timer: null,
	init: function () {
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

$('a.local-content').live('click', function (event) {
	urbanDev.loadContent(this.href);
	event.preventDefault();
});

$('a.external-link').live('click', function (event) {
	window.open(this.href, '_blank');
	event.preventDefault();
});