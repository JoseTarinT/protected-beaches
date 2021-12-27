let weather = {
    apiKey : "31a8e3335d93a108cfcf043524e70c08",
    fetchWeather: function () {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=Merimbula&units=metric&appid=31a8e3335d93a108cfcf043524e70c08"
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { main, description, icon } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed, deg } = data.wind;
        const directionWind = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];
        compassWind = directionWind[(data.wind.deg / 22.5).toFixed(0)];
        const windSpeedsection = document.querySelector(".windSpeed");
        const windSpe = document.querySelector(".windSpe");
        const windspeedspan = document.querySelector(".windspan");
        
        function mpsTOkmperh(speed) {
            return speed * (18/5)
        };
        
        const temperature = temp;
        floorTemp = Math.round(temperature)

        windSpe.innerHTML = "Wind Speed: " + speed;
        document.querySelector(".temperature").innerText = floorTemp + "°C";
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".infoWeather").innerText = main;
        document.querySelector(".description").innerText = description;
        document.querySelector(".windDir").innerText = "Wind Direction: " + compassWind;

        windSpeedsection.addEventListener('click', () => {
            if (windspeedspan.textContent === "m/s") {
                windSpe.textContent = "Wind Speed: " + Math.round(mpsTOkmperh(speed));
                windspeedspan.textContent = " Km/h";
                
            }
            else{
                windspeedspan.textContent = "m/s";
                windSpe.innerHTML = "Wind Speed: " + speed;
            }
        });

        document.querySelector(".humid").innerText = "Humidity: " + humidity + "%";

        const NNNWNNE = [" Spencer Park", " Bar Beach"]
        const NEENE = [" Bar Beach"]
        const EESE = ['<a target="_blank" href="https://www.mitchiesjetty.com/">Mitchies Jetty</a>', " Bar Mouth Beach", " Severs Beach"] 
        const SE = ['<a target="_blank" href="https://www.mitchiesjetty.com/">Mitchies Jetty</a>', " Short Point Beach", " Bar Mouth Beach", " Severs Beach"]
        const SSESSSW = ['<a target="_blank" href="https://www.mitchiesjetty.com/">Mitchies Jetty</a>', " Short Point Beach", " Pambula Beach", " Lions Park Beach", " Pambula Rivermouth", " Bar Mouth Beach", " Severs Beach"]
        const SW = [" Short Point Beach", " Pambula Beach"]
        const WSWWWNW = [" North Tura Beach", " Dolphin Cove", " Tura Beach", " Short Point Beach", " Spencer Park"," Middle Beach", " Bar Beach", " Main Beach", " Pambula Beach", " Lions Park Beach", " Pambula Rivermouth"]
        const NW = [" North Tura Beach", " Dolphin Cove", " Tura Beach", " Short Point Beach", " Spencer Park"," Middle Beach", " Bar Beach", " Main Beach", " Pambula Beach", " Lions Park Beach", " Pambula Rivermouth"]
        
        if (speed === 0 || speed < 3) {
            document.querySelector(".protected").innerHTML = "The wind is currently very light. You can enjoy any of the beaches.",
            document.querySelector(".beaches").innerHTML = "To see all the beaches in Merimbula, Pambula or Tura, " + '<a href="beaches.html">Click here</a>';
        }
        else if (compassWind == "N" || compassWind == "NNW" || compassWind == "NNE"){
            document.querySelector(".protected").innerHTML = "By the direction of the wind, the beaches that are more protected are:",
            document.querySelector(".beaches").innerHTML = NNNWNNE;
        }         
        else if (compassWind == "NE" || compassWind == "ENE" ) {
            document.querySelector(".protected").innerText = "By the direction of the wind, the beach that is most protected is:",
            document.querySelector(".beaches").innerHTML = NEENE;
        }        
        else if (compassWind == "E" || compassWind == "ESE" ) {
            document.querySelector(".protected").innerText = "By the direction of the wind, the beaches that are more protected are:",
            document.querySelector(".beaches").innerHTML = EESE;
        }        
        else if (compassWind == "SE" ) {
            document.querySelector(".protected").innerText = "By the direction of the wind, the beaches that are more protected are:",
            document.querySelector(".beaches").innerHTML = SE;
        }        
        else if (compassWind == "SSE" || compassWind == "S" || compassWind == "SSW" ) {
            document.querySelector(".protected").innerHTML = "By the direction of the wind, the beaches that are more protected are:",
            document.querySelector(".beaches").innerHTML = SSESSSW;
        }           
        else if (compassWind == "SW" ) {
            document.querySelector(".protected").innerText = "By the direction of the wind, the beaches that are more protected are:",
            document.querySelector(".beaches").innerHTML = SW;
        }          
        else if (compassWind == "WSW" || compassWind == "W" || compassWind == "WNW" ) {
            document.querySelector(".protected").innerText = "By the direction of the wind, the beaches that are more protected are:",
            document.querySelector(".beaches").innerHTML = WSWWWNW;
        }           
        else if (compassWind == "NW" ) {
            document.querySelector(".protected").innerText = "By the direction of the wind, the beaches that are more protected are:"
            document.querySelector(".beaches").innerHTML = NW;
        }
        document.querySelector(".weathercontainer").classList.remove("loading")
    },
};

