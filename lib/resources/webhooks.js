/**
 * Module dependencies.
 */

var Resource = require('../resource.js')
    , util = require('util');

/**
 * Webhooks constructor.
 */

function Webhooks(client) { // fix me: create a new connection class
    Resource.call(this, client);
};

util.inherits(Webhooks, Resource);

module.exports = Webhooks;
