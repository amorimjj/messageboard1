(function(){
  'use strict';

  var ShowMessage = function () {

    return {
      restrict: 'AE',
      scope: {
        message: '='
      },
      template: 'Title: {{message.title}} Text: {{message.text}}'
    };
  };

  angular.module('messageboard1')
     .directive('showMessage', ShowMessage);

})();