weather.fetchWeather();

function initMap(){

    //Map options

    var options = {
        zoom: 11,
        center: { lat: -36.888011, lng: 149.906328},
    }

    //Add map
    map = new google.maps.Map(document.getElementById('map'), options);

    //Set the markers
    const icons = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"

    //Markers
    addMarker({
        coords: {lat: -36.89580145144116, lng: 149.92407974969328},
        iconImage: icons,
        content: '<h2>Bar Beach</h2>'});
    addMarker({
        coords: {lat: -36.89748332145616, lng: 149.9156936453022},
        iconImage: icons,
        content: '<h2>Main Beach<</h2>'});
    addMarker({
        coords: {lat: -36.89419938367968, lng: 149.9191310611633},
        iconImage: icons,
        content: '<h2>Mitchies Jetty</h2>'});
    addMarker({
        coords: {lat: -36.86078229680881, lng: 149.93474908095348},
        iconImage: icons,
        content: '<h2>Tura Beach</h2>'});
    addMarker({
        coords: {lat: -36.894294089341486, lng: 149.92911983711372},
        iconImage: icons,
        content: '<h2>Middle Beach</h2>'});
    addMarker({
        coords: {lat: -36.882925182658525, lng: 149.93020514201342},
        iconImage: icons,
        content: '<h2>Short Point Beach</h2>'});
    addMarker({
        coords: {lat: -36.84653651384741, lng: 149.93601562425445},
        iconImage: icons,
        content: '<h2>Dolphin Cove</h2>'});
    addMarker({
        coords: {lat: -36.834963715996906, lng: 149.93434232327687},
        iconImage: icons,
        content: '<h2>North Tura Beach</h2>'});
    addMarker({
        coords: {lat: -36.888605520579205, lng: 149.91944049471292},
        iconImage: icons,
        content: '<h2>Spencer Park</h2>'});
    addMarker({
        coords: {lat: -36.940684015686486, lng: 149.90927307425812},
        iconImage: icons,
        content: '<h2>Pambula Beach</h2>'});
    addMarker({
        coords: {lat: -36.94483882261285, lng: 149.91355310744058},
        iconImage: icons,
        content: '<h2>Lions Park Beach</h2>'});
    addMarker({
        coords: {lat: -36.949504995781865, lng: 149.91024940778772},
        iconImage: icons,
        content: '<h2>Pambula Rivermouth</h2>'});
    addMarker({
        coords: {lat: -36.95274733072922, lng: 149.90585565971867},
        iconImage: icons,
        content: '<h2>Bar Mouth Beach</h2>'});
    addMarker({
        coords: {lat: -36.94748630063176, lng: 149.92165784902573},
        iconImage: icons,
        content: '<h2>Severs Beach</h2>'});

    function addMarker(props){
        const marker = new google.maps.Marker({
            position: props.coords,
            map: map,
            icon: props.iconImage,
        });

        //Check content
        if(props.content){
            let infoWindow = new google.maps.InfoWindow({
                content: props.content
            });

            marker.addListener('click', function(){
                infoWindow.open(map, marker);
            });
        }
    }    
}