/**
 * Module dependencies.
 */

var Resource = require('../resource.js')
    , util = require('util');

/**
 * Carts constructor.
 * @param client takes a restify client object
 */

function Carts(client) { // fix me: create a new connection class
    Resource.call(this, client);
}

util.inherits(Carts, Resource);

Carts.prototype.post = null;
Carts.prototype.put = null;
Carts.prototype.del = null;

module.exports = Carts;
