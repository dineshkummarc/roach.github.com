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

// End content slider