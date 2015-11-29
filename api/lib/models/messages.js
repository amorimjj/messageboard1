"use strict";

let messages = [];

let Message = {

  user: {}, text: '',

  find: function (callback) {
    callback(null, messages.slice(0, 100));
  },

  save : function(callback) {
    let message = { text: this.text, user: { id: this.user.id, name: this.user.name, email: this.user.email }, date: new Date() };
    messages.unshift(message);
    callback(null, message);
  }
};

module.exports = Message;
