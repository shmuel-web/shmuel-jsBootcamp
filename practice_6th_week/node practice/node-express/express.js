var express = require('express');
var app = express();

app.get('/*',function(req, res, returnParam) {
    var returnParam = ("<h2>"+req.params[0]+"</h2>");
    res.send("<h1>this app returns the url param</h1>" +
        "</br> "+returnParam);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});