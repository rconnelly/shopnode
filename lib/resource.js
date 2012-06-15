/**
 * Module dependencies.
 */
var restify = require('restify');

/**
 * Resource constructor. This class supports the basic behavior of all rest
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
var Resource = function Resource(options) {
    this.client = restify.createJsonClient(options);
};

module.exports = Resource;

