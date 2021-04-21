class City {
    constructor(latitude, longitude, name, bornPlace = false) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.bornPlace = bornPlace;
        this.marker =  null;
    }
}

var currentMarker;
var currentMarkerIndex;
var myCities = [];

function GetMyCities() {
    return [
        new City(19.3911668, -99.4238166, "México City", true),
        new City(25.6490376, -100.4431844, "Monterrey"),
        new City(19.294261, -99.7012546, "Toluca"),
        new City(32.4969713, -117.0878944, "Tijuana"),
        new City(20.9803289, -89.7730069, "Mérida")
    ];
}

function hideButton(isFirst, toHide) {
    if(isFirst) {
        if(toHide) {
            document.getElementById("btnPrevious").classList.add("invisible-button");
        } else {
            document.getElementById("btnPrevious").classList.remove("invisible-button");
        }
    } else {
        if(toHide) {
            document.getElementById("btnNext").classList.add("invisible-button");
        } else {
            document.getElementById("btnNext").classList.remove("invisible-button");
        }
    }
}

function showPreviousCity() {
    --currentMarkerIndex;

    if(currentMarkerIndex < (myCities.length - 1)) {
        hideButton(false, false);
    }

    // this one maybe can't be since the button is hidden, another click is not possible.
    if(currentMarkerIndex < 0) {
        currentMarkerIndex = 0;
        return;
    }

    if(currentMarkerIndex === 0) {
        hideButton(true, true);
    } else {
        hideButton(true, false);
    }
    currentMarker = myCities[currentMarkerIndex];
    document.getElementById("currentCity").innerHTML = currentMarker.name;
    animate(currentMarker.marker, true, 100);
}

function showNextCity() {
    ++currentMarkerIndex;

    if(currentMarkerIndex > 0) {
        hideButton(true, false);
    } 

    // this one maybe can't be since the button is hidden, another click is not possible.
    const numberOfCities = myCities.length - 1;
    if(currentMarkerIndex > numberOfCities) {
        currentMarkerIndex = numberOfCities;
        return;
    }
    
    if(currentMarkerIndex === numberOfCities){
        hideButton(false, true);
    } else {
        hideButton(false, false);
    }
    currentMarker = myCities[currentMarkerIndex];
    document.getElementById("currentCity").innerHTML = currentMarker.name;
    animate(currentMarker.marker, true, 100);
}

// Initialize and add the map
function initMap() {
    // The location of Mexico
    const mexico = { lat: 23.3133202, lng: -111.6576591 };
    myCities = GetMyCities();
    // Markers to play with
    currentMarker = myCities.find(value => { return value.bornPlace;});
    currentMarkerIndex = myCities.indexOf(currentMarker);
    document.getElementById("currentCity").innerHTML = currentMarker.name;
    console.debug(currentMarker);
    console.debug(currentMarkerIndex);
    // The map, centered at Mexico
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: mexico,
    });
    // Adding markers
    myCities.forEach(city => {
        city.marker = new google.maps.Marker({
            position: { lat:city.latitude, lng: city.longitude },
            map: map,
            title: city.name,
        });
    }); 
    
    // Pointing out born city
    animate(currentMarker.marker, true, 1500, animate(currentMarker.marker, false, 1000)); 
}

function toggleBounce(marker, animate) {
    if (!animate) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

function animate(marker, animate, time) {
    setTimeout(function(){ 
        toggleBounce(marker, animate); 
        setTimeout(function() { toggleBounce(marker, false); }, 100);
    }, time);
}