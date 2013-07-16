var express = require('express');


var app = express();

app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.logger());
});

var port = process.env.PORT || 5000;

app.use(express.static(__dirname));

app.listen(port);
console.log('Listening on port '+port+'...');