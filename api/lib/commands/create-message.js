'use strict';

const Q = require( 'q'),
  crypto = require('crypto'),
  Message = require('./../models/messages');

let createMessage = {

  'execute': function (message, user) {

    Message.text = message;
    Message.user = user;

    let defered = Q.defer();
    Message.save(function (err, message) {
      if (err) defered.reject(err);
      defered.resolve(message);
    });
    return defered.promise;
  }
}

module.exports = createMessage;
