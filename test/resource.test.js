
var Resource = require('../lib/resource.js');

var vows = require('vows'),
    assert = require('assert');

var suite = vows.describe('resource').addBatch({
    'A resource with a name of "blog"':{
        topic: function() {
            var rs = new Resource();
            rs.resourceName = 'blog';
            return rs;
        },
        'and get route /{resourceName}/:id':{ topic:'/{resourceName}/:id',
            'and param object {id: "123"}':{ topic:{id:"123"},
                'calling urlPathFromRoute("get", params)':{
                    topic: function(param, routePath, resource){
                        return resource.urlPathFromRoute('get',param);
                    },
                    'will return /blog/123': function(topic)
                    {
                        assert.equal(topic, '/admin/blog/123.json');
                    }
                }
            }
        }
    }}).export(module);