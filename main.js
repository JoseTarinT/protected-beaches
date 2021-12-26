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