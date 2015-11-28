"use strict";

const crypto = require('crypto');

let users = [];

let map = function(data, user) {
  user.id = data.id;
  user.email = data.email;
  user.name = data.name;
  user._password = data.password;
  return user;
}

let User = {

  id: 0, email: '', name: '',

  set password(password) {
    this._password = crypto.createHash('sha512').update(password).digest("hex");
  },

  findById: function (id, callback) {

    let found = false;

    users.forEach(function(user){
      if ( user.id === id )
        return found = user;
    });

    if ( ! found )
      return callback(true);

    callback(null,map(found, this));

  },

  findByEmail: function (email, callback) {

    let found = false;

    users.forEach(function(user){
      if ( user.email === email )
        return found = user;
    });

    if ( ! found )
      return callback(true);

    callback(null,map(found, this));

  },

  save : function(callback) {

    let self = this;
    let found = false;

    users.forEach(function(user){
      if ( user.email === self.email )
        return found = true;
    });

    if ( found )
      return callback({ message: 'user exists' });

    users.push({ id: users.length+1, email: this.email, name: this.name, password: this._password });
    callback();
  },

  isValidPassword: function(password) {
    return (this._password === crypto.createHash('sha512').update(password).digest("hex"));
  }
}

module.exports = User;
