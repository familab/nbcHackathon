var snd = new Audio("img/shipphaser1.wav");

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
      app.setupMap();
      app.setupBLE();
    },
    setupMap: function(){
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
                //"address": "D0:39:72:C8:C7:3C", // Mike1
                "address": "D0:39:72:E5:21:8A", // Shane1
                "serviceUuid": "a495ff20-c5b1-4b44-b512-1370f02d74de",
                "characteristicUuid": "a495ff21-c5b1-4b44-b512-1370f02d74de",
                "isNotification" : true
              });
            }, function(error) {
              console.log("discover error", error);
            }, {
              //"address": "D0:39:72:C8:C7:3C",  // Mike1
              "address": "D0:39:72:E5:21:8A", // Shane1
            });

          }
        }, function(error) {
          console.log("connect error", error);
        }, {
          //"address": "D0:39:72:C8:C7:3C",  // Mike1
          "address": "D0:39:72:E5:21:8A", // Shane1
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
      jQuery.get("http://10.0.1.9:5000/flash");
      snd.play();
    }
};

app.initialize();
