import L from 'leaflet';
// On initialise la latitude et la longitude de Bordeaux (centre de la carte)
const lat = 44.841225;
const lon = -0.5800364;
let map = null;
let compagnies = {
    "Ynov": { "lat": 44.8538818359375, "lon": -0.566460132598877 },
    "Cités du vin": { "lat": 44.8623715, "lon": -0.5500191 },
    "Quinconces": { "lat": 44.8454928, "lon": -0.5740681 },
    "Grand Hotel": { "lat": 44.8428883, "lon": -0.5744338 },
};
// Fonction d'initialisation de la carte
function initMap() {
    // Créer l'objet "macarte" et l'insèrer dans l'élément HTML qui a l'ID "map"
    map = L.map('map').setView([lat, lon], 11);
    // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        // Il est toujours bien de laisser le lien vers la source des données
        attribution: 'données © OpenStreetMap/ODbL - rendu OSM France',
        minZoom: 1,
        maxZoom: 20
    }).addTo(map);
    // Nous parcourons la liste des villes
    for (let compagny in compagnies) {
        let marker = L.marker([compagnies[compagny].lat, compagnies[compagny].lon]).addTo(map);
        marker.bindPopup(compagny);
    }               	
}

window.onload = function(){
// Fonction d'initialisation qui s'exécute lorsque le DOM est chargé
initMap(); 
};