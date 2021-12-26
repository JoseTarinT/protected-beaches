function initMap(){

    //Map options

    var options = {
        zoom: 11,
        center: { lat: -36.888011, lng: 149.906328},
    }

    //Add map
    map = new google.maps.Map(document.getElementById('map'), options);

    //Markers

    const marker = new google.maps.Marker({
        position: {lat: -36.89580145144116,lng: 149.92407974969328},
        map: map
    });
}