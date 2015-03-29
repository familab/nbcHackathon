var snd = new Audio("img/thunder2.wav");

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
      $("#start").click(function() {
          app.setupMap();
          app.setupBLE();
      });
    },
    setupMap: function(){
        const DIAGONALLEY = new plugin.google.maps.LatLng(28.479882,-81.469544);
        var map;
        document.addEventListener("deviceready", function() {
          // Initialize the map view
          app.map = map = plugin.google.maps.Map.getMap({
            'backgroundColor': 'white',
            'mapType': plugin.google.maps.MapTypeId.ROADMAP,
            'controls': {
                'compass': true,
                'myLocationButton': false,
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

            var bounds = [
              new plugin.google.maps.LatLng(28.479920, -81.469853),
              new plugin.google.maps.LatLng(28.479122, -81.469289)
            ];

            map.addGroundOverlay({
              'url': "www/img/Diagon Alley Stylized-01.png",
              'bounds': bounds,
              'opacity': 1
            }, function(groundOverlay) {
              map.animateCamera({
                'target': bounds
              });
            });

            app.spawn();
        }
    },
    setupBLE: function() {
      console.log("doing ble");
      bluetoothle.initialize(function() {
        console.log("init");
        bluetoothle.connect(function(status) {
          console.log(status);
          if(status.status === "connected") {
            bluetoothle.discover(function(status) {
              console.log(status);
              bluetoothle.subscribe(function(status) {
                //console.log(status);
                if(status.status==="subscribedResult") {
                  //console.log(status.value);
                  switch(status.value) {
                    case "BAA=":
                      //not moving;
                      break;
                    case "AgA=":
                      //moving
                      break;
                    case "AAA=":
                      //flick
                      app.flick();
                      break;
                    default:
                      break;
                  }
                } else {
                  console.log(status);
                }
              }, function(error) {
                console.log("subscribe error", error);
              }, {
                "address": $("#bean").val(),
                "serviceUuid": "a495ff20-c5b1-4b44-b512-1370f02d74de",
                "characteristicUuid": "a495ff21-c5b1-4b44-b512-1370f02d74de",
                "isNotification" : true
              });
            }, function(error) {
              console.log("discover error", error);
            }, {
              "address": $("#bean").val()
            });

          }
        }, function(error) {
          console.log("connect error", error);
        }, {
          "address": $("#bean").val()
        });
      }, function(error) {
        console.log("init error", error);
      }, {
        "request": true,
        "statusReceiver": false
      });
    },
    flick: function() {
      console.log('flick');
      jQuery.get($("#flash").val());
      jQuery.ajax({
        type: "POST",
        url: $("#pixmob").val(),
        data: "RED"
      });
      snd.play();
      setTimeout(function(){app.marker.pop().remove();}, 2000);
    },
    spawn: function() {
      app.marker = new Array;
      for(var i = 0; i < 8; i++) {
        var loc = app.getRandomLocation();
        console.log(loc);
        app.map.addMarker({
          'position': new plugin.google.maps.LatLng(loc[0], loc[1]),
          'icon': 'www/img/dementor-01.png',
          'title': "Dementor"
        }, function(marker) {
          app.marker.push(marker);
        });
      }
    },
    getRandomLocation: function (){
      return [
        (Math.random() * (28.479820 - 28.479122) + 28.479122),
        (Math.random() * (-81.469289 - -81.469755) + - 81.469755)
      ]
    }
};

app.initialize();
