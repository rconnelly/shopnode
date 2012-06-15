var Nodejify = require('nodejify');

var nodejify = new Nodejify({
    storeHost: 'www.quadpass.com',
    apiKey: '7fae0b4000890ffaf69296f8d99758e1',
    password: '3f028ee17ce583a3362e4d388e6bda91',
    sharedSecret: '820cc67be355dc9153c6d7932d494efc'
});

nodejify.webhook.get(function(response){
    console.log(response);
});