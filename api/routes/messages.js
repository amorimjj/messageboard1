'use strict';

const getMessages= require('./../lib/queries/get-messages'),
  createMessage= require('./../lib/commands/create-message');

let messages = function(app, io) {

  let list = [];

  app.get('/api/messages', function(req, res){
    getMessages
      .execute()
      .then(function(messages) {
        res.json(messages);
      });
  });

  app.post('/api/messages', function(req, res) {

    createMessage
      .execute(req.body.text, req.user)
      .then(function(message){
        io.emit('message', message);
        res.status(201).json({ message: 'created'});
      });
  });

};

module.exports = messages;
