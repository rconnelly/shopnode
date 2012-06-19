//
// Module dependencies.
//

var Resource = require('../resource.js')
    , util = require('util');

//
// Orders constructor.
//

function Orders(client) { // fix me: create a new connection class
    Resource.call(this, client);

    this.setRoute('close','/{resourceName}/:id/close');
    this.setRoute('open','/{resourceName}/:id/open');
    this.setRoute('cancel','/{resourceName}/:id/cancel');
};

util.inherits(Orders, Resource);

Orders.prototype.close = function(id, callback) {
    var rPath = this.urlPathFromRoute('close', {id:id});
    this.client.post(rPath, null, callback);
};

Orders.prototype.open = function(id, callback) {
    var rPath = this.urlPathFromRoute('open', {id:id});
    this.client.post(rPath, null, callback);
};

Orders.prototype.cancel = function(id, callback) {
    var rPath = this.urlPathFromRoute('cancel', {id:id});
    this.client.post(rPath, null, callback);
};

module.exports = Orders;

