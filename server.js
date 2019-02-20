var httpProxy = require("http-proxy");
var express = require("express");
var path = require("path");

var apiProxy = httpProxy.createServer({
  target: "http://localhost:8157"
});

var webProxy = httpProxy.createServer({
  target: "http://localhost:8000"
});

var app = express();
//app.use(express.static('public'));

app.all("/api/*", function(req, res) {
  req.url = req.url.substring(4);
  return apiProxy.web(req, res);
});

app.all("/*", function(req, res, next) {
  return webProxy.web(req, res);
  //res.sendFile(path.resolve(path.join('./public/', 'index.html')));
});

app.listen(8008);
console.log("Listening on http://0.0.0.0:8008");
