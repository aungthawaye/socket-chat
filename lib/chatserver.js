const express     = require ('express');
const http        = require ('http');
const socketio    = require ('socket.io');
const constants   = require ('./constants.js');
const handlers    = require ('./handlers/handlers.js');

const NetConstants      = constants.NetConstants;
const UrlPathConstants  = constants.UrlPathConstants;
const EventConstants    = constants.EventConstants;

/* To initialize all the configurations and start the server */
exports.startChatServer = function(){
  // Initialize express, http and socket.io
  var app           = express();
  var http_server   = http.Server(app);
  var io            = socketio(http_server);

  // Map the URL to express
  app.get(UrlPathConstants.HOME_PAGE, function(req, res){
    res.send("hello");
  });

  io.on(EventConstants.IO_CONNECTION, function(socket){
    console.log("incoming connection from client id : " + socket.client.id);

    // Handle network events
    socket.on(EventConstants.IO_DISCONNECT, function(){
      console.log("client id [" + socket.client.id + "] has disconnected.");
    });

    // Handle application related events
    socket.on(EventConstants.FC_REGISTER, function(data){
      handlers.handleRegister(socket, data);
    });
  });

  http_server.listen(NetConstants.SERVER_PORT, function(){
    console.log('http server listening on *:3000');
  });
}
