module.exports = async (server, app) => {
  const io = require('socket.io')(server);
  let users = {};
  let clients = {};

  io.sockets.on('connection', function(socket) {
    console.log('connection', socket.id);


    socket.on('disconnect', function() {
      console.log('disconnect', socket.id);
      // removing user from var users
      // warning: socket by socket, and if last
      // socket is closed, remove whole user section
      if (clients[socket.id]) {
        const userId = clients[socket.id];
        if (users[userId] && users[userId].has(socket.id)) {
          users[userId].delete(socket.id);
          if (!users[userId].size) {
            delete users[userId];
          }
        }
        delete clients[socket.id];
      }
    });

    socket.on('typing', function(msg){
      let _dat = msg.toString().trim();
      let _response = JSON.parse(_dat);
      if (_response.colleagueId && users[_response.colleagueId]) { // emitting to single user declared
        for (let socketId of users[_response.colleagueId]) {
          if (io.sockets.connected[socketId]) {
            io.sockets.connected[socketId].emit('typing', _dat);
          }
        }
      }
    });

    socket.on('is_not_typing', function(msg){
      let _dat = msg.toString().trim();
      let _response = JSON.parse(_dat);
      if (_response.colleagueId && users[_response.colleagueId]) { // emitting to single user declared
        for (let socketId of users[_response.colleagueId]) {
          if (io.sockets.connected[socketId]) {
            io.sockets.connected[socketId].emit('is_not_typing', _dat);
          }
        }
      }
    });

    socket.on('unread_conversation_count', function(msg){
      let _dat = msg.toString().trim();
      let _response = JSON.parse(_dat);
      if (_response.userId && users[_response.userId]) { // emitting to single user declared
        for (let socketId of users[_response.userId]) {
          if (io.sockets.connected[socketId]) {
            io.sockets.connected[socketId].emit('unread_conversation_count', _dat);
          }
        }
      }
    });

    socket.on('conversation_add_message', function(msg) {
      const _dat = msg.toString().trim();
      const _response = JSON.parse(_dat);
      if (_response.colleagueId) { // emitting to single user declared
        if (users[_response.colleagueId]) {
          for (let socketId of users[_response.colleagueId]) {
            if (io.sockets.connected[socketId]) {
              io.sockets.connected[socketId].emit('new_message', _dat);
              io.sockets.connected[socketId].emit('unread_messages', _dat);
            }
          }
        }
      }
    });

  });
  app.socketClients = users;
  app.io = io; // important for use inside controller actions as req.app.io.sockets.connected[socketId].emit('tx', {key:"value"});
};
