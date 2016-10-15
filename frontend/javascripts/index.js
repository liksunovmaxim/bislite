$(window).on('load', function(){
   $('.has-children').on('mouseenter' , function(){
     $(this).find('.submenu').stop().slideDown('fast');
   });
    $('.has-children').on('mouseleave' , function(){
        $(this).find('.submenu').stop().slideUp('fast');
    });
});