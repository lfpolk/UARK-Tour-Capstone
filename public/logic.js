
window.onload =  function() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var options ={
                zoom:23
            }
        
            const map = new google.maps.Map(document.getElementById("map"), options);
            user_location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(user_location);
            new google.maps.Marker({
            position: user_location,
            map,
            title: "Hello World!",
        });       
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

    