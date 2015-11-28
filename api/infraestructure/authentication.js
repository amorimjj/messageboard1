'use strict';

const expressJwt = require('express-jwt'),
  jwt = require('jsonwebtoken'),
  socketioJwt = require('socketio-jwt'),
  getUserById = require('./../lib/queries/get-user-by-id');

const secret = '907a55f20429ab905de38e68428aa45c7d30c0b0';

var fetchUser = function(req,res,next) {

    let sendUserNotFound = function () {
      res.status(401).send('No authorized user found');
    };

    if ( ! req.user)
      return sendUserNotFound();

    getUserById
      .execute(req.user.id)
      .then(function(user){
        req.user = user;
        next();
      }, sendUserNotFound );
};

exports.secure = function() {

    var middleware = expressJwt({secret: secret});

    return function (req, res, next)
    {
        middleware(req, res, function() {
            fetchUser(req, res, next);
        });
    };
};

exports.sign = function(user) {
    return jwt.sign(user, secret, { expiresInMinutes: 60*5 });
};

exports.socketSecure = function() {
  return socketioJwt.authorize({
    secret: secret,
    handshake: true
  })
};
