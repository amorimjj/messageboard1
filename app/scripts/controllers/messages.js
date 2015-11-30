(function(){

  'use strict';

  var MessagesCtrl = function($scope, Messages, SocketMessages, AUTH_EVENTS) {

      $scope.message = {};
      $scope.messages = Messages.list();
      $scope.hide = false;
      $scope.filter = {};

      SocketMessages.socket.on('message', function (message) {
        $scope.messages.push(message);
      });

      $scope.post = function() {
        Messages.post($scope.message)
        .then(function(){
          $scope.message = {};
        });
      };

      $scope.updateFilter = function() {

          if ( $scope.hide )
            return ($scope.filter = { owner: false });

          $scope.filter = {};
      };

      $scope.logout = function() {
        $scope.$emit(AUTH_EVENTS.logout);
      };

  };

  angular.module('messageboard1')
     .controller('MessagesCtrl', ['$scope', 'Messages', 'SocketMessages', 'AUTH_EVENTS', MessagesCtrl]);

})();
