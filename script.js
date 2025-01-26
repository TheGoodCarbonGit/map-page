// Initialise the map
var map1 = L.map('map', {
  zoomControl: false
}).setView([-41.29012931030752, 174.76792012621496], 5);
var markerMap = {};
  // inistialise lists of markers for clusters
var markers = L.markerClusterGroup();

L.control.zoom({
  position: 'topright'
}).addTo(map1);

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
fetch('https://tong-jt.github.io/map-test/random.json')
  .then(response => response.json())
  .then(data => {

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

      markerMap[title] = {
        marker: marker,
        category: category,
        properties: feature.properties
      };
    });

    map1.addLayer(markers);

  })
  .catch(error => console.error('Error loading GeoJSON:', error));

function showSidebar1(properties) {
    sidebar1.setContent('<h5><em>' + properties.category + '</em></h5><h4>' + properties.name + '</h4><p>' + properties.description + '</p>');
    sidebar1.show();
}

function handleSearch() {
  var query = document.getElementById('search-bar').value.toLowerCase();
  var searchResultsContainer = document.getElementById('search-results');
  
  searchResultsContainer.innerHTML = '';

  var matches = Object.keys(markerMap).filter(function(key) {
      return key.toLowerCase().includes(query);
  });

  if (matches.length > 0 && query != '') {
    searchResultsContainer.style.display = 'block';
    matches.forEach(function(match) {
      var resultItem = document.createElement('div');
      resultItem.className = 'search-result-item';
      resultItem.textContent = match;
      
      resultItem.addEventListener('click', function() {
        showSidebar1(markerMap[match].properties);
      });
      searchResultsContainer.appendChild(resultItem);
    });
  } else {
    searchResultsContainer.style.display = 'none';
  }
}

function updateMarkers() {
  markers.clearLayers();

  Object.keys(markerMap).forEach(function(title) {
    var markerData = markerMap[title];
    var marker = markerData.marker;
    var category = markerData.category;

    if (category === "Good Friend" && document.getElementById('good-friend').checked ||
        category === "Project" && document.getElementById('project').checked ||
        category === "Carbon Farmer" && document.getElementById('carbon-farmer').checked ||
        category === "Donor/Grants" && document.getElementById('donor-grants').checked) {
      markers.addLayer(marker);
    }
  });
}