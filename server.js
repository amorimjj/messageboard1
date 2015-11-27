'use strict';

const express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server),
  bodyParser = require('body-parser'),
  authentication = require('./api/infraestructure/authentication'),
  userRoute = require('./api/routes/user'),
  messagesRoute = require('./api/routes/messages');

app.use(bodyParser.json());
app.use(express.static('app'));
app.use('/api', authentication.secure());
userRoute(app, authentication);
messagesRoute(app, io);

app.get('*', function(request, response, next) {
  response.sendFile(__dirname + '/app/index.html');
});

io.set('authorization', authentication.socketSecure());

server.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
