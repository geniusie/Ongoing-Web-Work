"use strict";
function toggleMobileMenu() {
    var menuIcon = jQuery('.main-menu-icon');
    jQuery(menuIcon).toggleClass('menu-opened');
    if(jQuery(menuIcon).hasClass('menu-opened')) {
        jQuery('#mainmenu').show(350);
    } else {
        jQuery('#mainmenu').hide(400);
    }
}

function frontPageImages() {
    var $frontImageWrapper = jQuery('.front-image-wrapper');
    $frontImageWrapper.find('img').css({opacity: 0});
    var frontImateWrapperHeight = jQuery('.front-image-wrapper').find('img.front-image-active').height();
    $frontImageWrapper.height(frontImateWrapperHeight).find('img.front-image-active').css({opacity: 1});

    jQuery('.front-image-indicators').on('click', 'li', function() {
        var $this = jQuery(this);
        if ($this.hasClass('active')) { 
            return;
        };
        $this.parent().find('li.active').removeClass('active');
        var liClass = $this.attr('class');
        $this.addClass('active');
        $frontImageWrapper.find('img.front-image-active').stop().animate({opacity: 0}, 400).removeClass('front-image-active');
        jQuery('.front-image-wrapper').find('img.'+liClass).animate({opacity : 1}, 800).addClass('front-image-active');
    });
}

