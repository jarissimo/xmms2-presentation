/*
 * this file is stolen from Pik5 by Peter Kröner, but was heavily adapted for my presentation.
 * http://pik5.peterkroener.de/
 */

var PIK5 = {
	slides:   null,
    animations: {},
	current:  0,
};

jQuery(document).ready(function($){

    var frame = $('#frame');
    var framecontainer = $('#framecontainer');
    var slidesize;

    // Setup frame and framecontainer css
    PIK5.slides = $('.pik5-slide');
    frame.css('overflow', 'hidden');
    framecontainer.css('width', 100 * PIK5.slides.length + '%');

    // Slide to the slide index
    PIK5.slideTo = function(index){
	    // Jump to index
	    index = parseInt(index);
	    if(PIK5.slides[index]){

		    framecontainer.css('left', index * slidesize * -1);
		    PIK5.current = index;
			// Trigger deactivate so animated slides can clean up their layout now
		    $(PIK5.slides[PIK5.current]).trigger('deactivate');
			// for fade-in animations or things like that
			$(PIK5.slides[index]).trigger('activate');
	    }
    };

    // Go to the next slide
    PIK5.slideNext = function(){
		// If there are animations, execute them now
        if(PIK5.animations[PIK5.slides[PIK5.current].id]) {
            var animations = PIK5.animations[PIK5.slides[PIK5.current].id];
			if(animations.length > 0) {
				var animfunc = animations.pop();
				animfunc();
            } else
                PIK5.slideTo(PIK5.current + 1);
        } else
    	    PIK5.slideTo(PIK5.current + 1);
    };

    // Go to the previous slide
    PIK5.slideBack = function(){
	    PIK5.slideTo(PIK5.current - 1);
    };

    // Absolute center function
    var positionCenter = function(){
	    var supercenter = $('.pik5-center');
	    var slideH = $('.pik5-slide').height();
	    var slideW = $('.pik5-slide').width();
	    supercenter.each(function(index, el){
		    el = $(el);
		    var elH = el.outerHeight(true);
		    var elW = el.outerWidth(true);
		    el.css({
			    position: 'relative',
			    top: (slideH - elH) / 2 + 'px',
			    left:  (slideW - elW) / 2 + 'px'
		    });
	    });
    };

    // Setup font and slide size
    var setFontFrameSize = function(){
	    var frameratio = (frame.height() + frame.width()) / 1000;
	    $('body').css('font-size', frameratio + 'em');
	    slidesize = framecontainer.width() / PIK5.slides.length;
	    PIK5.slides.css('width', slidesize + 'px');
	    PIK5.slideTo(PIK5.current);
    };

    // Resize and reposition on load and on resize
    $(window).bind('resize', function(){
	    setFontFrameSize();
	    positionCenter();
    });

    // Run init function
    $(window).bind('load', function(){
	    setFontFrameSize();
	    positionCenter();
    });

    // Catch keypress events
	$(document).keydown(function(evt){
		var code = evt.keyCode;
		if(code == 39 || code == 34){
            PIK5.slideNext();
		}
		else if(code == 37 || code == 33){
            PIK5.slideBack();
		}
		/*else if(code == 116 || code == 190 || code == 27){
			$(this).trigger('hide');
			evt.preventDefault();
		}*/
	});
});
