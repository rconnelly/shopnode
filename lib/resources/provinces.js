/**
 * Module dependencies.
 */

var Resource = require('../resource.js')
    , util = require('util');

/**
 * Countries constructor.
 */

function Provinces(client) { // fix me: create a new connection class
    Resource.call(this, client);

    this.setRoutes({
        get:'countries/:countryId/{resourceName}/:id',
        getAll:'countries/:countryId/{resourceName}',
        put:'countries/:countryId/{resourceName}/:id',
        count:'countries/:countryId/{resourceName}/count'
    });
};

util.inherits(Provinces, Resource);

Provinces.prototype.count = null;
Provinces.prototype.post = null;

module.exports = Provinces;
