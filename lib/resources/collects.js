/**
 * Module dependencies.
 */

var Resource = require('../resource.js')
    , util = require('util');

/**
 * Collects constructor.
 * @param client takes a restify client object
 */

function Collects(client) { // fix me: create a new connection class
    Resource.call(this, client);
};

util.inherits(Collects, Resource);

Collects.prototype.count = function(callback) {
    var rPath = this.urlPathFromRoute('count', {id:id});
    this.client.get(rPath, null, callback);
};

Collects.prototype.path = 'collects';

module.exports = Collects;
