describe('Messages Controller Test', function() {

  var messages = [
    {"text":"message1","user":{"id":1,"name":"jota","email":"amorimjj@gmail.com"},"date":"2015-11-28T16:54:30.583Z"},
    {"text":"message2","user":{"id":1,"name":"jota","email":"amorimjj@gmail.com"},"date":"2015-11-28T17:54:30.583Z"},
    {"text":"message3","user":{"id":2,"name":"ik","email":"amorimik@gmail.com"},"date":"2015-11-29T17:54:30.583Z"}
  ];

  beforeEach(module('messageboard1'));


  describe('Messages Controller Test', function() {

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

    /*it('should send new messages to service', inject(function($controller) {
      $controller('MessagesCtrl', {$scope:scope, Messages: Messages });
      spyOn(Messages, 'post');
      scope.post();
      expect(Messages.post).toHaveBeenCalled();
    }));*/
  });
  /*var friends = element.all(by.repeater('friend in friends'));

  it('Shouldnt fail', function() {
    expect(1).toBe(0);
  });

  it('Should pass', function() {
    expect(1).toBe(1);
  });*/

});
