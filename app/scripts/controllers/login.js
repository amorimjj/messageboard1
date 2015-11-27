(function(){

  'use strict';

  var LoginCtrl = function($scope, Auth, AUTH_EVENTS) {

      $scope.user = {};

      $scope.login = function() {

        Auth.login($scope.user.email, $scope.user.password).then(
          function() {
            $scope.$emit(AUTH_EVENTS.loginSuccess);
          },
          function(err){
            console.log('bad', err);
          });
      };

  }

  angular.module('messageboard1')
     .controller('LoginCtrl', ['$scope', 'Auth', 'AUTH_EVENTS', LoginCtrl]);

})();
