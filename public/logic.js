var marker;
var map;

window.onload =  function() { 
    var options ={
        zoom:15
    }
    
    map = new google.maps.Map(document.getElementById("map"), options);
    marker = new google.maps.Marker({
        map,
        title: "Hello World!",
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillOpacity: 1,
            strokeWeight: 2,
            fillColor: '#5384ED',
            strokeColor: '#ffffff'
        }
    });
    if(navigator.geolocation) {
        navigator.geolocation.watchPosition(function(position) {
                var LatLng = { lat: position.coords.latitude, lng: position.coords.longitude }
                var user_location = new google.maps.LatLng(LatLng);
                map.setCenter(user_location);
                marker.setPosition(user_location);
                
                
            },
            function (error) {
            alert(error.message);
            }, {
            enableHighAccuracy: true
            , timeout: 5000
            });
        }
        else {
        document.getElementById('latitude').textContent = "FAIL";
    }
};

function startTour()
{
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer({map: map});
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            directionsService.route({
                origin: { lat: position.coords.latitude, lng: position.coords.longitude },
                destination: "Arkansas Union, 435 Garland Ave, Fayetteville, AR 72701, USA",
                travelMode: 'WALKING'
            }, function(response, status) {
                if (status === 'OK') {
                directionsDisplay.setDirections(response);
                } else {
                window.alert('Directions request failed due to ' + status);
                }
            })
            },
            
            function (error) {
            alert(error.message);
            }, {
            enableHighAccuracy: true
            , timeout: 5000
            });
        }
        else {
        document.getElementById('latitude').textContent = "FAIL";
    }
};    