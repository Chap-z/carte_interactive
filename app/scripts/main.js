var mymap = L.map('mapid').setView([47.237829, 6.0240539], 13);

getStations();

function getStations() {
    ginkoAPI("DR/getArrets", {

    }, function (listeArret) {
        console.log("Résultat de getLignes:", listeArret);
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
        document.getElementById("data").innerHTML = msg;
    });
}

function stationPointer(idStation) {
    console.log(idStation);

    ginkoAPI("TR/getTempsLieu", {
        'nom': idStation
    }, function (infosArret) {

        console.log(infosArret);

        infosArret.listeTemps.forEach(function (prochainBus) {

            console.log(prochainBus);
            var customPopup = [
                '<p>'+ prochainBus.idLigne + '</p>',
                '<p>'+ prochainBus.temps + '</p>'
            ];

            console.log(customPopup);
            map(infosArret.longitude, infosArret.latitude, infosArret.id, customPopup);
            
        });
    });
}


var maker = '';


function map(x, y, idStation, customPopup) {

    var marker = L.marker([x, y]).bindPopup(customPopup).addTo(mymap);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWxlbWVoZGkiLCJhIjoiY2ppNXcydTExMG9obDNwcDZkcWFoeGthNSJ9.oaF0tVXIUtwznDIW-Ztq0Q', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'your.mapbox.access.token',
    }).addTo(mymap);

    marker.addEventListener("click", function () {

        stationPointer(idStation);
    }, false);
}