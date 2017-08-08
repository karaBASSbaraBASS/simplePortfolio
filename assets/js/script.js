$(document).ready(function() {
    
        $('.navbar-toggler').click(function(e) {
            e.preventDefault();
            
            $(this).toggleClass('convert');
      });

    $(document).ready(function(){
	  $('.slider1').bxSlider({
	    slideWidth: 400,
	    minSlides: 1,
	    maxSlides: 3,
	    moveSlides: 1,
	    slideMargin: 10
	  });
	});
  
});