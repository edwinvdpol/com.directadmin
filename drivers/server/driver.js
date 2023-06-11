'use strict';

const Driver = require('../../lib/Driver');
const Client = require('../../lib/Client');

class ServerDriver extends Driver {

  // Pairing
  onPair(session) {
    this.log('Pairing started...');

    session.setHandler('connect', async (data) => {
      this.log('Connecting to server...');

      let settings;
      let license;
      let version;
      let client;

      try {
        // Get connection settings
        settings = this.getConnectSettings(data);

        // Setup client
        client = new Client(settings);

        // Get license
        license = await client.call('LICENSE');

        // Get version
        version = Number(license.version.replace(/\./g, ''));

        // Check if the version valid
        if (version < 1580) {
          throw new Error(this.homey.__('errors.version', { version: license.version }));
        }

        data.id = license.lid;
        data.name = `DA v${license.version} server`;

        // Emit create device event
        await session.emit('create', this.getDeviceData(data));
      } catch (err) {
        throw new Error(this.homey.__(err.message));
      } finally {
        settings = null;
        license = null;
        version = null;
        client = null;
      }
    });
  }

}

module.exports = ServerDriver;
