//
// # Assets
//

var Resource = require('../resource.js')
    , util = require('util');

//
// Assets constructor.
// @param client takes a restify client object
//

function Assets(client) { // fix me: create a new connection class
    Resource.call(this, client);

    this.setRoutes({
        get:'themes/:themeId/{resourceName}/:id',
        getAll:'themes/:themeId/{resourceName}',
        put:'themes/:themeId/{resourceName}/:id',
        del: 'themes/:themeId/{resourceName}/:id'
    });
}

util.inherits(Assets, Resource);

Assets.prototype.post = null;
Assets.prototype.count = null;

module.exports = Assets;
