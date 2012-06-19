//
// # Articles
//

var Resource = require('../resource.js')
    , util = require('util');

//
// Articles constructor.
// @param client takes a restify client object
//

function Articles(client) { // fix me: create a new connection class
    Resource.call(this, client);

    this.setRoutes({
        get:'blog/:blogId/{resourceName}/:id',
        getAll:'blog/:blogId/{resourceName}',
        put:'blog/:blogId/{resourceName}/:id',
        post:'blog/:blogId/{resourceName}',
        del:'blog/:blogId/{resourceName}/:id',
        count:'blog/:blogId/{resourceName}/count'
    });
}

util.inherits(Articles, Resource);

module.exports = Articles;
