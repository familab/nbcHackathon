var util = require('util'),
  os = require('os'),
  exec = require('child_process').exec,
  bleno = require('bleno'),
  Descriptor = bleno.Descriptor,
  Characteristic = bleno.Characteristic;

var WandCharacteristic = function() {
  WandCharacteristic.super_.call(this, {
      uuid: '1337',
      properties: ['read'],
      descriptors: [
        new Descriptor({
            uuid: '1337',
            value: 'Wand gesture status.'
        })
      ]
  });
};

util.inherits(WandCharacteristic, Characteristic);

WandCharacteristic.prototype.onReadRequest = function(offset, callback) {
  // for now let's make a rand to send back
  var ret = Math.floor(Math.random() * 10);
  callback(this.RESULT_SUCCESS, new Buffer([ret]));
};

module.exports = WandCharacteristic;