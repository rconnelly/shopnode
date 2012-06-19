/**
 * Module dependencies.
 */

var Resource = require('../resource.js')
    , util = require('util');

/**
 * Comments constructor.
 * @param client takes a restify client object
 */

function Comments(client) { // fix me: create a new connection class
    Resource.call(this, client);

    this.setRoute('spam','/{resourceName}/:id/spam');
    this.setRoute('not_spam','/{resourceName}/:id/not_spam');
    this.setRoute('approve','/{resourceName}/:id/approve');
};

util.inherits(Comments, Resource);

Resource.prototype.spam = function (id, callback) {
    assert.ok(id,'An object id is required for marking a comment as spam.');
    var rPath = this.urlPathFromRoute('spam', {id:id});
    this.client.post(rPath, null, callback);
};

Resource.prototype.not_spam = function (id, callback) {
    var rPath = this.urlPathFromRoute('not_spam', {id:id});
    this.client.post(rPath, null, callback);
};

Resource.prototype.approve = function (id,  callback) {
    var rPath = this.urlPathFromRoute('approve', { id:id });
    this.client.post(rPath, null, callback);
};

module.exports = Comments;
