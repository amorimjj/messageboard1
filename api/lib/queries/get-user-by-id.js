'use strict';

const Q = require('q'),
  User = require('./../models/users');

let getUserById = {

      'execute': function (id) {

          let defered = Q.defer();
          User.findById(id, function (err, data) {
                  if (err) return defered.reject(err);
                  defered.resolve(data);
              });

          return defered.promise;
      }
}

module.exports = getUserById;
