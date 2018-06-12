var mymap = L.map('mapid').setView([47.237829, 6.0240539], 13);

getStations();

function getStations() {
    ginkoAPI('DR/getArrets', {

    }, function (listeArret) {
        console.log('Résultat de getLignes:', listeArret);
        var BreakException = {};
        try {
            var compt = 0;
            listeArret.forEach(function (arret) {
                console.log(arret);
                if (compt >= 6) throw BreakException;
                var x = arret.latitude;
                var y = arret.longitude;
                var idStation = arret.id;
                map(x, y, idStation);
                compt++;
                return false;
            });
        } catch (e) {
            if (e !== BreakException) throw e;
        }
    }, function (msg) {
        document.getElementById('data').innerHTML = msg;
    });
}

function stationPointer(idStation) {
    console.log(idStation);

    ginkoAPI('TR/getTempsLieu', {
        'nom': idStation
    }, function (infosArret) {

        console.log(infosArret);
        var customPopup = '<h4>'+infosArret.nomExact+'</h4>';
        infosArret.listeTemps.forEach(function (prochainBus) {

            console.log(prochainBus);
            customPopup += '<p style="line-height : 2;"> <span style="background-color:#' + prochainBus.couleurFond + '; color:#' + prochainBus.couleurTexte + '; padding : 5px 5px; min-width : 30px;">' + prochainBus.idLigne +'</span> destination > '+ prochainBus.destination + '<br>'+ prochainBus.temps + '</p>';
            

        });
        var latlng = L.latLng(infosArret.latitude, infosArret.longitude);
            var popup = L.popup()
                .setLatLng(latlng)
                .setContent(customPopup)
                .openOn(mymap);

            map(infosArret.longitude, infosArret.latitude, infosArret.id, customPopup);
    });
}


function map(x, y, idStation, customPopup) {

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);
    // var customPopup = 'coucou'.bindPopup(customPopup);
    console.log(customPopup);

    var marker = L.marker([x, y]).addTo(mymap);


    marker.addEventListener('click', function () {

        stationPointer(idStation);

    }, false);
}


// Code Geoloc

var x = document.getElementById('geoloc');

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = 'Votre navigateur ne prend malheureusement pas en charge la géolocalisation.';
    }
}

function showPosition(position) {
    x.innerHTML = 'Latitude: ' + position.coords.latitude + 
    '<br>Longitude: ' + position.coords.longitude;
}