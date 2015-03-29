var util = require('util')
  os = require('os'),
  exec = require('child_process').exec,
  bleno = require('bleno'),
  Descriptor = bleno.Descriptor,
  Characteristic = bleno.Characteristic;

var mraa = require('mraa'); //require mraa

// I2C accelerometer magic
var x = new mraa.I2c(1);
x.address(0x04);

function getMemsicData(){    
    var accel = x.read(1);
    return accel;
}

var WandCharacteristic = function() {
  WandCharacteristic.super_.call(this, {
      uuid: '1101',
      properties: ['read'],
      descriptors: [
        new Descriptor({
            uuid: '1101',
            value: 'Wand gesture status.'
        })
      ]
  });
};

util.inherits(WandCharacteristic, Characteristic);

WandCharacteristic.prototype.onReadRequest = function(offset, callback) {
  // for now let's make a rand to send back
  //var ret = Math.floor(Math.random() * 10);
  var ret = getMemsicData();
  console.log(ret.toString('ascii'));
  //callback(this.RESULT_SUCCESS, new Buffer([ret]));
  callback(this.RESULT_SUCCESS, ret);
}; 

module.exports = WandCharacteristic;