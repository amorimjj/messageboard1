'use strict';

const Q = require('q'),
  Message = require('./../models/messages');

let getMessages = {

      'execute': function (id) {

          let defered = Q.defer();
          Message.find(function (err, data) {
                  if (err) return defered.reject(err);
                  defered.resolve(data);
              });

          return defered.promise;
      }
}

module.exports = getMessages;
