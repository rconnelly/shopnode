//
// Module dependencies.
//

var Resource = require('../resource.js')
    , util = require('util');

//
// Application Charges constructor.
//
// @param client takes a restify client object
//

function ApplicationCharges(client) { // fix me: create a new connection class
    Resource.call(this, client);
    this.setRoute('activate','/{resourceName}/:id/activate');
};

util.inherits(ApplicationCharges, Resource);

ApplicationCharges.prototype.activate = function(id, callback) {
    var rPath = this.urlPathFromRoute('activate', {id:id});
    this.client.post(rPath, null, callback);
};


ApplicationCharges.prototype.count = null;

module.exports = ApplicationCharges;
