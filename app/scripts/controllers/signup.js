(function(){

  'use strict';

  var SignUpCtrl = function($scope, User, AUTH_EVENTS) {

    $scope.user = {};

    $scope.create = function() {

      $scope.errorMessage = '';

      User.add($scope.user).then(
        function() {
          $scope.$emit(AUTH_EVENTS.accountCreated);
        },
        function(err){

          if ( err.status === 400 )
            return $scope.errorMessage = 'Email already in use';

          $scope.errorMessage = 'Try again in a few minutes';
        });
    };

  };

  angular.module('messageboard1')
     .controller('SignUpCtrl', ['$scope', 'User', 'AUTH_EVENTS', SignUpCtrl]);

})();
