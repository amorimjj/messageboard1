'use strict';

const Q = require( 'q'),
  crypto = require('crypto'),
  User = require('./../models/users');

let createUser = {

  'execute': function (data) {

    User.name = data.name;
    User.email = data.email;
    User.password = data.password;

    let defered = Q.defer();
    User.save(function (err, data) {
      if (err) defered.reject(err);
      defered.resolve(data);
    });
    return defered.promise;
  }
}

module.exports = createUser;
