//
// Module dependencies.
//

var Resource = require('../resource.js')
    , util = require('util');

//
// Transactions constructor.
//

function Transactions(client) { // fix me: create a new connection class
    Resource.call(this, client);
    this.setRoutes({
        get:'orders/:orderId/{resourceName}/:id',
        getAll:'orders/:orderId/{resourceName}',
        post:'orders/:orderId/{resourceName}',
        count:'orders/:orderId/{resourceName}/count'
    });

};

util.inherits(Transactions, Resource);

Transactions.prototype.put = null;

module.exports = Transactions;
