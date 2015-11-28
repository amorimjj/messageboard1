(function(){

  'use strict';

  var LoginCtrl = function($scope, Auth, User, AUTH_EVENTS) {

      $scope.user = {};

      User.me()
        .then(function(){
          $scope.$emit(AUTH_EVENTS.loginSuccess);
        });

      $scope.login = function() {

        Auth.login($scope.user.email, $scope.user.password).then(
          function() {
            $scope.$emit(AUTH_EVENTS.loginSuccess);
          },
          function(err){
            console.log('bad', err);
          });
      };

  };

  angular.module('messageboard1')
     .controller('LoginCtrl', ['$scope', 'Auth', 'User', 'AUTH_EVENTS', LoginCtrl]);

})();
