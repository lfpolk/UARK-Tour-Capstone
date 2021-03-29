
window.onload =  function() {
        var options ={
            zoom:23
        }
        
        const map = new google.maps.Map(document.getElementById("map"), options);
        const marker = new google.maps.Marker({
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
            
                user_location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
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


function initMap() {
    
    new google.maps.Marker({
        position: myLatLng,
        map,
        title: "Hello World!",
    });
}

    