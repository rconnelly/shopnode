//
// # Blogs
//

var Resource = require('../resource.js')
    , util = require('util');

//
// Blogs constructor.
// @param client takes a restify client object
//

function Blogs(client) { // fix me: create a new connection class
    Resource.call(this, client);

};

util.inherits(Blogs, Resource);

module.exports = Blogs;
