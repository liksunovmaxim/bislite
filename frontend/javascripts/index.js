requirejs.config({
    baseUrl: './public/js'
});

define(["jquery", "domReady", "slick"], function ($) {
    "use strict";

    var Page = {

        init: function () {
            this.navigation();
        },
        navigation: function () {
            var navLink = $('.has-children');

            navLink.on('mouseenter', function () {
                $(this).find('.submenu').stop().slideDown('fast');
            });
            navLink.on('mouseleave', function () {
                $(this).find('.submenu').stop().slideUp('fast');
            });
        }
    };

    var Homepage = {
        init: function () {
            this.carousel();
        },
        carousel: function () {
            $('.main-banner').slick({
                dots: true
            });
        }
    };

    Page.init();
    Homepage.init();
    

});


