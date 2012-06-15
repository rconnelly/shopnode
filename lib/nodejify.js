/**
 * Module dependencies.
 */
var Crypto = require('crypto')
    , Webhook = require('webhook');

/**
 * Nodejify constructor.
 *
 * @param {Object} setupParameters available with:
 * - storeHost: the host name of the app -- i.e. myshop.myshopify.com, youshop.com (required)
 * - token: the permissions token (optional if a private app)
 * - apiKey: the api key provided by shopify (required)
 * - password: the password provided by shopify (required)
 * - sharedSecret: the shared secret provided by shopify (required)
 * - params: a list of parameters that should be sent with each call (optional)
 */


function Nodejify(setupParams) {
    var expireTime, timestamp;
    this.storeHost = setupParams.storeHost;
    this.token = setupParams.token != null ? token : '';
    this.apiKey = setupParams.apiKey;
    this.secret = setupParams.sharedSecret;
    this.params = setupParams.params != null ? params : {};
    this.signature = setupParams.params['signature']
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
        this.webhook = new Webhook(this);
    }
}

Nodejify.prototype.permissionUrl = function() {
    if (!empty(this.url) && !empty(this.apiKey)) {
        return "http://" + this.url + "/admin/api/auth?api_key=" + this.apiKey;
    }
};

Nodejify.prototype.baseUrl = function() {
    return "" + this.protocol + "://" + this.apiKey + ":" + (this.computedPassword()) + "@" + this.storeHost + "/admin";
};

Nodejify.prototype.valid = function() {
    return !empty(this.storeHost) && !empty(this.token);
};

Nodejify.prototype.computedPassword = function() {
    return Crypto.createHash('md5').update("" + this.secret + this.token).digest("hex");
};

Nodejify.prototype.validateSignature = function(params, secretKey) {
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


module.exports = Nodejify;