'use strict';

let messages = function(app, io) {

  let list = [];

  app.get('/api/messages', function(req, res){
    res.json(list);
  });

  app.post('/api/messages', function(req, res) {

    let msg = { title: req.body.title, text: req.body.text, user: { id: req.user.id, name: req.user.name } };
    list.push(msg);
    io.emit('message', msg);
    res.status(201).json({ message: 'created'});

  });

};

module.exports = messages;
