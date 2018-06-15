var mymap = L.map('map').setView([47.237993, 6.022696], 18);
mymap.locate({setView:true});

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

function getLocated(position) {
    mymap.setView([position.coords.latitude, position.coords.longitude], 13);
    getStations(position.coords.latitude, position.coords.longitude);
}

function getLocation() {
    if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getLocated);
    } else {
        return null
    }   
}

function getStations(latitudeUser, longitudeUser) {
    ginkoAPI('DR/getArrets', {}, function (listeArret) {
        var marge = 0.0020

        latitudeUserMax = latitudeUser + marge;
        latitudeUserMin = latitudeUser - marge;
        longitudeUserMax = longitudeUser + marge;
        longitudeUserMin = longitudeUser - marge;

        listeArret.forEach(function (arret) {
            var x = arret.latitude;
            var y = arret.longitude;
            var idStation = arret.id;

            if ((latitudeUserMin < x && x < latitudeUserMax) && (longitudeUserMin < y && y < longitudeUserMax)) {
                map(x, y, idStation);
            }
            return false;
        });
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

function map(x, y, idStation, customPopup) {

    

    var marker = L.marker([x, y]).addTo(mymap);


    marker.addEventListener('click', function () {


        stationPointer(idStation);
        console.log(popUp);
        popUp.style.transform = 'none';


    }, false);
}

// quand la page est chargée, on lance nos fonctions
$(function() {
    getStations(47.237993, 6.022696);
    getLocation();
})