var util = require('util'),
  bleno = require('bleno'),
  BlenoPrimaryService = bleno.PrimaryService,
  WandCharacteristic = require('./wand-characteristic');

function WandService() {
  WandService.super_.call(this, {
      uuid: 'fffffffffffffffffffffffffffffff0',
      characteristics: [
          new WandCharacteristic()
      ]
  });
}

util.inherits(WandService, BlenoPrimaryService);

module.exports = WandService;