var logoTop = ($(window).height() - $('#header-logo').height()) / 2+$(window).scrollTop();
var logoLeft = ($(window).width() - $('#header-logo').width()) / 2+$(window).scrollLeft();

$('#header-logo').css('left', logoLeft);
$('#header-logo, #header-logo-glow, #header-logo .slogan').css('opacity', 0); //IE sucks

$('#header-logo').animate(
  {
  opacity: 0.2,
  top: [0, 'swing']
  },
  1500
  ).animate(
    {
      opacity: 0.65
    },
    1000,
    function(){
      $('#header-logo .slogan').animate({bottom: 20, opacity: 0.7}, 500, function(){
	    $('#header-logo-glow').animate({opacity: 0.5},50).animate({opacity: 0.2},1000);
        var t=setInterval("logoPulse();",11000);
      });
    }
  );
      
  function logoPulse(){
    $('#header-logo-glow').animate({opacity: 0.5},2000).animate({opacity: 0.2},4000);
  };