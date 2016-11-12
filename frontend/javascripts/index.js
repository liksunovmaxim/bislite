requirejs.config({
    baseUrl: './js',
});

define(["jquery", "domReady", "slick"], function ($) {
    "use strict";
    $('.main-banner').slick();
});


