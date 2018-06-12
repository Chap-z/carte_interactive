var mymap = L.map('map').setView([47.237829, 6.0240539], 13);

recupArrets();

function recupArrets() {
    ginkoAPI('DR/getArrets', {}, function (listeArret) {
        console.log('Résultat de getLignes:', listeArret);
        var BreakException = {};
        try {
            var compt = 0;
            listeArret.forEach(function (arret) {
                console.log(arret);
                if (compt >= 6) throw BreakException;
                var x = arret.latitude;
                var y = arret.longitude;
                map(x, y);
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

function arretPointer() {
    console.log('coucou');
}


