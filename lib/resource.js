// #Resource
// Base module for all resources
//

var util = require('util'),
    assert = require('assert')
querystring = require ('querystring');

//
// ## Resource Constructor
// Takes in a configured restify client object and
// sets up basic routes
//
function Resource(client) { // fix me: create a new connection class
    this.client = client;
    this.resourceName = '';
    this.extension = '.json';
    this.basePath = '/admin/';
    // ### Default routes
    this._routes = {
        get:'{resourceName}/:id',
        getAll:'{resourceName}',
        put:'{resourceName}/:id',
        post:'{resourceName}',
        del: '{resourceName}/:id',
        count: '{resourceName}/count'
    };
}

// params and query parameters are both optional
Resource.prototype.getAll = function (params, queryParameters, callback) {
    if (arguments.length == 1 && typeof(params) == 'function')
    {
        callback = params;
        params = null;
    }
    else if(arguments.length == 2 && typeof(queryParameters) == 'function')
    {
        callback = queryParameters;
        queryParameters = params;
        params = null;
    }

    var rPath = this.urlPathFromRoute('getAll', queryParameters);
    this.client.get(rPath, callback);
};

// queryParameters is optional
Resource.prototype.get = function (params, queryParameters, callback) {
    if (arguments.length == 2 && typeof(queryParameters) == 'function')
    {
        callback = queryParameters;
        queryParameters = null;
    }

    assert.ok(id, 'An object id is required for get requests.');
    var rPath = this.urlPathFromRoute('get', {id:id}, queryParameters);
    this.client.get(rPath, callback);
};

Resource.prototype.put = function (params, data, callback) {
    var rPath = this.urlPathFromRoute('put', params);
    this.client.put(rPath, data, callback);
};

Resource.prototype.post = function (params, data, callback) {
    if (arguments.length == 2)
    {
        callback = data;
        data = params;
        params = null;
    }

    var rPath = this.urlPathFromRoute('post', params);
    this.client.post({path:rPath, body:data}, callback);
};

Resource.prototype.del = function (params, callback) {
    var rPath = this.urlPathFromRoute('del', params);
    this.client.del({path:rPath}, callback);
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

// ## urlPathFromRoute
//
//  Returns the full relative including extension
//
// - **routeName** - the name of the route (get,put,etc)
// - **params** - object which will be used to generate url
// - **queryParams** - optional object which will be serialized into a query string and appended onto url
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

//
// ## Routes
// Routes allow the resource urls to be generated based on params.
//
// ### Route Config Example
//
//        {
//            get: '{moduleName}/:id',
//            getAll: '{moduleName}',
//            put: '{moduleName}/:id',
//            post: '{moduleName}/:id',
//            activate: '{moduleName}/:id/activate'
//        }
//
// In the above example, `activate` is a special non-rest compliant api method for Application Charges
// Variables:
//
// - **:id** the id of the object
// - **{moduleName}** takes the name of module and converts name from camalized to underscored.
//
// i.e. `applicationCharges` => `application_charges`
//
//
// ### Example
// given a param object of:
//        {
//             id: 1
//        }
//
// and a module name of `order`
//
//
// the resulting url would be:
//        order/1

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