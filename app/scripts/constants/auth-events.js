(function () {

  'use strict';

  var AUTH_EVENTS = {
    notAuthorized: 1,
    logout: 2,
    loginSuccess: 4,
  };


  angular.module('messageboard1')
    .constant('AUTH_EVENTS', AUTH_EVENTS);

})();
