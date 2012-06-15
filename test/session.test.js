var Session = require('session.js');

vows.describe('session').addBatch({
    'A session': {
        'with default parameters': {
            topic: new Session(),
            'uses ssl': function(s)
            {

            }
        }
    }}).export(module);