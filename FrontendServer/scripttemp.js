// Initialize the map and set its view to the specified latitude and longitude with zoom level
var map = L.map('map').setView([51.505, -0.09], 13);

// Add a tile layer to the map (OpenStreetMap tile layer)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add markers to the map with their latitudes and longitudes, and bind popups
var marker1 = L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('<b>Hello world!</b><br />I am a popup.').openPopup();

var marker2 = L.marker([51.51, -0.1]).addTo(map)
    .bindPopup('Another marker.');

// Example: Adding multiple markers dynamically from an array of locations
var locations = [
    { lat: 40.7128, lng: -74.0060, popup: "New York" },
    { lat: 48.8566, lng: 2.3522, popup: "Paris" },
    { lat: 35.6895, lng: 139.6917, popup: "Tokyo" }
];

// Loop through locations and add markers
locations.forEach(function(location) {
    L.marker([location.lat, location.lng]).addTo(map)
        .bindPopup(location.popup);
});
