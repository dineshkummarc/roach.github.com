var parseUri = function (str) {var o = parseUri.options, m = o.parser[o.strictMode ? "strict" : "loose"].exec(str), uri = {}, i = 14; while (i--) {uri[o.key[i]] = m[i] || ""; } uri[o.q.name] = {}; uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {if ($1) {uri[o.q.name][$1] = $2; } }); return uri; }; parseUri.options = {strictMode: false, key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"], q: {name: "queryKey", parser: /(?:^|&)([^&=]*)=?([^&]*)/g}, parser: {strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/, loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}};

/*
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
*/
(function($,e,b){var c="hashchange",h=document,f,g=$.event.special,i=h.documentMode,d="on"+c in e&&(i===b||i>7);function a(j){j=j||location.href;return"#"+j.replace(/^[^#]*#?(.*)$/,"$1")}$.fn[c]=function(j){return j?this.bind(c,j):this.trigger(c)};$.fn[c].delay=50;g[c]=$.extend(g[c],{setup:function(){if(d){return false}$(f.start)},teardown:function(){if(d){return false}$(f.stop)}});f=(function(){var j={},p,m=a(),k=function(q){return q},l=k,o=k;j.start=function(){p||n()};j.stop=function(){p&&clearTimeout(p);p=b};function n(){var r=a(),q=o(m);if(r!==m){l(m=r,q);$(e).trigger(c)}else{if(q!==m){location.href=location.href.replace(/#.*/,"")+q}}p=setTimeout(n,$.fn[c].delay)}$.browser.msie&&!d&&(function(){var q,r;j.start=function(){if(!q){r=$.fn[c].src;r=r&&r+a();q=$('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){r||l(a());n()}).attr("src",r||"javascript:0").insertAfter("body")[0].contentWindow;h.onpropertychange=function(){try{if(event.propertyName==="title"){q.document.title=h.title}}catch(s){}}}};j.stop=k;o=function(){return a(q.location.href)};l=function(v,s){var u=q.document,t=$.fn[c].domain;if(v!==s){u.title=h.title;u.open();t&&u.write('<script>document.domain="'+t+'"<\/script>');u.close();q.location.hash=v}}})();return j})()})(jQuery,this);

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

$(window).hashchange( function(){
	//TODO: utilize a better URI construction method.
	if(!parseUri(window.location.href).anchor){
		urbanDev.loadContent(window.location.href+"#home");
	}else{
		urbanDev.loadContent(window.location.href);
	}
});

$('a.external-link').live('click', function (event) {
	window.open(this.href, '_blank');
	event.preventDefault();
});

$('a.mail-link').live('click', function (event) {
	// TODO: Improve this method, it's ugly.
	var mailTo = $(this).attr('href');
	mailTo = mailTo.replace("[email]","mailto:");
	mailTo = mailTo.replace("[at]","@");
	mailTo = mailTo.replace("[dot]",".");
	window.location.href = mailTo;
	event.preventDefault();
});