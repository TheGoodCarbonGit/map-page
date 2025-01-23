// Initialise the map
var map1 = L.map('map').setView([-41.29012931030752, 174.76792012621496], 5);

// Add the tiles (image of the maps)
var lyr_streets = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

lyr_streets.addTo(map1);

// Add the sidebar
var sidebar1 = L.control.sidebar('sidebar', {
    position: 'left',
    closeButton: true,
    autoPan: true
}).addTo(map1);

// Fetch the JSON from local file, parse through
fetch('random.json')
  .then(response => response.json())
  .then(data => {

    // inistialise lists of markers for clusters
    var markers = L.markerClusterGroup();
    var markerMap = {};

    // Parsing through each individual entry and extract info
    data.features.forEach(function(feature) {
      var coordinates = feature.geometry.coordinates;
      var title = feature.properties.name;
      var category = feature.properties.category;

      // Create different classes of icons
      var iconOptions = {};

      if (category === "Good Friend") {
        iconOptions = {
          icon: 'face-smile',
          iconShape: 'marker',
          borderColor: '#2a3d68',
          textColor: 'white',
          backgroundColor: '#2a3d68'
        };
      } else if (category === "Project") {
        iconOptions = {
          icon: 'seedling',
          iconShape: 'marker',
          borderColor: '#195f4d',
          textColor: 'white',
          backgroundColor: '#195f4d'
        };
      } else if (category === "Carbon Farmer") {
        iconOptions = {
          icon: 'tree',
          iconShape: 'marker',
          borderColor: '#bf3938',
          textColor: 'white',
          backgroundColor: '#bf3938'
        };
      } else if (category === "Donor/Grants") {
        iconOptions = {
          icon: 'thumbs-up',
          iconShape: 'marker',
          borderColor: '#eb7c2c',
          textColor: 'white',
          backgroundColor: '#eb7c2c'
        };
      } else {
        iconOptions = {
          icon: 'leaf',
          iconShape: 'marker',
          borderColor: '#2196F3',
          textColor: '#2196F3',
          backgroundColor: 'white'
        };
      }

      // Create the marker object
      var marker = L.marker([coordinates[1], coordinates[0]], {
        title: title,
        icon: L.BeautifyIcon.icon(iconOptions),
        tags: [category]
      });

      marker.on('click', function() {
        showSidebar1(feature.properties);
      });

      markers.addLayer(marker);
      markerMap[title.toLowerCase()] = feature.properties;
    });

    // Import filter button
    L.control.tagFilterButton({
        data: ['Good Friend', 'Project', 'Carbon Farmer', 'Donor/Grants', 'none'],
        icon: '<i class="fa-solid fa-filter"></i>',
        filterOnEveryClick: true
        }).addTo( map1 );

    map1.addLayer(markers);

    // Add search bar
    var searchBar = L.control.pinSearch({
      position: 'topright',
      placeholder: 'Search...',
      buttonText: 'Search',
      onSearch: function(query) {
        console.log('Search query:', query);
        var lowerQuery = query.toLowerCase();

        if (markerMap[lowerQuery]) {
          showSidebar1(markerMap[lowerQuery]);
        }
      },
      searchBarWidth: '200px',
      searchBarHeight: '30px',
      maxSearchResults: 3
    }).addTo(map1);
  })
  .catch(error => console.error('Error loading GeoJSON:', error));

function showSidebar1(properties) {
    sidebar1.setContent('<h4><em>' + properties.category + '</em></h4><h2>' + properties.name + '</h2><p>' + properties.description + '</p>');
    sidebar1.show();
}













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
