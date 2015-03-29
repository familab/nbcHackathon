////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*                                          Begin Web Backend                                             */
////////////////////////////////////////////////////////////////////////////////////////////////////////////
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000,function(){
    console.log("Listening on 3000");
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*                                          End Web Backend                                               */
////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
This app is to demo the Edison Wand project. 
*/

var noble = require('noble');

var wandServiceUuid = 'fffffffffffffffffffffffffffffff0';
var wandCharacteristicUuid = '1101';

noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    //
    // Once the BLE radio has been powered on, it is possible
    // to begin scanning for services. Pass an empty array to
    // scan for all services (uses more time and power).
    //
    console.log('scanning...');
    noble.startScanning([wandServiceUuid], false);
  }
  else {
    noble.stopScanning();
  }
})

var wandService = null;
var wandCharacteristic = null;

noble.on('discover', function(peripheral) {
  //
  // The advertisment data contains a name, power level (if available),
  // certain advertised service uuids, as well as manufacturer data,
  // which could be formatted as an iBeacon.
  //
  console.log('found peripheral:', peripheral.advertisement);
  console.log('found peripheral uuid:', peripheral.uuid);
  //
  // Once the peripheral has been discovered, then connect to it.
  // It can also be constructed if the uuid is already known.
  ///
  peripheral.connect(function(err) {
    //
    // Once the peripheral has been connected, then discover the
    // services and characteristics of interest.
    //
    peripheral.discoverServices([wandServiceUuid], function(err, services) {
      services.forEach(function(service) {
        //
        // This must be the service we were looking for.
        //
        console.log('found service:', service.uuid);

        //
        // So, discover its characteristics.
        //
        service.discoverCharacteristics([], function(err, characteristics) {

          characteristics.forEach(function(characteristic) {
            //
            // Loop through each characteristic and match them to the
            // UUIDs that we know about.
            //
            console.log('found characteristic:', characteristic.uuid);

            if (wandCharacteristicUuid == characteristic.uuid) {
              wandCharacteristic = characteristic;
            }            
          })

          //
          // Check to see if we found all of our characteristics.
          //
          if (wandCharacteristic) {
            //
            // We did, so bake a pizza!
            //
            readWand();
          }
          else {
            console.log('missing characteristics');
          }
        })
      })
    })
  })
})

function readWand() {
  //Read data from the wand; log to console
  var wandData = new Buffer(1);
  
  wandCharacteristic.read(function(error, data) {
    var characteristicInfo = "";
    if (data) {
      var string = data.toString('ascii');
      characteristicInfo = data.toString('hex');
      io.emit('refresh data', characteristicInfo);
    }
    console.log(characteristicInfo);    
    readWand();
  });  
}
