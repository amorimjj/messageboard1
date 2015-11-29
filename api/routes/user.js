'use strict';

const getUserByEmail= require('./../lib/queries/get-user-by-email'),
  createUser= require('./../lib/commands/create-user');

let user = function(app, authentication) {

  app.post('/authenticate', function (req, res) {

    let sendInvalidCredentials = function() {
      return res.status(403).json({ message: 'invalid credentials'});
    };

    getUserByEmail
      .execute(req.body.email)
      .then(function(u){

        if ( ! u.isValidPassword(req.body.password) )
          return sendInvalidCredentials();

        let token = authentication.sign({ id: u.id });
        res.json({ message: 'sucess', token: token, id: u.id});
      }, sendInvalidCredentials);

  });

  app.get('/api/user/me', function(req, res){
    res.json(req.user);
  });

  app.post('/api/user/', function(req, res){
    createUser
      .execute(req.body)
      .then(function(u){
        res.status(201).json({ message: 'created'});
      }, function(err){
        return res.status(400).json(err);
      });
  });

};

module.exports = user;
