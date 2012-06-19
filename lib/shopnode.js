// # Shopnode Api
// This is the core module for the library. It encapsulates resource modules which group rest calls into logical
// modules.


var Crypto = require('crypto');
var resource = require('./resourceFactory.js');

var trim = function(string) {
    return string.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};

var empty = function(string) {
    string = trim(string);
    return string.length === 0;
};

//
// Shopnode constructor
//
// ## setupParams available with:
//
// **storeHost** the host name of the app -- i.e. myshop.myshopify.com, youshop.com (required)
// **token**: the permissions token (optional if a private app)
// **apiKey**: the api key provided by shopify (required)
// **password**: the password provided by shopify (required if useBasicAuth is true)
// **sharedSecret**: the shared secret provided by shopify (required if useBasicAuth is false)
// **useBasicAuth**: if true, basic auth will be used to authenticaticate with shopify. If false, then OAuth2 will be
// used. Defaults is false.
// **params**: a list of parameters that should be sent with each call (optional)
//

function Shopnode(setupParams) {
    var expireTime, timestamp;
    this.storeHost = setupParams.storeHost;
    this.token = setupParams.token || '';
    this.apiKey = setupParams.apiKey;
    this.useBasicAuth = setupParams.useBasicAuth || false;
    this.secret = setupParams.sharedSecret;
    this.protocol = setupParams.protocol || 'https';
    this.password = setupParams.password;
    this.log = setupParams.log;
    this.params = setupParams.params || {};
    this.signature = this.params['signature'];

    if(this.useBasicAuth && (empty(this.password) || empty(this.apiKey)))
    {
        throw new Error('Basic auth requires apiKey and password.');
    }

    if(!this.useBasicAuth && (empty(this.secret) || empty(this.apiKey)))
    {
        throw new Error('OAuth 2.0 requires apiKey and shared secret.');
    }

    if (empty(this.token)) this.token = this.storeHost; // use the store host if a private app
    if (this.signature != null) {
        timestamp = (new Date(this.params['timestamp'])).getTime();
        expireTime = (new Date).getTime() - (24 * 84600);
        if (!this.validateSignature(this.params, this.secret) && expireTime > timestamp) {
            throw new Error('Invalid signature: Possible malicious login.');
        }
    }
   // this.url = this.prepareUrl(this.url);
    if (this.valid) {
        resource.loadResources(this);
    }
}

Shopnode.prototype.permissionUrl = function() {
    if (!empty(this.url) && !empty(this.apiKey)) {
        return "http://" + this.storeHost + "/admin/api/auth?api_key=" + this.apiKey;
    }
};

Shopnode.prototype.getBaseUrl = function() {
    var passwd = (this.useBasicAuth) ? this.password : this.computedPassword();

    var url = "" + this.protocol + "://" + this.apiKey + ":" + passwd + "@" + this.storeHost;
    return url;
};

Shopnode.prototype.computedPassword = function() {
    return crypto.createHash('md5').update("" + this.secret + this.token).digest("hex");
};

Shopnode.prototype.valid = function() {
    return !empty(this.storeHost) && !empty(this.token);
};

Shopnode.prototype.computedPassword = function() {
    return Crypto.createHash('md5').update("" + this.password).digest("hex");
};

Shopnode.prototype.validateSignature = function(params, secretKey) {
    var generatedSignature, k, v;
    var sig = params['signature'];
    generatedSignature = secretKey
    params = sortObj(params);
    for (k in params) {
        v = params[k];
        if (k !== "signature" && k !== "action" && k !== "controller" && !isNumeric(k) && (k != null)) {
            generatedSignature += "" + k + "=" + v;
        }
    }
    generatedSignature = generatedSignature.replace(new RegExp("undefined=undefined"), '');
    generatedSignature = Crypto.createHash('md5').update("" + generatedSignature).digest("hex");
    return generatedSignature === sig;
};


module.exports = Shopnode;