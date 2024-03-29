'use strict';

const Homey = require('homey');

class Driver extends Homey.Driver {

  /*
  | Driver events
  */

  // Driver initialized
  async onInit() {
    this.log('Initialized');
  }

  // Driver destroyed
  async onUninit() {
    this.log('Destroyed');
  }

  /*
  | Pairing functions
  */

  // Return store data
  getStoreData(device) {
    return {
      host: device.host,
      port: Number(device.port) || 2222,
      user: device.user,
      pass: device.pass,
    };
  }

  // Return data to create the device
  getDeviceData(device) {
    const data = {
      name: device.name,
      data: {
        id: device.id,
      },
      store: this.getStoreData(device),
    };

    this.log('Device found', JSON.stringify(data));

    return data;
  }

}

module.exports = Driver;
