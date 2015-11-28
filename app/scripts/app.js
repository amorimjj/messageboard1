(function(){

  'use strict';

  var authInterceptor = function ($q, $window, $rootScope, AUTH_EVENTS) {
    return {
      request: function (config) {
        config.headers = config.headers || {};
        if ($window.sessionStorage.token)
          config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;

        return config;
      },

      responseError: function (response) {

        if (response.status === 401)
          $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);

        return response || $q.when(response);
      }
    };
  };

  var appConfig = function ($routeProvider, $httpProvider, $locationProvider) {

    $httpProvider.interceptors.push(['$q', '$window', '$rootScope', 'AUTH_EVENTS', authInterceptor]);

    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignUpCtrl'
      })
      .when('/messages', {
        templateUrl: 'views/messages.html',
        controller: 'MessagesCtrl'
      })
      .otherwise({
        redirectTo: '/login'
      });

    $locationProvider.html5Mode(true);
  };

  var runner = function($rootScope, $location, $window, User, AUTH_EVENTS) {

    User.me()
      .then(function(){
        $location.path('/messages');
      });

    var deleteSession = function() {
      if ($window.sessionStorage.token)
        delete $window.sessionStorage.token;

      $location.path('/login');
    };

    $rootScope.$on(AUTH_EVENTS.loginSuccess, function() {
        $location.path('/messages');
    });

    $rootScope.$on(AUTH_EVENTS.notAuthorized, deleteSession);
    $rootScope.$on(AUTH_EVENTS.logout, deleteSession);

  };

  angular
    .module('messageboard1')
    .config(['$routeProvider', '$httpProvider', '$locationProvider', appConfig])
    .run(['$rootScope', '$location', '$window', 'User', 'AUTH_EVENTS', runner]);

})();
