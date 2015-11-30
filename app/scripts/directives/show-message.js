/*jshint multistr: true */
(function(){
  'use strict';

  var ShowMessage = function ($window) {

    return {
      restrict: 'AE',
      scope: {
        message: '='
      },
      link: function (scope, element, window) {
        scope.collapsed = true;
        scope.message.owner = ($window.sessionStorage.id == scope.message.user.id);
      },
      template: '<div class="image-cropper"> \
            <img gravatar-src="message.user.email" gravatar-size="100"> \
          </div>\
          <div ng-click="collapsed=!collapsed" class="text"> \
            <p ng-class="{ closed: collapsed }">{{message.text}}</p> \
            <span class="by">{{message.user.name}},</span> \
            <span class="time" am-time-ago="message.date"></span> \
          </div>'
    };
  };

  angular.module('messageboard1')
     .directive('showMessage', ['$window', ShowMessage]);

})();
