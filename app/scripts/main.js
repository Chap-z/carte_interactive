var mymap = L.map('map').locate({setView:true, maxZoom: 18});

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
        var customPopup = '<h4>' + infosArret.nomExact + '</h4>';
        infosArret.listeTemps.forEach(function (prochainBus) {

            console.log(prochainBus);
            //customPopup += '<p style="line-height : 2;"> <span style="background-color:#' + prochainBus.couleurFond + '; color:#' + prochainBus.couleurTexte + '; padding : 5px 5px; min-width : 30px;">' + prochainBus.idLigne + '</span> destination > ' + prochainBus.destination + '<br>' + prochainBus.temps + '</p>';
            customPopup += '<a class="btn" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample"> <span style="background-color:#' + prochainBus.couleurFond + '; color:#' + prochainBus.couleurTexte + '; padding : 5px 5px; min-width : 30px;">' + prochainBus.idLigne +'</span></a>';
            customPopup += '<div class="collapse" id="collapseExample"><div class="card card-body"><p style="line-height : 2;">' + prochainBus.idLigne + 'destination > ' + prochainBus.destination + '<br>' + prochainBus.temps + '</p></div></div>';

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

    // var pointer = L.icon({
    //     iconUrl: '../medias/pointer.png',

    //     iconSize: [20, 27], // size of the icon
    //     shadowSize: [50, 64] // size of the shadow
    // });

    var marker = L.marker([x, y]).addTo(mymap);


    marker.addEventListener('click', function () {

        stationPointer(idStation);

    }, false);
}
var circle = L.circle([47.237829, 6.0240539], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 200
}).addTo(mymap);
// Code Geoloc

// var x = document.getElementById('geoloc');

// function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition);
//     } else {
//         x.innerHTML = 'Votre navigateur ne prend malheureusement pas en charge la géolocalisation.';
//     }
// }

// function showPosition(position) {
//     x.innerHTML = 'Latitude: ' + position.coords.latitude +
//         '<br>Longitude: ' + position.coords.longitude;
// }
