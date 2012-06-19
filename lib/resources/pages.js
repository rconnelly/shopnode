/**
 * Module dependencies.
 */

var Resource = require('../resource.js')
    , util = require('util');

/**
 * Pages constructor.
 */

function Pages(client) { // fix me: create a new connection class
    Resource.call(this, client);
};

util.inherits(Pages, Resource);

Pages.prototype.path = 'pages';

module.exports = Pages;
