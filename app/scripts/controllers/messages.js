(function(){

  'use strict';

  var MessagesCtrl = function($scope, Messages, SocketMessages, AUTH_EVENTS) {

      $scope.message = {};
      $scope.messages = Messages.list();

      SocketMessages.on('message', function (message) {
        $scope.messages.push(message);
      });

      $scope.post = function() {
        Messages.post($scope.message)
        .then(function(){
          $scope.message = {};
        });
      };

      $scope.logout = function() {
        $scope.$emit(AUTH_EVENTS.logout);
      };

  }

  angular.module('messageboard1')
     .controller('MessagesCtrl', ['$scope', 'Messages', 'SocketMessages', 'AUTH_EVENTS', MessagesCtrl]);

})();
