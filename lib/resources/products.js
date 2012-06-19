/**
 * Module dependencies.
 */

var Resource = require('../resource.js')
    , util = require('util');

/**
 * Products constructor.
 */

function Products(client) { // fix me: create a new connection class
    Resource.call(this, client);
};

util.inherits(Products, Resource);

module.exports = Products;
