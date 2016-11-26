requirejs.config({
    baseUrl: './js',
});

define(["jquery", "domReady", "slick", 'select2'], function ($) {
    "use strict";
    $('.main-banner').slick();
    $('#select-probe').select2({
        placeholder: 'Выберите пробу',
        minimumResultsForSearch: Infinity
    });
    $('.has-children').on('mouseenter', function(){
        $(this).find('.submenu').stop().slideDown('fast').addClass('active');
    });
    $('.has-children').on('mouseleave', function(){
        $(this).find('.submenu').stop().slideUp('fast').removeClass('active');
    });
    
});


