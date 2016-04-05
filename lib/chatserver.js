const express     = require ('express');
const http        = require ('http');
const socketio    = require ('socket.io');
const constants   = require ('./constants.js');

/* To initialize all the configurations and start the server */
exports.startChatServer = function(){
  // Initialize express, http and socket.io
  var app           = express();
  var http_server   = http.Server(app);
  var io            = socketio(http_server);

  // Map the URL to express
  app.get(constants.UrlPathConstants.HOME_PAGE, function(req, res){
    console.log("accessing URL [" + constants.UrlPathConstants.HOME_PAGE + "].");
    res.send("hello");
  });

  io.on('connection', function(socket){
    console.log("incoming connection from client id : " + socket.client.id);

    // Handle events
    socket.on('disconnect', function(){
      console.log("client id [" + socket.client.id + "] has disconnected.");
    });
  });

  http_server.listen(3000, function(){
    console.log('http server listening on *:3000');
  });
}
