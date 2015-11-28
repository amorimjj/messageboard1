'use strict';

const
  environment = process.env.NODE_ENV || 'development',
  express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server),
  bodyParser = require('body-parser'),
  authentication = require('./api/infraestructure/authentication'),
  userRoute = require('./api/routes/user'),
  messagesRoute = require('./api/routes/messages');

let appRoot = environment === 'production' ? 'dist' : 'app';

app.use(bodyParser.json());
app.use(express.static(appRoot));
app.use('/api', authentication.secure());
userRoute(app, authentication);
messagesRoute(app, io);

app.get('*', function(request, response, next) {
  response.sendFile(__dirname + '/' + appRoot + '/index.html');
});

io.set('authorization', authentication.socketSecure());

server.listen(process.env.PORT|| 8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
