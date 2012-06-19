/**
 * Module dependencies.
 */
var restify = require('restify');
var dir = require('directory'),
    assert = require('assert');

/**
 *
 * Private functions
 */


// from prototype.js
var underscore = function (name) {
    return name.replace(/::/g, '/')
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
        .replace(/([a-z\d])([A-Z])/g, '$1_$2')
        .replace(/-/g, '_')
        .toLowerCase();
}

/**
 * ResourceFactory constructor. This class supports the basic behavior of all rest
 * calls (blog, product, order, etc)
 * It uses the restify client behind the scenes to provide
 * high-performance, well-designed
 * rest support. As such, the options are the same as restify's.
 *
 * Tacks in the following headers automatically:
 *
 * - Date
 * - Accept: application/json
 *
 * On data:
 * - Content-Type: application/json
 * - Content-Length
 * - Content-MD5
 *
 * @param {Object} options the usual pattern with:
 *   - url: base url to communicate with (required).
 *   - path: HTTP Resource (default: '/' || path from url).
 *   - headers: Any additional HTTP headers to send on all requests.
 *   - contentType: one of the supported serialization formats, which is
 *       either `application/json` or application/x-www-form-urlencoded. Default
 *       is JSON.
 *   - version: Default version to use in x-api-version (optional).
 *   - retryOptions: options to pass to node-retry. Defaults to 3 retries after
 *       a 500ms wait.
 *   - noContentMD5: skip content-md5 checking.
 */
var ResourceFactory = function Resource(options) {
};



/**
 * Factory method for creating resources
 * @param {Class} resourceClass the resource to be created.
 *
 * Available Resource Classes:
 * - ApplicationCharges
 * - Articles
 * - Assets
 * - Blogs
 * - Carts
 * - Collects
 * - Comments
 * - Countries
 * - CustomCollections
 * - Customers
 * - CustomerGroups
 * - Events
 * - Fulfillments
 * - Metafields
 * - Orders
 * - Pages
 * - Products
 * - ProductSearchEngines
 * - RecurringApplicationCharges
 * - Redirects
 * - ScriptTags
 * - Shops
 * - Themes
 * - Transactions
 * - Webhooks
 *
 * @param {Object} options
 */

ResourceFactory.createResource = function(shopnode, module, name) {

    var headers = {};
    if(shopnode.useBasicAuth)
    {
        headers = { Authorization: 'Basic ' + new Buffer(shopnode.apiKey + ':' + shopnode.password).toString('base64')};
    }

    var resource = new module(restify.createClient({
        url: shopnode.getBaseUrl(),
        log: shopnode.log,
        headers: headers
    }));

   // assert.ok(resource.path,'A path function is required for all resources.');
    resource.resourceName = underscore(name);
    return resource;
}


/**
 * Load all api resources from resources directory
 * @param nodejify the nodejify api base object
 */
ResourceFactory.loadResources = function(shopnode) {
    var dir = require('directory')(__dirname +'/resources/', function (module, name) {
        var resource = ResourceFactory.createResource(shopnode, module, name);
        shopnode[name] = resource;
    });
}



module.exports = ResourceFactory;

