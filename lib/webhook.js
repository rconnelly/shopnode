/**
 * Module dependencies.
 */
var Resource = require('resource');

/**
 * Webhook constructor. This handles all calls
 * for webhooks.
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
 * @param {Nodejify} nodejify takes a nodejify object
 */
function Webhook(nodejify) { // fix me: create a new connection class
    this.connection = nodejify;

    this.resource = new Resource({
        url: nodejify.baseUrl,
        path: '/admin/webhooks.json'
    });
};

/**
 *
 * @param queryParameters parameters available with:
 * - limit: Amount of results (default: 50) (maximum: 250)
 * - page: Page to show (default: 1)
 * - since_id: Restrict results to after the specified ID
 * - created_at_min: Show webhooks created after date (format: 2008-01-01 03:00)
 * - created_at_max: Show webhooks created before date (format: 2008-01-01 03:00)
 * - updated_at_min: Show webhooks last updated after date (format: 2008-01-01 03:00)
 * - updated_at_max: Show webhooks last updated before date (format: 2008-01-01 03:00)
 * - topic: Show webhooks with a given topic. Available topics: orders/create, orders/updated, orders/paid, orders/cancelled, orders/fulfilled, app/uninstalled, customer_groups/create, customer_groups/update, customer_groups/delete, products/create, products/update, products/delete, collections/create, collections/update, collections/delete, carts/create, carts/update
 * - address: Show webhooks with a given address
 * - fields: comma-separated list of fields to include in the response
 *
 * @param callback function to call upon response from server
 */
Webhook.prototype.get = function(queryParameters, callback) {
    this.resource.client.get(queryParameters, callback);
};

Webhook.prototype.put = function(data, callback) {
    this.resource.client.put(queryParameters, callback);
};

Webhook.prototype.post = function(data, callback) {
    this.resource.client.put(queryParameters, callback);
};

module.exports = Webhook;
