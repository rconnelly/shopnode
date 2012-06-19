//
// # Shop
//

var Resource = require('../resource.js')
    , util = require('util');

//
// Shop constructor.
//

function Shop(client) { // fix me: create a new connection class
    Resource.call(this, client);
};

util.inherits(Shop, Resource);

Shop.prototype.post = null;
Shop.prototype.put = null;
Shop.prototype.del = null;
Shop.prototype.getAll = null;

module.exports = Shop;
