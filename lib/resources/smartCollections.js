//
// # Smart Collections
//

var Resource = require('../resource.js')
    , util = require('util');

//
// SmartCollections constructor.
//

function SmartCollections(client) { // fix me: create a new connection class
    Resource.call(this, client);
};

util.inherits(SmartCollections, Resource);

module.exports = SmartCollections;
