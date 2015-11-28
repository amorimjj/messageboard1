(function(){
  'use strict';

  var User = function ($resource) {

    var resource = $resource('/api/user/:action', null,{
      get: {method:'GET', params:{action:'me'}},
    });

    return {
      me: function() {
        return resource.get().$promise;
      },
      add: function(user) {
        return resource.save(user).$promise;
      }
    };
  };

  angular.module('messageboard1')
     .service('User', ['$resource', User]);

})();
