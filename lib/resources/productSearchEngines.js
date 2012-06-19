/**
 * Module dependencies.
 */

var Resource = require('../resource.js')
    , util = require('util');

/**
 * ProductSearchEngines constructor.
 */

function ProductSearchEngines(client) { // fix me: create a new connection class
    Resource.call(this, client);
};

util.inherits(ProductSearchEngines, Resource);

ProductSearchEngines.prototype.post = null;
ProductSearchEngines.prototype.count = null;
ProductSearchEngines.prototype.put = null;
ProductSearchEngines.prototype.del = null;


module.exports = ProductSearchEngines;
