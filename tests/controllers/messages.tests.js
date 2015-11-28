describe('Messages Controller Test', function() {

  var messages = [
    {"text":"message1","user":{"id":1,"name":"jota","email":"amorimjj@gmail.com"},"date":"2015-11-28T16:54:30.583Z"},
    {"text":"message2","user":{"id":1,"name":"jota","email":"amorimjj@gmail.com"},"date":"2015-11-28T17:54:30.583Z"},
    {"text":"message3","user":{"id":2,"name":"ik","email":"amorimik@gmail.com"},"date":"2015-11-29T17:54:30.583Z"}
  ];

  beforeEach(module('messageboard1'));

  describe('Messages Service interaction test', function() {

    var scope, Messages;

    beforeEach(function() {
      scope = {},
          Messages = {
            list: function() { return messages },
            post: function() {
              return {
                then: function() { }
              }
            }
          };
    });

    it('should create "messages" with response of service message', inject(function($controller) {
      $controller('MessagesCtrl', {$scope:scope, Messages: Messages });
      expect(scope.messages.length).toBe(3);
    }));

    it('should send new messages to service', inject(function($controller) {
      spyOn(Messages, 'post').and.callThrough();
      $controller('MessagesCtrl', {$scope:scope, Messages: Messages });
      scope.message = { text: 'testing' };
      scope.post();
      expect(Messages.post).toHaveBeenCalledWith(scope.message);
    }));
  });

  describe('Messages Socket interaction test', function() {

    var SocketMessages = {
      socket: {
        on: function() {}
      }
    }

    it('should create a listener to new message', inject(function($controller) {
      spyOn(SocketMessages.socket, 'on');
      $controller('MessagesCtrl', {$scope: {}, Messages: { list: function() { } }, SocketMessages: SocketMessages});
      expect(SocketMessages.socket.on).toHaveBeenCalledWith('message', jasmine.any(Function));
    }));
  });

});
