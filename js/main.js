"use strict";
jQuery(document).ready(function() {
	//menu
	if (jQuery().superfish) {
		jQuery('ul.sf-menu').superfish({
			delay:       700,
			animation:   {opacity:'show',height:'show'},
			//animation:   {opacity:'show'},
			animationOut: {opacity: 'hide'},
			speed:       'fast',
			disableHI:   false,
			cssArrows:   true,
			autoArrows:  true
		});
	}

	//toTop
	if (jQuery().UItoTop) {
        jQuery().UItoTop({ easingType: 'easeOutQuart' });
    }

    //horizontal accordion
 //    if (jQuery().elastislide) {
	//     jQuery('#horizontal_slider').elastislide({
	//         imageW : 370,
	//         border : 0,
	//         minItems : 1,
	//         margin : 15
	//     });
	// }

	//parallax
	if (jQuery().parallax) {
		jQuery('#land').parallax("50%", 0.1);
		jQuery('#progress').parallax("50%", 0.1);
		jQuery('#project').parallax("50%", 0.1);
		jQuery('#testimonials').parallax("50%", 0.1);
		jQuery('#tweets').parallax("50%", 0.1);
	}
	//parallax
	if (jQuery().funnyText) {
		$('.funnyText').funnyText({
			speed: 700,
			borderColor: 'transparent',
			activeColor: '#abce6c',
			color: '#fff',
			fontSize: '1.4em',
			direction: 'both'
		});
	}

    //prettyPhoto
    if (jQuery().prettyPhoto) {
	   	jQuery("a[rel^='prettyPhoto']").prettyPhoto({
			theme: 'facebook' /* light_rounded / dark_rounded / light_square / dark_square / facebook / pp_default*/
	  	});
	}

   	//carousel
   	if (jQuery().carousel) {
		jQuery('.carousel').carousel();
	}

	//single page localscroll and scrollspy
	var navHeight = jQuery('#header').outerHeight(true) + 80;
	jQuery('body').scrollspy({
		target: '.mainmenu_wrap',
		offset: navHeight
	});
	if (jQuery().localScroll) {
		jQuery('#mainmenu').localScroll({
			duration:1900,
			easing:'easeOutQuart',
			offset: -40
		});
	}

	//animated elements
	jQuery('.mainmenu_wrap').on('activate.bs.scrollspy', function () {
		var currentElementID = jQuery(this).find('li.active').last().find('a:first-child').attr('href');
		jQuery(currentElementID).find('h2.block-header').addClass('fadeIn');
	});


	//bx slider
	if (jQuery().bxSlider) {
		jQuery('.bxslider').bxSlider({
			auto: true,
			controls: true,
			pager: false,
		  	mode: 'fade',
		  	speed: 500,
		  	pause: 10000
		});
	}

	//timeline
	if (jQuery().timelinr) {
		if(jQuery('#timeline').length) {
			jQuery('#timeline').timelinr({
				orientation: 	'vertical',
				issuesSpeed: 	300,
				datesSpeed: 	100,
				arrowKeys: 		'true',
				startAt:		5
			});
		}
	}

	//owl caousel
	// set the images in owl carousel center vertically
	function setImgCenter () {
		var imageList = $(".project img");
		var maxHeight = 0;
		$.each(imageList, function(index, val) {
			var height = $(val).height();
			if (height > maxHeight) {
			 	maxHeight = height;
			}
		});

		$.each(imageList, function(index, val) {
			var height = $(val).height();
			if (height < maxHeight) {
				var diff = (maxHeight - height)/2;
				$(val).css('margin-top', diff);
			}
		});
	}

	if (jQuery().owlCarousel) {
	    jQuery("#partners .owl-carousel").owlCarousel({
	    	navigation : true,
	    	navigationText : false,
	    	pagination : false,
	    	autoPlay : true
	    });

	    jQuery("#feedback .owl-carousel").owlCarousel({
	    	navigation : true,
	    	navigationText : false,
	    	pagination : false,
	    	autoPlay : true,
	    	itemsCustom : [[0, 1]]
	    });

	    jQuery("#projects .owl-carousel").owlCarousel({
	    	navigation : true,
	    	navigationText : false,
	    	pagination : false,
	    	itemsCustom : [[0, 2], [400, 1], [800, 2], 
	    					[1200, 3], [1600, 4], [2000, 5]],
	    	afterInit: setImgCenter
	    });

	    jQuery(".team").owlCarousel({
			navigation : true, // Show next and prev buttons
			slideSpeed : 300,
	    	navigationText : false,
			paginationSpeed : 400,
			pagination: false,
			singleItem:true
		});
	}
    //nice scroll
	if (jQuery().niceScroll) {
    	// jQuery("html").niceScroll({
    	// 	cursorcolor: '#abce6c',
    	// 	cursorborder: 'none',
    	// 	cursorborderradius: '2px',
    	// 	cursorwidth: '7px'

    	// });
	}

	//portfolio and horizontal slider animation
	jQuery('.portfolio_item_image > div').css({opacity: 0});
	jQuery('.isotope-item, .horizontal_slider_introimg').hover(
	 	function() {
			jQuery( this ).find('.portfolio_item_image > div').stop().animate({ opacity: 1}, 500, 'easeOutExpo').find('.p-view').toggleClass('moveFromLeft').end().find('.p-link').toggleClass('moveFromRight').end().closest('li').find('.item_title').stop().animate({ opacity: 1}, 500, 'easeOutExpo').delay(200).toggleClass('moveFromBottom');
		}, function() {
			jQuery( this ).find('.portfolio_item_image > div').stop().animate({ opacity: 0}, 300, 'easeOutExpo').find('.p-view').toggleClass('moveFromLeft').end().find('.p-link').toggleClass('moveFromRight').end().closest('li').find('.item_title').stop().animate({ opacity: 0}, 300, 'easeOutExpo').toggleClass('moveFromBottom');;
		}
	);

	//teaser style5 animation
	jQuery('.single_teaser.icons.style5').hover(
	 	function() {
			jQuery( this ).find('i').addClass('moveFromLeft').end().find('h3').addClass('moveFromRight').end().find('p').addClass('moveFromBottom');
		}, function() {
			jQuery( this ).find('i').removeClass('moveFromLeft').end().find('h3').removeClass('moveFromRight').end().find('p').removeClass('moveFromBottom');
		}
	);

	//team thumbnail animation
	// jQuery('.thumbnail').hover(
	//  	function() {
	// 		jQuery( this ).find('.team-social').stop().animate({ opacity: 1}, 600, 'easeOutExpo');
	// 	}, function() {
	// 		jQuery( this ).find('.team-social').stop().animate({ opacity: 0}, 500, 'easeOutExpo');
	// 	}
	// );

   jQuery(".process-container .process-item").hover(function(){
        var numItem = jQuery(this).attr("data-show");
        jQuery(".process_description_wrap>div").hide();
        jQuery(".process_description_" + numItem).stop().show();
   });

	//flickr
	if (jQuery().jflickrfeed) {
		jQuery("#flickr").jflickrfeed({
			flickrbase: "http://api.flickr.com/services/feeds/",
			limit: 6,
			qstrings: {
				id: "36621592@N06"
			},
			itemTemplate: '<a href="{{image_b}}" rel="prettyPhoto[pp_gal]"><li><img alt="{{title}}" src="{{image_s}}" /></li></a>'
		}, function(data) {
			jQuery("#flickr a").prettyPhoto({
				theme: 'facebook'
	   		});
	   		jQuery("#flickr li").hover(function () {						 
			   jQuery(this).find("img").stop().animate({ opacity: 0.5 }, 200);
		    }, function() {
			   jQuery(this).find("img").stop().animate({ opacity: 1.0 }, 400);
		    });
		});
	}

	//twitter
		//slide tweets
	jQuery('.twitter').bind('loaded', function(){
		jQuery(this).addClass('flexslider').find('ul').addClass('slides');
	});
	if (jQuery().jflickrfeed) {
		jQuery('.twitter').tweet({
			modpath: "./twitter/",
		    count: 3,
		    avatar_size: 48,
		    loading_text: 'loading twitter feed...',
		    join_text: 'auto',
		    username: 'ThemeForest', 
		    template: "{avatar}{time}{join}<span class=\"tweet_text\">{tweet_text}</span>"
		});
	}

	
	jQuery('#featuresContainer').isotope({
	  // options
	  itemSelector : '.block'
	  //layoutMode : 'fitColumns'
	});




});

