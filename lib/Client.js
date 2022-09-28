'use strict';

const fetch = require('node-fetch');
const qs = require('querystring');
const AbortController = require('abort-controller');
const { blank } = require('./Utils');

class Client {

  // Constructor
  constructor(settings) {
    const {
      host, port, user, pass,
    } = settings;

    let aHost = host;

    // Remove trailing slash
    if (host.slice(-1) === '/') {
      aHost = host.slice(0, -1);
    }

    this.controller = new AbortController();
    this.url = `${aHost}:${port}/CMD_API_`;

    this.options = {
      method: 'GET',
      signal: this.controller.signal,
      headers: {
        Authorization: `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}`,
      },
    };
  }

  // Return device information
  async getSyncData(id, driver) {
    const result = {};

    // Domain
    if (driver === 'domain') {
      const email = await this.call('POP', { domain: id, action: 'full_list' });
      const domains = await this.call('ADDITIONAL_DOMAINS', { name: id });

      // Check if domain exists
      if (blank(domains[id])) {
        throw new Error('error.domain_not_found');
      }

      result.email = email;
      result.domain = domains[id];
    }

    // Server
    if (driver === 'server') {
      result.stats = await this.call('ADMIN_STATS');
      result.license = await this.call('LICENSE');
    }

    return result;
  }

  // Make an API call
  async call(command, query = {}) {
    query.json = 'yes';

    const timeout = setTimeout(() => {
      this.controller.abort();
    }, 5000);

    return fetch(`${this.url}${command}?${qs.stringify(query)}`, this.options)
      .then(this.responseCheck)
      .then((res) => res.json())
      .catch((err) => {
        throw this.handleError(err);
      })
      .finally(() => {
        clearTimeout(timeout);
      });
  }

  // Check response status
  responseCheck = (res) => {
    if (res.ok) {
      return res;
    }

    console.log(`[API] HTTP error ${res.status}:`, JSON.stringify(res));

    if (res.status === 400) {
      throw new Error('api.badRequest');
    }

    if (res.status === 401) {
      throw new Error('api.unauthorized');
    }

    if (res.status === 502 || res.status === 504) {
      throw new Error('api.timeout');
    }

    if (res.status === 500) {
      throw new Error('api.error');
    }

    throw new Error('api.connection');
  };

  // Handle connection errors
  handleError = (err) => {
    if (err.type !== 'system' && err.type !== 'aborted') {
      return err;
    }

    console.log('[API] Error:', err.message);

    if (err.type === 'system') {
      return new Error('api.connection');
    }

    if (err.type === 'aborted') {
      return new Error('api.timeout');
    }

    return err;
  };

}

module.exports = Client;
