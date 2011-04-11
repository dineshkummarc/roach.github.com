var urbanDev = {};

var loadContent = function(URL){
	var reqPage = parseUri(URL).file;
	var height = parseUri(URL).queryKey.height;
	if(reqPage !== urbanDev.page){
		$('#page-container').stop(true,true);
		$('#page-content').fadeOut('fast', function(){
			$(this).html('');
			console.log($(this).html())
			$('#page-container').animate({height: height}, 500,
				function(){
				$('#page-content').load(reqPage, function() {
					urbanDev.page = reqPage;
				});
				$('#page-content').fadeIn('fast');
			})
		})
	}
}

$('a.local-content').live('click', function(event){
	var requestedURI = $(this).attr('href');
	loadContent(requestedURI)
  event.preventDefault();
});

$('a.external-link').live('click', function(event){
	var requestedLink = $(this).attr('href');
	window.open(requestedLink,'_blank');
  event.preventDefault();
});

function parseUri(str){var o=parseUri.options,m=o.parser[o.strictMode?"strict":"loose"].exec(str),uri={},i=14;while(i--)uri[o.key[i]]=m[i]||"";uri[o.q.name]={};uri[o.key[12]].replace(o.q.parser,function($0,$1,$2){if($1)uri[o.q.name][$1]=$2;});return uri;};parseUri.options={strictMode:false,key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],q:{name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}};

// Google Analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-11593902-2']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
