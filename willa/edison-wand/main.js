/*
- Bluetooth pairing
- Bluetooth serial data
- Read accelerometer data
- Process data (gestures)
- Stream gestures over serial
*/
var bleno = require('bleno'),
WandService = require('./wand-service');
  
var primaryService = new WandService();

bleno.on('stateChange', function(state) {
    console.log('on -> stateChange: ' + state);

    if (state === 'poweredOn') {
        bleno.startAdvertising('Wand', [primaryService.uuid]);
    } else {
        bleno.stopAdvertising();
    }
});

bleno.on('advertisingStart', function(error) {
    console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));

    if (!error) {
        bleno.setServices([primaryService]);
    }
});