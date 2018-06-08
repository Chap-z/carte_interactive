console.log('\'Allo \'Allo!');

// function currentLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition((function (position) {
//             var marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(map);
//             marker.bindPopup("Ma position :<br> Latitude : " + position.coords.latitude + ',<br>Longitude ' + position.coords.longitude).openPopup();
//         }));
//     } else {
//         alert("La géolocalisation n'est pas supportée par ce navigateur.");
//     }
// }

var mymap = L.map('mapid').setView([47.237829, 6.0240539], 13);
var marker = L.marker([47.237829, 6.0240539]).addTo(mymap);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWxlbWVoZGkiLCJhIjoiY2ppNXcydTExMG9obDNwcDZkcWFoeGthNSJ9.oaF0tVXIUtwznDIW-Ztq0Q', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);