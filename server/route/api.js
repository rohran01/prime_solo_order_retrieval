var express = require('express');
var pg = require('pg');

var router = express.Router();
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/addresses';

router.get('/getNames', function(request, response) {
    console.log('getNames hit');
    var results = [];

    pg.connect(connectionString, function(error, client) {
        var namesRequested = client.query("SELECT * FROM users");

        namesRequested.on('row', function(row) {
            results.push(row);
        });

        namesRequested.on('end', function() {
            client.end();
            return response.json(results)
        })
    })
});

router.get('/getAddresses', function(request, response) {
    console.log('addressDisplay hit');

    var idRequested = {id: request.query.id};
    console.log(idRequested);
    var results = [];

    pg.connect(connectionString, function(error, client) {

        var requestedAddresses = client.query("SELECT * FROM addresses WHERE user_id = ($1)", [idRequested.id]);

        requestedAddresses.on('row', function(row) {
            results.push(row);
        });

        requestedAddresses.on('end', function() {
            client.end();
            return response.json(results);
        })
    })
});

router.get('/getOrders', function(request, response) {

    var requestInfo = {id: request.query.id,
                        beginningDate: request.query.beginningDate,
                        endingDate: request.query.endingDate};
    console.log(requestInfo);
    var results = [];

    pg.connect(connectionString, function(error, client) {

        var requestedOrderTable = client.query("SELECT * FROM users JOIN orders ON users.id = orders.user_id JOIN addresses ON orders.ship_address_id = addresses.address_id WHERE orders.user_id = ($1) AND orders.order_date BETWEEN ($2) AND ($3)", [requestInfo.id, requestInfo.beginningDate, requestInfo.endingDate]);

        requestedOrderTable.on('row', function(row) {
            results.push(row);
        });

        requestedOrderTable.on('end', function() {
            client.end();
            return response.json(results);
        })

    })
});


module.exports = router;