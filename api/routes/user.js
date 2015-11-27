'use strict';

let user = function(app, authentication) {

  app.post('/authenticate', function (req, res) {

    if ( req.body.email !== req.body.password ) {
      console.log('bad', req.body.email, req.body.password)
      return res.status(403).json({ message: 'invalid credentials'});
    }

    let user = { id: 1, email: 'amorimjj@gmail.com'};
    var token = authentication.sign(user);

    res.json({ message: 'sucess', token: token});

  });

  app.get('/api/user/me', function(req, res){
    res.json(req.user);
  });

};

module.exports = user;
