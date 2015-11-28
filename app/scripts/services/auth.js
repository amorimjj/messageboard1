(function(){
  'use strict';

  var Auth = function ($resource, $window) {

    var resource = $resource('/authenticate',
      null, {
        login: {method:'POST'}
      });

    return {
      login: function(email, password) {
        return resource.login({email: email, password: password})
          .$promise
          .then(function(resp) {
            $window.sessionStorage.token = resp.token;
          });
      }
    };
  };

  angular.module('messageboard1')
     .service('Auth', ['$resource', '$window', Auth]);

})();
