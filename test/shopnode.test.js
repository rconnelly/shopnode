var Shopnode = require('../lib/shopnode.js');

var vows = require('vows'),
    assert = require('assert');

vows.describe('shopnode').addBatch({
    'A nodejify session':{
        'with default parameters':{
            topic:new Shopnode({ storeHost:'',
                storeHost:'',
                token:'',
                apiKey:'',
                useBasicAuth:false,
                sharedSecret:'',
                protocol:'https',
                password:'',
                params:{}
            }),
            'uses ssl':function (s) {

            }
        }
    }}).export(module);