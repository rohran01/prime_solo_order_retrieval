var express = require('express');
var path = require('path');

var router = express.Router();

router.get('/', function(request,response) {
    var pathRoute = path.join(__dirname, '../public/views/index.html');
    response.sendFile(pathRoute);
});

router.get('/*', function(req, res, next){
    var url = req.originalUrl;
    if (url.split('.').length > 1){
        next();
    } else {
        // handles angular urls. i.e. anything without a '.' in the url (so static files aren't handled)
        console.log('Catch all handled url: ' + url);
        res.redirect('/#' + url);
    }
});

module.exports = router;