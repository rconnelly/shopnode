//
// Module dependencies.
//

var Resource = require('../resource.js')
    , util = require('util');

//
// Redirects constructor.
//

function Redirects(client) { // fix me: create a new connection class
    Resource.call(this, client);
};

util.inherits(Redirects, Resource);

module.exports = Redirects;
