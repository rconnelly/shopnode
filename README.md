# shopnode
shopnode provides a complete, well-documented library for communicating with the powerful
shopping cart platform shopify.

The code builds on nodeify using restify in the backend for performance and logging functionality.

## What do you get with shopnode?

* Complete support for the latest shopify api (let me know if it's missing something)
* Uses the [Restify](http://mcavage.github.com/node-restify/) module behind the scenes
* Documentation (a work in progress)
* [Example code](examples/README.md)

## Using shopnode

### Setting up a shopnode session

    var Shopnode = require('shopnode');

    // Basic Authentication
    var shopnode = new Shopnode({
        storeHost:'yourshop.myshopify.com',
        apiKey:'your-api-key',
        password:'your-password-if-basic-auth',
        useBasicAuth:true
    });

    // OAuth 2.0
    var shopnode = new Shopnode({
        storeHost:'yourshop.myshopify.com',
        apiKey:'your-api-key',
        sharedSecret:'your-shared-key'
    });


- **storeHost** - the store url without the https
- **apiKey** - the key found in the admin section of your store
- **password** - for private apps, this will be available. Public apps must used
- **sharedKey** - for apps using OAuth 2.0, a shared key is required

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

#### Creating a customer

    shopnode.customers.post({
            "customer": {
                "first_name": "Steve",
                "last_name": "Lastnameson",
                "email": "steve.lastnameson@lastnamesonco.com",
                "addresses": [
                    {
                        "address1": "123 Oak St",
                        "city": "Ottawa",
                        "country": "CA",
                        "first_name": "Mother",
                        "last_name": "Lastnameson",
                        "phone": "555-1212",
                        "province": "ON",
                        "zip": "123 ABC"
                    }
                ]
            }
        },function(err, req, res, obj){

            assert.ifError(err);
            console.log('Server returned: %j', obj.body);
        });

Many resources support basic CRUD operations and have the following signatures:

post(params (optional), data, callback);
put(params, data, callback);
get(params, queryString, callback);
getAll(params (optional), queryString (optional), callback);

- **params** is an object which will be used to the generate url
- **data** is an object which will be seralized in all post and put calls
- **queryString** is an object which will be converted into a query string (i.e. ?name=value&name2=value2)



### Additional Resources

- [Shopify Api](http://api.shopify.com/) - Browse the api
- [Shopify Partner Program](http://www.shopify.com/partners/apps) - Register to become a partner
 to publish your app to the store.
