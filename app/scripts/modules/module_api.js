// Dès le chargement de la page, on charge et affiche les lignes
ginkoAPI("DR/getArrets", { }, function(listeArret){ 
    // Réussite de la requête
    console.log("Résultat de getLignes:", listeArret); // Regardez la console (F12) pour voir la tête que ça a
    var content = "<table><tr><th>ID</th><th>Nom de l'arret</th><th>latitude</th><th>longitude</th></tr>";
    
    // Parcours des lignes
    // (ce code n'est pas beau, mais le but n'est pas là ;))
    listeArret.forEach(function(arret){
        // On prépare la liste affichable des variantes de la ligne
        var ArretsDeMaLigne = "";
        
        // On ajoute la ligne à notre tableau
        content += "<tr>"+
                    "<td>"+arret.id+"</td>"+
                    "<td>"+arret.nom+"</td>"+
                    "<td>"+arret.latitude+"</td>"+
                    "<td>"+arret.longitude+"</td>"+
                    "</tr>";
    });
    
    content += "</table>";
    document.getElementById("data").innerHTML = content;
    
}, function(msg){ 
    // Echec de la requête
    document.getElementById("data").innerHTML = msg; 
});


