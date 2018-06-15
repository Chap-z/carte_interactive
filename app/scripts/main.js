var mymap = L.map('map').locate({setView:true, maxZoom: 18});

function getLocation() {
    if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        var x = 'Votre navigateur ne prend malheureusement pas en charge la géolocalisation.';
    }

    function showPosition(position) {
        console.log(position.coords.latitude, position.coords.longitude);

        getStations(position.coords.latitude, position.coords.longitude);
    }

}

getLocation();

function getStations(latitudeUser, longitudeUser) {
    ginkoAPI('DR/getArrets', {


        }, function (listeArret) {
            // var BreakException = {};

            // try {
            //     var compt = 0;

            latitudeUserMax = latitudeUser + 0.0020;
            latitudeUserMin = latitudeUser - 0.0020;

            longitudeUserMax = longitudeUser + 0.0020;
            longitudeUserMin = longitudeUser - 0.0020;

            console.log(latitudeUserMin, latitudeUserMax);
            console.log(longitudeUserMin, longitudeUserMax);

            listeArret.forEach(function (arret) {

                // if (compt >= 6) throw BreakException;
                var x = arret.latitude;
                var y = arret.longitude;
                var idStation = arret.id;
                if ((latitudeUserMin < x && x < latitudeUserMax) && (longitudeUserMin < y && y < longitudeUserMax)) {
                    map(x, y, idStation);
                    console.log(arret);
                } else {
                    console.log('truc');
                }
                // compt++;
                return false;
            });
            // } catch (e) {
            //     if (e !== BreakException) throw e;
            // }
        },
        function (msg) {
            document.getElementById('data').innerHTML = msg;
        });
}

function stationPointer(idStation) {

    ginkoAPI('TR/getTempsLieu', {
        'nom': idStation
    }, function (infosArret) {

        var customPopup = '<h4>' + infosArret.nomExact + '</h4>';
        infosArret.listeTemps.forEach(function (prochainBus) {

            customPopup += '<p class="info-bus"> <span style="background-color:#' + prochainBus.couleurFond + '; color:#' + prochainBus.couleurTexte + '; padding : 5px 5px; min-width : 30px;">' + prochainBus.numLignePublic + '</span>  ' + prochainBus.destination + '<span class="time"> >    ' + prochainBus.temps + '</span></p>';
            console.log(prochainBus);
        });
        var latlng = L.latLng(infosArret.latitude, infosArret.longitude);
        var popup = L.popup()
            .setLatLng(latlng)
            .setContent(customPopup)
            .openOn(mymap);

        map(infosArret.longitude, infosArret.latitude, infosArret.id, customPopup);
        var popUp = document.getElementsByClassName('leaflet-popup')[0];
        popUp.parentNode.removeChild(popUp);
        document.body.appendChild(popUp);
    });
}

var popUp = document.getElementsByClassName('.leaflet-pane.leaflet-map-pane');
var close = document.getElementsByClassName('leaflet-popup-close-button');

function map(x, y, idStation, customPopup) {

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);

    var marker = L.marker([x, y]).addTo(mymap);


    marker.addEventListener('click', function () {


        stationPointer(idStation);
        console.log(popUp);
        popUp.style.transform = 'none';


    }, false);
}
var circle = L.circle([47.237829, 6.0240539], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 200
}).addTo(mymap);
// Code Geoloc


close.addEventListener('click', function () {

    close.style.transform = 'initial';

// function showPosition(position) {
//     x.innerHTML = 'Latitude: ' + position.coords.latitude +
//         '<br>Longitude: ' + position.coords.longitude;
// }
});
