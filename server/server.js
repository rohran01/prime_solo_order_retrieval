var express = require('express');
var bodyParser = require('body-parser');

var api = require('./route/api')
var index = require('./route/index');


var app = express();

app.use(bodyParser.json());                                                 //What, exactly, are these doing?


app.use(express.static('server/public'));

app.use('/api', api);
app.use('/', index);


var server = app.listen(3000, function() {
    var port = server.address().port;
    console.log('Listening on port:', port);
});