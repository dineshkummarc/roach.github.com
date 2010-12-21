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
    $('#urbandev-logo .slogan').animate({top: [275, 'swing'], opacity: 0.7}, 500, function(){
	    $('#urbandev-logo-glow').animate({opacity: 0.6},250).animate({opacity: 0.4},1000);
	    $('ul#menu').animate({top: -12},750);	
      // var t=setInterval("logoPulse();",8000);
    });
  }
);      

function logoPulse(){$('#urbandev-logo-glow').animate({opacity: 0.6},1500).animate({opacity: 0.4},4000);};

// End animation functions

// Content slider

// End content slider