function loadGalleryItemHtml( url, itemNumber ) {
    var $galleryContainer = jQuery('#gallery_container');
    jQuery.ajax({
        url: url,
        success: function(galleryItemHtml) {
            $galleryContainer.html(galleryItemHtml).attr('data-item-number', itemNumber);
            $galleryContainer.stop().animate({top: 0}, 1000, 'easeOutExpo');
        },
        statusCode: {
            404: function() {
                alert( "Gallery Item Page not Found" );
            }
        }
    });
}
jQuery(document).ready(function() {

    // 2/3/4th level menu  offscreen fix
    var MainWindowWidth = jQuery(window).width();
    jQuery(window).resize(function(){
        MainWindowWidth = jQuery(window).width();
    });        
    jQuery('.sf-menu ul li').mouseover(function(){
        // checks if third level menu exist         
        var subMenuExist = jQuery(this).find('.nav-child').length;            
        if( subMenuExist > 0){
            var subMenuWidth = jQuery(this).find('.nav-child').width();
            var subMenuOffset = jQuery(this).find('.nav-child').parent().offset().left + subMenuWidth;
            // if sub menu is off screen, give new position
            if((subMenuOffset + subMenuWidth) > MainWindowWidth){                  
                var newSubMenuPosition = subMenuWidth + 3;
                $(this).find('.nav-child').first().css({
                    left: -newSubMenuPosition,
                    //top: '10px',
                });
            }
        }
    });

    //mobile menu
    jQuery('.main-menu-icon').on('click', toggleMobileMenu);
    jQuery('#mainmenu a').on('click', toggleMobileMenu);

    //contact form processing
    jQuery('form.contact-form').on('submit', function( e ){
        e.preventDefault();

        var form = jQuery(this);
        var formData = new FormData($('form')[0]);
        console.log(formData)
        
        jQuery(form).find('p.contact-form-respond').remove();

        var request = $.ajax({
            url: 'contact-form.php',  //Server script to process data
            type: 'POST',
            // Form data
            data: formData,
            //Options to tell jQuery not to process data or worry about content-type.
            cache: false,
            contentType: false,
            processData: false
        });

        request.done(function( msg ) {
            jQuery(form).find('[type="submit"]').attr('disabled', false).parent().prepend('<p class="contact-form-respond highlight">'+msg+'</p>')
        });
         
        request.fail(function( jqXHR, textStatus ) {
            jQuery(form).find('[type="submit"]').attr('disabled', false).parent().prepend('<p class="contact-form-respond highlight">Mail cannot be sent.</p>')
            console.log(jqXHR, textStatus)
        });
    });


    //gallery single item
    var $galleryContainer = jQuery('#gallery_container');
    var $portfolioItems = jQuery('#portfolioContainer li');
    $galleryContainer.attr('data-items-num', $portfolioItems.length);
    jQuery.each($portfolioItems, function(i, val){
        jQuery(this).find('a.p-link').attr('data-count', i+1);
    });
    $galleryContainer.on('click', 'a#portfolio_close_project', function( e ){
        e.preventDefault();
        jQuery('#gallery_container').stop().animate({top: '-100%'}, 800, 'easeOutExpo', function(){
            jQuery(this).html('').css({'display': 'none'});
        });
    }).on('click', 'a#portfolio_prev_project', function( e ){
        e.preventDefault();
        var $galleryContainer = jQuery('#gallery_container');
        var itemNumber = $galleryContainer.attr('data-item-number');
        var itemsNum = $galleryContainer.attr('data-items-num');
        if (itemNumber == 1) {
            var prevItemNumber = itemsNum;
        } else {
            var prevItemNumber = itemNumber -1;
        }
        var url = 'gallery-single' + prevItemNumber + '.html';
        $galleryContainer.find('section').stop().animate({opacity: 0}, 300, function(){
            $galleryContainer.html('');
            loadGalleryItemHtml( url, prevItemNumber );
        });
        
    }).on('click', 'a#portfolio_next_project', function( e ){
        e.preventDefault();
        var $galleryContainer = jQuery('#gallery_container');
        var itemNumber = $galleryContainer.attr('data-item-number');
        var itemsNum = $galleryContainer.attr('data-items-num');
        if (itemNumber == itemsNum) {
            var nextItemNumber = 1;
        } else {
            var nextItemNumber = parseInt(itemNumber) + 1;
        }
        var url = 'gallery-single' + nextItemNumber + '.html';
        $galleryContainer.find('section').stop().animate({opacity: 0}, 300, function(){
            $galleryContainer.html('');
            loadGalleryItemHtml( url, nextItemNumber );
        });
    });

    jQuery('#portfolio a.p-link, #portfolio h4 a').on('click', function( e ) {
        e.preventDefault();
        jQuery('#gallery_container').css({'display':'block'});
        //var $galleryContainer = jQuery('#gallery_container');
        // update user interface
        var url = jQuery(this).attr('href');
        if (jQuery(this).hasClass('p-link')) {
            var itemNumber = jQuery(this).attr('data-count');
        } else {
            var itemNumber = jQuery(this).closest('li').find('a.p-link').attr('data-count');
        }

        // Prepare query string and send AJAX request
        loadGalleryItemHtml( url, itemNumber );
    });

    //mailchimp subscribe form processing
    jQuery('#signup').on('submit', function( e ) {
        e.preventDefault();
        // update user interface
        jQuery('#response').html('Adding email address...');
        
        // Prepare query string and send AJAX request
        jQuery.ajax({
            url: 'mailchimp/store-address.php',
            data: 'ajax=true&email=' + escape(jQuery('#mailchimp_email').val()),
            success: function(msg) {
                jQuery('#response').html(msg);
            }
        });
    });


    //front page images
    frontPageImages();
});

    //gallery
    (function($){ 
        $(window).resize(function(){
            var $windowWidth = $(window).width();
        });
       //$(window).load(function(){


        var $container = $('#portfolioContainer');

        $container.imagesLoaded( function(){
            $container.isotope({
                layoutMode : 'fitRows',
                animationEngine: 'best-available',
                animationOptions: {
                  queue: false,
                  duration: 800
                },
                onLayout: function() {
                    jQuery('body').scrollspy('refresh');  
                }
            });
        });

            // filter items when filter link is clicked
            $('#filtrable a').on('click', function(e){
                var selector = $(this).attr('data-filter');
                $container.isotope({ filter: selector, layoutMode : 'fitRows' });
                // return false;
                e.preventDefault();
            });

            var $optionSets = $('#filtrable li'),
                $optionLinks = $optionSets.find('a');

                $optionLinks.on('click', function(e){
                    var $this = $(this);
                    // don't proceed if already selected
                    if ( $this.hasClass('selected') ) {
                      // return false;
                      e.preventDefault();
                    }
                    var $optionSet = $this.parents('#filtrable');
                    $optionSet.find('.selected').removeClass('selected');
                    $this.addClass('selected');
              
                    // make option object dynamically, i.e. { filter: '.my-filter-class' }
                    var options = {},
                        key = $optionSet.attr('data-option-key'),
                        value = $this.attr('data-option-value');
                    // parse 'false' as false boolean
                    value = value === 'false' ? false : value;
                    options[ key ] = value;
                    if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
                      // changes in layout modes need extra logic
                      changeLayoutMode( $this, options )
                    } else {
                      // otherwise, apply new options
                      $container.isotope( options );
                    }
                    
                    // return false;
                    e.preventDefault();
                });
        //});
    })(jQuery);

jQuery(window).load(function(){

});


jQuery(window).resize(function(){
    //front page images
    frontPageImages(); 
});