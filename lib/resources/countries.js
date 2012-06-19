//
// # Countries
//

var Resource = require('../resource.js')
    , util = require('util');

//
// Countries constructor.
//

function Countries(client) { // fix me: create a new connection class
    Resource.call(this, client);
};

util.inherits(Countries, Resource);

Countries.prototype.count = null;
module.exports = Countries;
