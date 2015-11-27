(function(){

  'use strict';

  var routesConfig = function ($routeProvider, $locationProvider) {

    var access = { user: 1 }

    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        access: access.user
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignUpCtrl',
        access: access.user
      })
      .when('/messages', {
        templateUrl: 'views/messages.html',
        controller: 'MessagesCtrl',
        access: access.user
      })
      .otherwise({
        redirectTo: '/login'
      });

    $locationProvider.html5Mode(true);
  }

  angular
    .module('messageboard1')
    .config(['$routeProvider', '$locationProvider', routesConfig])

})();
