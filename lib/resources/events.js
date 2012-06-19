//
// # Events
//

var Resource = require('../resource.js')
    , util = require('util');

//
// Events constructor.
//

function Events(client) { // fix me: create a new connection class
    Resource.call(this, client);
};

util.inherits(Events, Resource);

Events.prototype.post = null;
Events.prototype.put = null;
Events.prototype.del = null;

module.exports = Events;
