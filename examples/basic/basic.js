var Shopnode = require('../../lib/shopnode');
var assert = require('assert')
    , nconf = require('nconf')
    , util = require('util')
    , fs = require('fs');


var log = require('restify').log;
log.level(log.Level.Trace);

nconf.argv()
    .env()
    .file({ file:'examples/basic/config.json' });

nconf.defaults({apiConfig:{
    storeHost:'yourshop.myshopify.com',
    apiKey:'your-api-key',
    password:'your-password-if-basic-auth',
    sharedSecret:'your-shared-key-if-oauth',
    log:log,
    useBasicAuth:true // uses apiKey and password (used in private apps)
}});

var runBasicTest = function () {
    var config = nconf.get('apiConfig');
    log.trace('Configuration: ' + util.inspect(config));
    var shopnode = new Shopnode(config);

    shopnode.webhooks.getAll(null, null, function (err, req, res, obj) {
        assert.ifError(err);
        console.log('Server returned: %j', obj.body);
    });

    shopnode.orders.getAll(null, null, function (err, req, res, obj) {
        assert.ifError(err);
        console.log('Server returned: %j', obj.body);
    });

    shopnode.customers.getAll(null, null, function (err, req, res, obj) {
        assert.ifError(err);
        console.log('Server returned: %j', obj.body);
    });


    fs.readFile('./examples/basic/data/customers.json', 'utf8', function (err, data) {
        shopnode.customers.post(JSON.parse(data),
            function (err, req, res, obj) {

                assert.ifError(err);
                console.log('Server returned: %s', obj.body);

                shopnode.customers.del({id:req.customer.id}, function(err1,req1, res1, obj1){
                    assert.ifError(err1);
                    console.log('Server returned: %j', req);
                });

            });
    });
}


runBasicTest();
