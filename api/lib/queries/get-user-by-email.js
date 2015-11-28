'use strict';

const Q = require('q'),
  User = require('./../models/users');

let getUserByEmail = {

      'execute': function (email) {

          let defered = Q.defer();
          User.findByEmail(email, function (err, data) {
            if (err) return defered.reject(err);
            defered.resolve(data);
          });

          return defered.promise;
      }
}

module.exports = getUserByEmail;
