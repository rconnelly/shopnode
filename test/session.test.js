var Session = require('nodejify');

vows.describe('nodejify').addBatch({
    'A nodejify session': {
        'with default parameters': {
            topic: new Session(),
            'uses ssl': function(s)
            {

            }
        }
    }}).export(module);