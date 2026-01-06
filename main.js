// Declare the map variable globally
let map;

// Define the initMap function globally
function initMap() {
  console.log("Initializing map...");
  const options = {
    zoom: 11,
    center: { lat: -36.888011, lng: 149.906328 },
    mapId: "DEMO_MAP_ID",
  };

  // Initialize the map
  map = new google.maps.Map(document.getElementById("map"), options);
}

// Attach initMap to the global window object
window.initMap = initMap;

(function () {
  let weather = {
    fetchWeather: function () {
      fetch("web-production-c94c2.up.railway.app/" || "http://localhost:3080/")
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { main, description, icon } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed, deg } = data.wind;
      const directionWind = [
        "N",
        "NNE",
        "NE",
        "ENE",
        "E",
        "ESE",
        "SE",
        "SSE",
        "S",
        "SSW",
        "SW",
        "WSW",
        "W",
        "NW",
        "NNW",
        "WNW",
        "N",
      ];
      const compassWind = directionWind[(data.wind.deg / 22.5).toFixed(0)];
      const windSpeedsection = document.querySelector(".windSpeed");
      const windSpe = document.querySelector(".windSpe");
      const windspeedspan = document.querySelector(".windspan");

      function mpsTOkmperh(speed) {
        return speed * (18 / 5);
      }

      const temperature = temp;
      const floorTemp = Math.round(temperature);

      windSpe.innerHTML = "Wind Speed: " + speed;
      document.querySelector(".temperature").innerText = floorTemp + "°C";
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      document.querySelector(".infoWeather").innerText = main;
      document.querySelector(".description").innerText = description;
      document.querySelector(".windDir").innerText =
        "Wind Direction: " + compassWind;

      windSpeedsection.addEventListener("click", () => {
        if (windspeedspan.textContent === "m/s") {
          windSpe.textContent = "Wind Speed: " + Math.round(mpsTOkmperh(speed));
          windspeedspan.textContent = " Km/h";
        } else {
          windspeedspan.textContent = "m/s";
          windSpe.innerHTML = "Wind Speed: " + speed;
        }
      });

      document.querySelector(".humid").innerText =
        "Humidity: " + humidity + "%";

      const NNNWNNE = [" Spencer Park", " Bar Beach"];
      const NEENE = [" Bar Beach"];
      const EESE = [
        '<a target="_blank" href="https://www.mitchiesjetty.com/">Mitchies Jetty</a>',
        " Bar Mouth Beach",
        " Severs Beach",
      ];
      const SE = [
        '<a target="_blank" href="https://www.mitchiesjetty.com/">Mitchies Jetty</a>',
        " Short Point Beach",
        " Bar Mouth Beach",
        " Severs Beach",
      ];
      const SSESSSW = [
        '<a target="_blank" href="https://www.mitchiesjetty.com/">Mitchies Jetty</a>',
        " Short Point Beach",
        " Pambula Beach",
        " Lions Park Beach",
        " Pambula Rivermouth",
        " Bar Mouth Beach",
        " Severs Beach",
      ];
      const SW = [" Short Point Beach", " Pambula Beach"];
      const WSWWWNW = [
        " North Tura Beach",
        " Dolphin Cove",
        " Tura Beach",
        " Short Point Beach",
        " Spencer Park",
        " Middle Beach",
        " Bar Beach",
        " Main Beach",
        " Pambula Beach",
        " Lions Park Beach",
        " Pambula Rivermouth",
      ];
      const NW = [
        " North Tura Beach",
        " Dolphin Cove",
        " Tura Beach",
        " Short Point Beach",
        " Spencer Park",
        " Middle Beach",
        " Bar Beach",
        " Main Beach",
        " Pambula Beach",
        " Lions Park Beach",
        " Pambula Rivermouth",
      ];

      let protectedBeaches =
        "By the direction of the wind, the beaches that are more protected are:";

      if (speed === 0 || speed < 3) {
        (document.querySelector(".protected").innerHTML =
          "The wind is currently very light. You can enjoy any of the beaches."),
          (document.querySelector(".beaches").innerHTML =
            "To see all the beaches in Merimbula, Pambula or Tura, " +
            '<a href="beaches.html">Click here</a>');
      } else if (
        compassWind == "N" ||
        compassWind == "NNW" ||
        compassWind == "NNE"
      ) {
        (document.querySelector(".protected").innerHTML = protectedBeaches),
          (document.querySelector(".beaches").innerHTML = NNNWNNE);
      } else if (compassWind == "NE" || compassWind == "ENE") {
        (document.querySelector(".protected").innerText =
          "By the direction of the wind, the beach that is most protected is:"),
          (document.querySelector(".beaches").innerHTML = NEENE);
      } else if (compassWind == "E" || compassWind == "ESE") {
        (document.querySelector(".protected").innerText = protectedBeaches),
          (document.querySelector(".beaches").innerHTML = EESE);
      } else if (compassWind == "SE") {
        (document.querySelector(".protected").innerText = protectedBeaches),
          (document.querySelector(".beaches").innerHTML = SE);
      } else if (
        compassWind == "SSE" ||
        compassWind == "S" ||
        compassWind == "SSW"
      ) {
        (document.querySelector(".protected").innerHTML = protectedBeaches),
          (document.querySelector(".beaches").innerHTML = SSESSSW);
      } else if (compassWind == "SW") {
        (document.querySelector(".protected").innerText = protectedBeaches),
          (document.querySelector(".beaches").innerHTML = SW);
      } else if (
        compassWind == "WSW" ||
        compassWind == "W" ||
        compassWind == "WNW"
      ) {
        (document.querySelector(".protected").innerText = protectedBeaches),
          (document.querySelector(".beaches").innerHTML = WSWWWNW);
      } else if (compassWind == "NW") {
        document.querySelector(".protected").innerText = protectedBeaches;
        document.querySelector(".beaches").innerHTML = NW;
      }
      document.querySelector(".weathercontainer").classList.remove("loading");

      //Set the markers
      const icons =
        "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

      //Array of beaches and descriptions
      const contentText = [
        "<h4>Bar Beach</h4>" +
          "<p>Swimming, fishing, surfing, snorkeling, whale watching up on the headland, viewing platforms, 20m from carpark.<br><br>Toilets, shade, walking tracks up through the headland,  BBQ's, picnic facilities . A good choice for young children.</p>",
        "<h4>Main Beach</h4>" +
          "<p>Swimming, fishing, surfing, snorkeling, whale watching, viewing platforms, 20m from carpark.  Toilets, shade, beach walking,  BBQ's, picnic facilities, large adventure playground, sports oval.<br><br>Patrolled during holidays, a good choice for young children.  Off leash dog friendly in certain areas.</p>",
        "<h4>Mitchies Jetty</h4>" +
          "<p>Mitchies Jetty is located on the corner of Fishpen Road and Ocean Drive at a small round-a-bout. There is plenty of parking available. Mitchies Jetty counts with a Espresso Bar Coffee on the beach. It is the great location to launch your Merimbula SUP and kayak hire</p>",
        "<h4>Tura Beach</h4>" +
          "<p>Surfing, swimming, fishing, whale watching, bushwalking tracks, picnic table, toilets, 200m from carpark, dog friendly.</p>",
        "<h4>Middle Beach</h4>" +
          "<p>Swimming, fishing, whale watching,  viewing areas, 300m from carpark down a track and of stairs.  Not a good choice for young children with quite a lot of stairs and often dangerous swell conditions.</p>",
        "<h4>Short Point Beach</h4>" +
          "<p>Surfing, swimming, fishing, whale watching, walking tracks, picnic table, toilets, viewing platform,150m from carpark, patrolled beach during holidays.  Leashed dog friendly except when the beach is patrolled then a 100m distance from the patrolled area is required.</p>",
        "<h4>Dolphin Cove</h4>" +
          "<p>Surfing, swimming, fishing, whale watching, bushwalking tracks, picnic table, viewing platforms, 400m from carpark, dog friendly.<br><br>Accessible from Dolphin Cove residential area.</p>",
        "<h4>North Tura Beach</h4>" +
          "<p>Surfing, swimming, fishing, whale watching, bushwalking tracks, picnic table, toilets, 200m from carpark.<br><br>Accessible via Bournda National Park just north of Tura Beach.</p>",
        "<h4>Spencer Park</h4>" +
          "<p>Swimming, fishing, snorkeling, viewing areas, 50m from carpark or 100m from the street.  Parkland, toilets, shade, walking tracks up through Rotary Park and onto Bar Beach. BBQ's, picnic facilities, playground . A good choice for young children.</p>",
        "<h4>Pambula Beach</h4>" +
          "<p>Swimming, fishing, surfing, snorkeling, whale watching, viewing platforms, 20m from carpark.<br><br>Toilets, beach walking,  walking tracks over the headland, BBQ's, picnic facilities. Patrolled Beach during holidays, a good choice for young children. </p>",
        "<h4>Lions Park Beach</h4>" +
          "<p>Swimming, fishing, surfing, snorkeling, whale watching, viewing platforms, 20m from carpark.<br><br>Toilets, shade, beach walking,  playground, walking tracks over the headland, BBQ's, picnic facilities, off-leash dog friendly.</p>",
        "<h4>Pambula Rivermouth</h4>" +
          "<p>Swimming, fishing, surfing, snorkeling, whale watching, viewing platforms up on the headland, 20m from carpark.<br><br>Toilets, shade, beach walking,  playground, walking tracks over the headland and up the river, picnic facilities.</p>",
        "<h4>Bar Mouth Beach</h4>" +
          "<p>Swimming, fishing, surfing, snorkeling, whale watching, 200m from carpark with stairs and track.  Shade, beach walking,  bushwalking tracks through the National Park and towards Haycock Point.<br><br>Accessible from Ben Boyd National Park.  Take water & sunscreen.</p>",
        "<h4>Severs Beach</h4>" +
          "<p>Swimming, fishing, snorkeling, 700m from carpark with walking track.  Take water & sunscreen.<br><br>Accessible from Ben Boyd National Park.</p>",
      ];

      //Markers
      addMarker({
        coords: { lat: -36.89580145144116, lng: 149.92407974969328 },
        iconImage: icons,
        content: contentText[0],
      });
      addMarker({
        coords: { lat: -36.89748332145616, lng: 149.9156936453022 },
        iconImage: icons,
        content: contentText[1],
      });
      addMarker({
        coords: { lat: -36.89419938367968, lng: 149.9191310611633 },
        iconImage: icons,
        content: contentText[2],
      });
      addMarker({
        coords: { lat: -36.862254022504445, lng: 149.93510497331488 },
        iconImage: icons,
        content: contentText[3],
      });
      addMarker({
        coords: { lat: -36.894294089341486, lng: 149.92911983711372 },
        iconImage: icons,
        content: contentText[4],
      });
      addMarker({
        coords: { lat: -36.882925182658525, lng: 149.93020514201342 },
        iconImage: icons,
        content: contentText[5],
      });
      addMarker({
        coords: { lat: -36.84653651384741, lng: 149.93601562425445 },
        iconImage: icons,
        content: contentText[6],
      });
      addMarker({
        coords: { lat: -36.834963715996906, lng: 149.93434232327687 },
        iconImage: icons,
        content: contentText[7],
      });
      addMarker({
        coords: { lat: -36.888605520579205, lng: 149.91944049471292 },
        iconImage: icons,
        content: contentText[8],
      });
      addMarker({
        coords: { lat: -36.940684015686486, lng: 149.90927307425812 },
        iconImage: icons,
        content: contentText[9],
      });
      addMarker({
        coords: { lat: -36.94483882261285, lng: 149.91355310744058 },
        iconImage: icons,
        content: contentText[10],
      });
      addMarker({
        coords: { lat: -36.949504995781865, lng: 149.91024940778772 },
        iconImage: icons,
        content: contentText[11],
      });
      addMarker({
        coords: { lat: -36.95274733072922, lng: 149.90585565971867 },
        iconImage: icons,
        content: contentText[13],
      });
      addMarker({
        coords: { lat: -36.94748630063176, lng: 149.92165784902573 },
        iconImage: icons,
        content: contentText[12],
      });

      async function addMarker(props) {
        const { AdvancedMarkerElement } = await google.maps.importLibrary(
          "marker"
        );

        const iconElement = document.createElement("img");
        iconElement.src = props.iconImage;
        const marker = new AdvancedMarkerElement({
          position: props.coords,
          map: map,
          content: iconElement,
          gmpClickable: true,
        });

        //Check content
        if (props.content) {
          let infoWindow = new google.maps.InfoWindow({
            content: props.content,
          });

          marker.addListener("click", function () {
            infoWindow.open(map, marker);
          });
        }
      }
    },

    fetchTemperature: function () {
      const tempDisplay = document.querySelector(".wtrtmp");
      fetch(
        "https://web-production-c94c2.up.railway.app/result" ||
          "http://localhost:3080/result"
      )
        .then((response) => response.json())
        .then((data) => {
          const temp = data;
          console.log("🚀 ~ temp:", temp);
          temp = "Not available"
            ? (tempDisplay.innerHTML = "Water Temperature: " + temp)
            : (tempDisplay.innerHTML = "Water Temperature: " + temp + "°C");
        });

      const tidesDisplay = document.querySelector(".tide");
      fetch(
        "https://web-production-c94c2.up.railway.app/tides" ||
          "http://localhost:3080/tides"
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const tides = data;
          tidesDisplay.innerHTML = "Tides info: " + tides;
        });
    },
  };
  weather.fetchTemperature();
  weather.fetchWeather();
})();
