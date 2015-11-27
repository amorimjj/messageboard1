(function(){

  'use strict';

  var SignUpCtrl = function($scope) {

    $scope.user = {};

    $scope.login = function() {
      console.log('sign up...'); 
    };

  }

  angular.module('messageboard1')
     .controller('SignUpCtrl', ['$scope', SignUpCtrl]);

})();
