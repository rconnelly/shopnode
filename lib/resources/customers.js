/**
 * Module dependencies.
 */

var Resource = require('../resource.js')
    , util = require('util');

/**
 * Application Charges constructor.
 */

function Customers(client) { // fix me: create a new connection class
    Resource.call(this, client);
    this.setRoute('search','/{resourceName}/search');
};

util.inherits(Customers, Resource);

Customers.prototype.search = function(searchParams, callback) {
    assert.ok(id,'Search params are required for customer search.');
    var rPath = this.urlPathFromRoute('search', {});
    this.client.get(rPath, searchParams, callback);
};

module.exports = Customers;
