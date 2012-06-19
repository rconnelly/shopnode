//
// # Fulfillments
//

var Resource = require('../resource.js')
    , util = require('util');

//
// Fulfillments constructor.
//

function Fulfillments(client) { // fix me: create a new connection class
    Resource.call(this, client);

    this.setRoutes({
        get:'orders/:orderId/{resourceName}/:id',
        getAll:'orders/:orderId/{resourceName}',
        put:'orders/:orderId/{resourceName}/:id',
        cancel:'orders/:orderId/{resourceName}/:id/cancel'
    });
};

util.inherits(Fulfillments, Resource);

Fulfillments.prototype.del = null;


Articles.prototype.cancel = function (orderId, id, callback) {
    var rPath = this.urlPathFromRoute('cancel', { orderId:orderId, id:id });
    this.client.get(rPath, null, callback);
};


module.exports = Fulfillments;