jQuery(window).load(function(){
	//stick header to top
	if (jQuery().sticky) {
	    jQuery("#header").sticky({ 
	    		topSpacing: 0,
	    		scrollBeforeStick: 55
	    	},
	    	function(){ 
	    		jQuery("#header").stop().animate({opacity:0}, 0).delay(200).stop().animate({opacity:1}, 500);
	    	},
	       	function(){ 
	    		jQuery("#header").stop().animate({opacity:0}, 0).delay(200).stop().animate({opacity:1}, 500);
	    	}
	    );
	}
	

	jQuery("#mainslider > div").flexslider({
		animation: "fade",
		//useCSS: false,
		controlNav: true,   
		//animationLoop: false,
		smoothHeight: true,
		slideshowSpeed:7000,
		animationSpeed:800
	});
	jQuery(".flexslider").flexslider({
		animation: "fade",
		useCSS: false,
		controlNav: false,   
		//animationLoop: false,
		smoothHeight: true,
		slideshowSpeed:5000,
		animationSpeed:800
	});

	jQuery(".slides").find("li").each(function(){
		var h = jQuery(this).height();
		var childH = jQuery(this).find(".leftcontent_wrap").actual("height");
		var childRH = jQuery(this).find(".rightcontent_wrap").actual("height");
		var childD = jQuery(this).find(".slide_description").actual("height");
		var padding = (h / 2) - (childH / 2);
		var paddingR = (h / 2) - (childRH / 2);
		var topD = ((h / 2) - ((childD / 2) ));
		jQuery(this).find(".leftcontent_wrap").css("padding-top" , padding);
		jQuery(this).find(".rightcontent_wrap").css("padding-top" , paddingR);
		jQuery(this).find(".slide_description").css("top" , topD);
	});

	jQuery(".flexslider").hover(
		function(){
			jQuery(this).find(".flex-direction-nav a").animate({opacity : 1});
		},
		function(){
			jQuery(this).find(".flex-direction-nav a").animate({opacity : 0});
		}
	);

	jQuery('body').delay(1000).scrollspy('refresh');


	//preloader
	jQuery(".preloaderimg").fadeOut();
	jQuery(".preloader").delay(200).fadeOut("slow").delay(200, function(){
		jQuery(this).remove();
	});

});

