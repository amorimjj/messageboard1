(function(){
  'use strict';

  var SocketMessages = function (socketFactory, $window) {

    var socketMessages;

    var startSocketMessages = function() {

      var socketMessagesIo = io.connect('', { query: 'token=' + $window.sessionStorage.token || '', 'forceNew':true });

      socketMessages = socketFactory({
        ioSocket: socketMessagesIo
      });
    };

    var getSocketMessages = function() {
      if ( ! socketMessages )
        startSocketMessages();

      return socketMessages;
    };

    var socketService = {

      get socket() {
        return getSocketMessages();
      },

      close: function() {
        if ( ! socketMessages )
          return;

        socketMessages = null;
      }
    };

    return socketService;
  };

  angular.module('messageboard1')
     .factory('SocketMessages', ['socketFactory', '$window', SocketMessages]);

})();
