(function(){
  'use strict';

  var User = function ($resource) {

    var resource = $resource('/api/user/me');

    return {
      me: function() {
        return resource.get().$promise;
      }
    }
  };

  angular.module('messageboard1')
     .service('User', ['$resource', User]);

})();
