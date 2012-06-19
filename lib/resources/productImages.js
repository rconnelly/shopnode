/**
 * Module dependencies.
 */

var Resource = require('../resource.js')
    , util = require('util');

/**
 * ProductImages constructor.
 */

function ProductImages(client) { // fix me: create a new connection class
    Resource.call(this, client);

    this.setRoutes({
        get:'product/:productId/images/:id',
        getAll:'product/:productId/images',
        del: 'product/:productId/images/:id'
    });
};

util.inherits(ProductImages, Resource);

ProductImages.prototype.put = null;
ProductImages.prototype.count = null;

module.exports = ProductImages;
