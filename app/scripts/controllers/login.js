(function(){

  'use strict';

  var LoginCtrl = function($scope, Auth, User, AUTH_EVENTS) {

      $scope.user = {}, $scope.submitting = false;

      User.me()
        .then(function(){
          $scope.$emit(AUTH_EVENTS.loginSuccess);
        });

      $scope.login = function(form) {

        $scope.errorMessage = '', $scope.submitting = true;

        Auth.login($scope.user.email, $scope.user.password).then(
          function() {
            $scope.$emit(AUTH_EVENTS.loginSuccess);
          },
          function(err){
            $scope.submitting = false;

            if ( err.status === 403 )
              return $scope.errorMessage = 'Wrong email or password';

             $scope.errorMessage = 'Try again in a few minutes';
          });
      };

  };

  angular.module('messageboard1')
     .controller('LoginCtrl', ['$scope', 'Auth', 'User', 'AUTH_EVENTS', LoginCtrl]);

})();
