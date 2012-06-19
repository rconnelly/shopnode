//
// # Metafields
//

var Resource = require('../resource.js')
    , util = require('util');

//
// Metafields constructor.
//

function Metafields(client) { // fix me: create a new connection class
    Resource.call(this, client);

    this.setRoute('postWithProductId','products/:productId/{resourceName}');
    this.setRoute('putWithProductId','products/:productId/{resourceName}/:id');
    this.setRoute('getWithProductId','products/{resourceName}/:id');
};

util.inherits(Metafields, Resource);

Metafields.prototype.postWithProduct = function(productId, data, callback) {
    var rPath = this.urlPathFromRoute('postWithProductId', {productId:productId});
    this.client.get(rPath, data, callback);
};

Metafields.prototype.putWithProduct = function(productId, id, data, callback) {
    var rPath = this.urlPathFromRoute('putWithProductId', {productId:productId, id:id});
    this.client.get(rPath, data, callback);
};

Metafields.prototype.getWithProduct = function(productId, id, callback) {
    var rPath = this.urlPathFromRoute('getWithProductId', {productId:productId, id:id});
    this.client.get(rPath, null, callback);
};

module.exports = Metafields;
