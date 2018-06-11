function map(x, y) {

    var marker = L.marker([x, y]).addTo(mymap);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWxlbWVoZGkiLCJhIjoiY2ppNXcydTExMG9obDNwcDZkcWFoeGthNSJ9.oaF0tVXIUtwznDIW-Ztq0Q', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'your.mapbox.access.token'
    }).addTo(mymap);

    marker.addEventListener("click", function () {

        arretPointer("")
    }, false);
}