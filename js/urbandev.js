var parseUri = function(str){var o=parseUri.options,m=o.parser[o.strictMode?"strict":"loose"].exec(str),uri={},i=14;while(i--)uri[o.key[i]]=m[i]||"";uri[o.q.name]={};uri[o.key[12]].replace(o.q.parser,function($0,$1,$2){if($1)uri[o.q.name][$1]=$2;});return uri;};parseUri.options={strictMode:false,key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],q:{name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}};

var urbanDev = {
	loadContent: function(URL){
		var contentRequest = {};
		contentRequest.page = parseUri(URL).file;
		contentRequest.height = parseUri(URL).queryKey.height;
		$('#page-container').stop(true,true);
		$('#page-content').fadeOut('fast', function(){
			this.innerHtml = '';
			$.ajax({
				url: contentRequest.page,
				success: function(result) {
					$('#page-content').html(result);
					urbanDev.page = contentRequest.page;
					$('#page-container, #content-wrap').animate({height: contentRequest.height},500,
						function(){$('#page-content').fadeIn('fast');}
					);
				},
		   error: function (request, status, error) {
		        // TODO: Add error handling.
		    }
			});
		});
	}
};
$(document).ajaxStart(function(){
	
}).ajaxStop(function(){

});

$('a.local-content').live('click', function(event){
	urbanDev.loadContent(this.href);
	event.preventDefault();
});

$('a.external-link').live('click', function(event){
	window.open(this.href,'_blank');
	event.preventDefault();
});