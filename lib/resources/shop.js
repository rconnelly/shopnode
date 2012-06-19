/**
 * Module dependencies.
 */

var Resource = require('../resource.js')
    , util = require('util');

/**
 * Shop constructor.
 */

function Shop(client) { // fix me: create a new connection class
    Resource.call(this, client);
};

util.inherits(Shop, Resource);

Shops.prototype.post = null;
Shops.prototype.put = null;
Shops.prototype.del = null;
Shops.prototype.getAll = null;

module.exports = Shop;
