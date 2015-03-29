var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
      const DIAGONALLEY = new plugin.google.maps.LatLng(28.479882,-81.469544);
      var map;
      document.addEventListener("deviceready", function() {
        // Initialize the map view
        map = plugin.google.maps.Map.getMap({
          'backgroundColor': 'white',
          'mapType': plugin.google.maps.MapTypeId.ROADMAP,
          'controls': {
              'compass': true,
              'myLocationButton': true,
              'indoorPicker': true,
              'zoom': true
          },
          'gestures': {
              'scroll': true,
              'tilt': true,
              'rotate': true,
              'zoom': true
          },
          'camera': {
              'latLng': DIAGONALLEY,
              'tilt': 30,
              'zoom': 18,
              'bearing': 50
          }
        });

        // Wait until the map is ready status.
        map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);
      }, false);

      function onMapReady() {
          map.showDialog();
          map.addMarker({
            'position': new plugin.google.maps.LatLng(28.479582,-81.469544),
            'title': "Dementor"
          });
          map.addMarker({
            'position': new plugin.google.maps.LatLng(28.479882,-81.469744),
            'title': "Dementor"
          });
      }

      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
           WebView.setWebContentsDebuggingEnabled(true);
      }
    }
};

app.initialize();
