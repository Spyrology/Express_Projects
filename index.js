'use strict';

var express = require('express'),
    port = 3000;

var auth = require('basic-auth');

var app = express();

function authenticate (user, password) {
  return user === "admin" && password == "secret";
}

function basic (req, res, next) {
  var user = auth(req);
  if (user !== undefined && authenticate(user.name, user.pass)) {
    return next();
  } else {
    res.status(401).set({
      'WWW-Authenticate': 'Basic realm="localhost"'
    }).send();
  }
}

app.get('/newAuth', basic, function (req, res) {
  res.send("you made it past basic-auth");
});

app.get('/login', function (req, res) {
  console.log("arrived A");
});

app.get('/', authenticate, function(req, res) {
  res.send("hello, " + req.session.user + '.');
  console.log('arrived B');
});

app.listen(port, function(){
  console.log('listening on port ' + port);
});