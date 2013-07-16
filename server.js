var express = require('express');


var app = express();

app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.logger());
});

app.get('/', function(request, response) {
  res.send('index');
});

var port = process.env.PORT || 5000;

app.listen(port);
console.log('Listening on port '+port+'...');