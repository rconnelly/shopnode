//
// # Resource Factory
// Factory module that creates and initializes resources for shopify api (blog, product, order, etc).
// It uses the restify client behind the scenes to provide
// high-performance, well-designed rest support. As such, the options are the same as restify's.
//
// The library tacks in the following headers automatically:
//
// - Date
// - Accept: application/json
//
// On data:
// - Content-Type: application/json
// - Content-Length
// - Content-MD5
//
var restify = require('restify');
var dir = require('directory'),
    assert = require('assert');


// Convert camalized names to underscore. (from prototype.js)
var underscore = function (name) {
    return name.replace(/::/g, '/')
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
        .replace(/([a-z\d])([A-Z])/g, '$1_$2')
        .replace(/-/g, '_')
        .toLowerCase();
}


// ### Options
//   - url: base url to communicate with (required).
//   - path: HTTP Resource (default: '/' || path from url).
//   - headers: Any additional HTTP headers to send on all requests.
//   - contentType: one of the supported serialization formats, which is
//       either `application/json` or application/x-www-form-urlencoded. Default
//       is JSON.
//   - version: Default version to use in x-api-version (optional).
//   - retryOptions: options to pass to node-retry. Defaults to 3 retries after
//       a 500ms wait.
//   - noContentMD5: skip content-md5 checking.
//

var ResourceFactory = function Resource(options) {
};

//
// Factory method for creating resources
// ## Parameters
// - shopnode
// -
// -
//
// ### Available Modules:
//
// - ApplicationCharges
// - Articles
// - Assets
// - Blogs
// - Carts
// - Collects
// - Comments
// - Countries
// - CustomCollections
// - Customers
// - CustomerGroups
// - Events
// - Fulfillments
// - Metafields
// - Orders
// - Pages
// - ProductImages
// - Products
// - ProductSearchEngines
// - ProductVariants
// - RecurringApplicationCharges
// - Redirects
// - ScriptTags
// - Shop
// - SmartCollections
// - Themes
// - Transactions
// - Webhooks
//
//

ResourceFactory.createResource = function(shopnode, module, name) {

    var headers = {};
    // ## Initialize basic authentication if required and add header
    if(shopnode.useBasicAuth)
    {
        headers = { Authorization: 'Basic ' + new Buffer(shopnode.apiKey + ':' + shopnode.password).toString('base64')};
    }

    // ## Create the client with a logger and the base url
    var resource = new module(restify.createClient({
        url: shopnode.getBaseUrl(),
        log: shopnode.log,
        headers: headers
    }));

   // assert.ok(resource.path,'A path function is required for all resources.');
    resource.resourceName = underscore(name);
    return resource;
}


//
// Load all api resources from resources directory
// - shopnode: base api class
//
ResourceFactory.loadResources = function(shopnode) {
    var dir = require('directory')(__dirname +'/resources/', function (module, name) {
        var resource = ResourceFactory.createResource(shopnode, module, name);
        shopnode[name] = resource;
    });
}



module.exports = ResourceFactory;

