var graphsvc = require('graphsvc');
var express = require('express');

var env = process.env;
var app = graphsvc(env.NEO4J_URI, env.NEO4J_USERNAME, env.NEO4J_PASSWORD);

app.set('views', __dirname + '/webapp/views');
app.set('view engine', 'jade');
app.use('/', express.static(__dirname + '/webapp/public'));

app.all('/', function(req, res) {
  res.render('index', {});
});

app.all('/sample', function(req, res) {
  res.render('sample', {});
});

app.endpoint("block");
app.endpoint("address", {
  collectionName: "addresses"
});
app.endpoint("block.addresses", "address.blocks", "contains");

var port = process.env.PORT;

if(port) {
  app.listen(port, function() {
    console.log("Listening on " + port);
  });
} else {
  exports.app = app;
}

process.on('uncaughtException', function (err) {
    console.log(err);
});
