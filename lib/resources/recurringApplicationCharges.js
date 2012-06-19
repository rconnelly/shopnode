//
// Module dependencies.
//

var Resource = require('../resource.js')
    , util = require('util');

//
// RecurringApplicationCharges constructor.
//

function RecurringApplicationCharges(client) { // fix me: create a new connection class
    Resource.call(this, client);

    this.setRoute('activate','/{resourceName}/:id/activate');
};

util.inherits(RecurringApplicationCharges, Resource);

RecurringApplicationCharges.prototype.cancel = function(id, callback) {
    this.del(id,callback);
};

module.exports = RecurringApplicationCharges;
