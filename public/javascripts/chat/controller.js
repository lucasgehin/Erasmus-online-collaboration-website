(function() {
  $(document).ready(function() {
    var msgtpl, socket;
    socket = io.connect('/chat');
    msgtpl = $('#msgtpl').html();
    $('#msgtpl').remove();
    socket.on('connect', function() {
      socket.emit('get_userlist', null, null);
      return $('#message').focus();
    });
    socket.on('disconnect', function() {
      return socket.emit('disconnect_chat', null, null);
    });
    $('#form').submit(function(event) {
      event.preventDefault();
      socket.emit('newmsg', { message: $('#message').val() });
      $('#message').val('');
      return $('#message').focus();
    });
    socket.on('newmsge', function(message) {
      return $('#messages').append('<div class="message">' + Mustache.render(msgtpl, message) + '</div>');
    });
    socket.on('newusr', function(user) {
      var img;
      img = '<img src="/images/Country/' + user.country.name + '.jpg" alt="' + user.country.name + '" /> ';
      $('#users').append('<div id="' + user.username + '">');
      $('#users').append(img);
      $('#users').append(user.username);
      $('#users').append('<br />');
      return $('#users').append('</div>');
    });
    return socket.on('disusr', function(user) {
      return $('#' + user.username).remove();
    });
  });

}).call(this);
