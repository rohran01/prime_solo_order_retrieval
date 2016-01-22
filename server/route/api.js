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

router.get('/addressDisplay', function(request, response) {
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


module.exports = router;