jQuery(window).resize(function(){
	jQuery("#header").sticky('update');
	jQuery('body').scrollspy('refresh');

	jQuery(".slides").find("li").each(function(){
		var h = jQuery(this).height();
		var childH = jQuery(this).find(".leftcontent_wrap").actual("height");
		var childRH = jQuery(this).find(".rightcontent_wrap").actual("height");
		var childD = jQuery(this).find(".slide_description").actual("height");
		var padding = (h / 2) - (childH / 2);
		var paddingR = (h / 2) - (childRH / 2);
		var topD = ((h / 2) - ((childD / 2) ));
		jQuery(this).find(".leftcontent_wrap").css("padding-top" , padding);
		jQuery(this).find(".rightcontent_wrap").css("padding-top" , paddingR);
		jQuery(this).find(".slide_description").css("top" , topD);
	});

});

jQuery(window).scroll(function() {

	//circle progress bar
	if (jQuery().easyPieChart) {
		jQuery('.chart').each(function(){
				
			var imagePos = jQuery(this).offset().top;
			var topOfWindow = jQuery(window).scrollTop();
			if (imagePos < topOfWindow+600) {

				jQuery(this).easyPieChart({
			        barColor: '#ABCE6C',
					trackColor: '#f1f1f1',
					scaleColor: false,
					scaleLength: false,
					lineCap: 'butt',
					lineWidth: 7,
					size: 180,
					rotate: 0,
					animate: 2000,
					onStep: function(from, to, percent) {
							jQuery(this.el).find('.percent').text(Math.round(percent));
						}
			    });
			}
		});
	}

});