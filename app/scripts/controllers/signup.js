(function(){

  'use strict';

  var SignUpCtrl = function($scope, User, AUTH_EVENTS) {

    $scope.user = {};

    $scope.create = function() {
      User.add($scope.user).then(
        function() {
          $scope.$emit(AUTH_EVENTS.loginSuccess);
        },
        function(err){
          console.log('bad', err);
        });
    };

  };

  angular.module('messageboard1')
     .controller('SignUpCtrl', ['$scope', 'User', 'AUTH_EVENTS', SignUpCtrl]);

})();
