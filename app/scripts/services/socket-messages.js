(function(){
  'use strict';

  var SocketMessages = function (socketFactory, $window) {

    var socketMessagesIo = io.connect('', { query: 'token=' + $window.sessionStorage.token || '' });

    var socketMessages = socketFactory({
      ioSocket: socketMessagesIo
    });

    return socketMessages;
  };

  angular.module('messageboard1')
     .factory('SocketMessages', ['socketFactory', '$window', SocketMessages]);

})();
