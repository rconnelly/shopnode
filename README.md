# shopnode
shopnode provides a complete, well-documented library for communicating with the powerful
shopping cart platform shopify.

The code builds on nodeify using restify in the backend for performance and logging functionality.

## What do you get with shopnode?

* Complete support for the latest shopify api (let me know if it's missing something)
* Tutorials on how
* Examples of how to use

## Using shopnode

### Setting up a shopnode session

    var Shopnode = require('shopnode');

    var shopnode = new Shopnode({
        storeHost:'yourshop.myshopify.com',
        apiKey:'your-api-key',
        password:'your-password-if-basic-auth',
        useBasicAuth:true
    });

### Making a call

Before making an api call, it's important to read and understand the [Shopify Api](http://api.shopify.com/). The
POST/PUT/GET/DELETE methods all have specific parameters for each.


#### Returning all webhooks

    shopnode.webhooks.getAll(function (err, req, res, obj) {
        assert.ifError(err);

        console.log('Server returned: %j', obj.body);
    });

#### Returning one order with where id = 12345

    shopnode.orders.get({id: 12345}, {/* Empty query string */},
        function (err, req, res, obj) {
            assert.ifError(err);

        console.log('Server returned: %j', obj.body);
        });

Many resources support basic CRUD operations and have the following signatures:

post(params, data, callback);
put(params, data, callback);
get(params, queryString, callback);
getAll(params, queryString, callback);

- **params** is an object which will be used to the generate url
- **data** is an object which will be seralized in all post and put calls
- **queryString** is an object which will be converted into a query string (i.e. ?name=value&name2=value2)

### Additional Resources

- [Shopify Api](http://api.shopify.com/) - Browse the api
- [Shopify Partner Program](http://www.shopify.com/partners/apps) - Register to become a partner
 to publish your app to the store.