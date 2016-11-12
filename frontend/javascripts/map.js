define([
    "async!https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&signed_in=true&callback=initMap"
], function(){
    console.log(1);
    function initMap() {
        var myLatLng = {lat: -25.363, lng: 131.044};

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: myLatLng
        });

        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: 'Hello World!'
        });
    }
});
