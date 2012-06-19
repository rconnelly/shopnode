//
// Module dependencies.
//

var Resource = require('../resource.js')
    , util = require('util');

//
// ScriptTags constructor.
//

function ScriptTags(client) { // fix me: create a new connection class
    Resource.call(this, client);
};

util.inherits(ScriptTags, Resource);

module.exports = ScriptTags;
