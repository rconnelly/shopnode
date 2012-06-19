//
// Module dependencies.
//

var Resource = require('../resource.js')
    , util = require('util');

//
// Custom Collections constructor.
//

function CustomCollections(client) { // fix me: create a new connection class
    Resource.call(this, client);
};

util.inherits(CustomCollections, Resource);

module.exports = CustomCollections;
