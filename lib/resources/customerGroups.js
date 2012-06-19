//
// Module dependencies.
//

var Resource = require('../resource.js')
    , util = require('util');

//
// CustomerGroups constructor.
//

function CustomerGroups(client) { // fix me: create a new connection class
    Resource.call(this, client);
    this.setRoute('getAllCustomers','{resourceName}/:id/customers');
};

util.inherits(CustomerGroups, Resource);

CustomerGroups.prototype.search = function(id, callback) {
    assert.ok(id,'An object id is required to get all customers for a customer group.');
    var rPath = this.urlPathFromRoute('getAllCustomers', {id:id});
    this.client.get(rPath, null, callback);
};

module.exports = CustomerGroups;
