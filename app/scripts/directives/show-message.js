(function(){
  'use strict';

  var ShowMessage = function () {

    return {
      restrict: 'AE',
      scope: {
        message: '='
      },
      template: 'User: {{message.user.email}} Text: {{message.text}}'
    };
  };

  angular.module('messageboard1')
     .directive('showMessage', ShowMessage);

})();
