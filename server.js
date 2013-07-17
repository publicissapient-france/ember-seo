var express = require('express');
var phantom = require('node-phantom');
var port = process.env.PORT || 5000;


var app = express();

app.configure(function () {
    // disable layout
  app.set("view options", {layout: false});
  //app.set('views', __dirname);
 
  // make a custom html template
  app.use(express.static(__dirname));
  app.engine('html', require('ejs').renderFile);
});

app.get('/', function(req, res){
  // If there is _escaped_fragment_ option, it means we have to
  // generate the static HTML that should normally return the Javascript
  if(typeof(req.query._escaped_fragment_) !== "undefined") {
  	console.log('Bot : '+req.query._escaped_fragment_);
    phantom.create(function(err, ph) {
      return ph.createPage(function(err, page) {
        // We open phantomJS at the proper page.
        return page.open("https://localhost:3000/#!" + req.query._escaped_fragment_, function(status) {
          return page.evaluate((function() {
            // We grab the content inside <html> tag...
            return document.getElementsByTagName('html')[0].innerHTML;
          }), function(err, result) {
            // ... and we send it to the client.
            res.send(result);
            return ph.exit();
          });
        });
      });
    });
  }
  else{
    // If there is no _escaped_fragment_, we return the normal index template.
    console.log('Bot : '+req.query._escaped_fragment_);
    res.render('index.html');
  }
});

app.listen(port);
console.log('Listening on port '+port+'...');
