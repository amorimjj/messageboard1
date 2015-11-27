(function(){
  'use strict';

  var Messages = function ($resource) {

    var resource = $resource('/api/messages');

    return {
      list: function() {
        return resource.query();
      },

      post: function(msg) {
        return resource.save(msg).$promise;
      }
    }
  };

  angular.module('messageboard1')
     .service('Messages', ['$resource', Messages]);

})();
