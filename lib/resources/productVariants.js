//
// # Product Variants
//

var Resource = require('../resource.js')
    , util = require('util');

//
// ProductVariants constructor.
//

function ProductVariants(client) { // fix me: create a new connection class
    Resource.call(this, client);

    this.setRoutes({
        get:'product/:productId/variants/:id',
        getAll:'product/:productId/variants',
        del: 'variants/:id',
        put: 'variants/:id'
    });
};

util.inherits(ProductVariants, Resource);
ProductVariants.prototype.count = null;

module.exports = ProductVariants;
