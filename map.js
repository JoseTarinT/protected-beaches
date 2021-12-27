function initMap(){

    //Map options

    var options = {
        zoom: 11,
        center: { lat: -36.888011, lng: 149.906328},
    }

    //Add map
    map = new google.maps.Map(document.getElementById('map'), options);

    //Markers
    addMarker({lat: -36.89580145144116, lng: 149.92407974969328});
    addMarker({lat: -36.89748332145616, lng: 149.9156936453022});
    addMarker({lat: -36.89419938367968, lng: 149.9191310611633});
    addMarker({lat: -36.894294089341486, lng: 149.92911983711372});
    addMarker({lat: -36.882925182658525, lng: 149.93020514201342});
    addMarker({lat: -36.84653651384741, lng: 149.93601562425445});
    addMarker({lat: -36.834963715996906, lng: 149.93434232327687});
    addMarker({lat: -36.888605520579205, lng: 149.91944049471292});
    addMarker({lat: -36.940684015686486, lng: 149.90927307425812});
    addMarker({lat: -36.94483882261285, lng: 149.91355310744058});
    addMarker({lat: -36.95274733072922, lng: 149.90585565971867});
    addMarker({lat: -36.949504995781865, lng: 149.91024940778772});
    addMarker({lat: -36.94748630063176, lng: 149.92165784902573});

    function addMarker(coords){
        const marker = new google.maps.Marker({
            position: coords,
            map: map,
            icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
        });
    }    
}