var map1 = L.map('map').setView([-41.29012931030752, 174.76792012621496], 5);

var lyr_streets = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var lyr_satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.esri.com/">Esri</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

lyr_streets.addTo(map1);

var sidebar1 = L.control.sidebar('sidebar', {
    position: 'left',
    closeButton: true,
    autoPan: true
}).addTo(map1);

fetch('random.json')
    .then(response => response.json())
    .then(data => {
        var markers = L.markerClusterGroup();

        data.features.forEach(function(feature) {
            var coordinates = feature.geometry.coordinates;
            var title = feature.properties.name;

            var marker = L.marker([coordinates[1], coordinates[0]], { title: title });

            marker.on('click', function() {
                showSidebar1(feature.properties);
            });

            markers.addLayer(marker);
        });

        map1.addLayer(markers);
    })
    .catch(error => console.error('Error loading GeoJSON:', error));

function showSidebar1(properties) {
    sidebar1.setContent('<h2>' + properties.name + '</h2><p>' + properties.description + '</p>');
    sidebar1.show();
}

var baseMaps = {
    "Streets": lyr_streets,
    "Satellite": lyr_satellite
};

L.control.layers(baseMaps).addTo(map1);













var map2 = L.map('map2').setView([-41.29012931030752, 174.76792012621496], 5);

var lyr_streets = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var lyr_satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.esri.com/">Esri</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

lyr_streets.addTo(map2);

fetch('random.json')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            onEachFeature: function (feature, layer) {
                layer.bindPopup('<h3>' + feature.properties.name + '</h3><p>' + feature.properties.description + '</p>');
            }
        }).addTo(map2);
    })
    .catch(error => console.error('Error loading JSON:', error));

var baseMaps = {
    "Streets": lyr_streets,
    "Satellite": lyr_satellite
};

L.control.layers(baseMaps).addTo(map2);












var map3 = L.map('map3').setView([-41.29012931030752, 174.76792012621496], 5);

var lyr_streets = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var lyr_satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.esri.com/">Esri</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

lyr_streets.addTo(map3);

var sidebar3 = L.control.sidebar('sidebar3', {
    position: 'left',
    closeButton: true,
    autoPan: true
}).addTo(map3);

fetch('random.json')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            onEachFeature: function (feature, layer) {
                layer.on('click', function () {
                    showSidebar3(feature.properties);
                });
            }
        }).addTo(map3);
    })
    .catch(error => console.error('Error loading JSON:', error));

function showSidebar3(properties) {
    sidebar3.setContent('<h2>' + properties.name + '</h2><p>' + properties.description + '</p>');
    sidebar3.show();
}

var baseMaps = {
    "Streets": lyr_streets,
    "Satellite": lyr_satellite
};

L.control.layers(baseMaps).addTo(map3);
