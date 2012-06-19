/**
 * Module dependencies.
 */

var util = require('util'),
    assert = require('assert')
querystring = require ('querystring');

/**
 * Resource constructor. All resource modules
 * inherit from this module.
 * @param {Object} client takes a restify client object
 */
function Resource(client) { // fix me: create a new connection class
    this.client = client;
    this.resourceName = '';
    this.extension = '.json';
    this.basePath = '/admin/';
    this._routes = {
        get:'{resourceName}/:id',
        getAll:'{resourceName}',
        put:'{resourceName}/:id',
        post:'{resourceName}',
        del: '{resourceName}/:id',
        count: '{resourceName}/count'
    };
}

Resource.prototype.getAll = function (params, queryParameters, callback) {
    var rPath = this.urlPathFromRoute('getAll', queryParameters);
    this.client.get(rPath, callback);
};

Resource.prototype.get = function (params, queryParameters, callback) {
    assert.ok(id, 'An object id is required for get requests.');
    var rPath = this.urlPathFromRoute('get', {id:id});
    this.client.get(rPath, callback);
};

Resource.prototype.put = function (params, data, callback) {
    var rPath = this.urlPathFromRoute('put', params);
    this.client.put(rPath, data, callback);
};

Resource.prototype.post = function (params, data, callback) {
    var rPath = this.urlPathFromRoute('post', params);
    this.client.post(rPath, data, callback);
};

Resource.prototype.del = function (params, data, callback) {
    var rPath = this.urlPathFromRoute('del', params);
    this.client.del(rPath, data, callback);
};

Resource.prototype.count = function(params, callback) {
    if(!callback) // params is optional
    {
        callback = params;
        params = null;
    }

    var rPath = this.urlPathFromRoute('count', params);

    this.client.get(rPath, null, callback);
};

/**
 * The default method for all calls (
 */


var getPathHelper = function (path, id, apiMethod, extension) {
    var fullRelativePath = path;
    /*
     if(id)
     fullRelativePath += '/' + id;

     if(apiMethod)
     fullRelativePath += '/' + apiMethod;

     fullRelativePath += extension;
     */

    return fullRelativePath;
}

/**
 * Returns the full relative including extension
 * @param {String} id optional id for object
 * @param {String} apiMethod optional name of api method -- non-crud operations
 */

Resource.prototype.urlPathFromRoute = function (routeName, params, queryParams) {
    var route = this.getRoutes()[routeName];

    if (params) {
        Object.keys(params).forEach(function (key, index, ar) {
            route = route.replace(':' + key, params[key]);
        });
    }
    if (this.resourceName)
        route = route.replace('{resourceName}', this.resourceName);

    if(queryParams)
    {
        route = route + '?' + querystring.stringify(queryParams);
    }

    return this.basePath + route + this.extension;
}

/**
 * Returns a route config object, {keys, regex}, given a url path route.
 * Borrowed from Express JS: https://github.com/visionmedia/express/blob/master/lib/utils.js
 * @param {String} path url string with :paramName and {varName}
 */
Resource.prototype.routeConfigFromPath = function (path) {
    //assert.isEqual()
    var sensitive = true;
    var strict = true;
    var keys = [];
    path = path
        .concat('/?')
        .replace(/\/\(/g, '(?:/')
        .replace(/\+/g, '__plus__')
        .replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g, function (_, slash, format, key, capture, optional) {
            keys.push({ name:key, optional:!!optional });
            slash = slash || '';
            return ''
                + (optional ? '' : slash)
                + '(?:'
                + (optional ? slash : '')
                + (format || '') + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')'
                + (optional || '');
        })
        .replace(/([\/.])/g, '\\$1')
        .replace(/__plus__/g, '(.+)')
        .replace(/\*/g, '(.*)');

    return {
        keys:keys,
        regex:new RegExp('^' + path + '$', sensitive ? '' : 'i')
    };
}

/**
 * Returns an object which maps function calls in the module to a path. Override this method
 * in each of the resource modules.
 *
 * Example:
 *
 *    {
 *      get: '{moduleName}/:id',
 *      getAll: '{moduleName}',
 *      put: '{moduleName}/:id',
 *      post: '{moduleName}/:id',
 *      activate: '{moduleName}/:id/activate'
 *    }
 *
 *    In the above example, "activate" is a special non-rest compliant api method for Application Charges
 *
 *    Variables:
 *    - :name
 *    - {moduleName} takes the name of module and converts name from camalized to underscored.
 *    i.e. applicationCharge => application_charge
 *
 */

Resource.prototype.getRoutes = function () {
    return this._routes;
}

Resource.prototype.removeRoute = function (routeName) {
    this._routes[routeName] = null;
}

Resource.prototype.setRoute = function (routeName, routePath) {
    this._routes[routeName] = routePath;
}

Resource.prototype.setRoutes = function (routes) {
    this._routes = routes;
}

module.exports = Resource;