const express     = require ('express');
const http        = require ('http');
const socketio    = require ('socket.io');
const constants   = require ('./constants.js');
const handlers    = require ('./handlers/handlers.js');

const NetConstants      = constants.NetConstants;
const DirConstants      = constants.DirConstants;
const PageConstants     = constants.PageConstants;
const UrlPathConstants  = constants.UrlPathConstants;
const EventConstants    = constants.EventConstants;

/* To initialize all the configurations and start the server */
exports.start = function(){
  // Initialize express, http and socket.io
  var app           = express();
  var http_server   = http.Server(app);
  var io            = socketio(http_server);

  // Map the URL to express
  app.get(UrlPathConstants.HOME_PAGE, function(req, res){
    res.sendFile(PageConstants.HTML_HOME_PAGE);
  });

  io.on(EventConstants.IO_CONNECTION, function(socket){
    console.log("incoming connection from client id : " + socket.client.id);

    // Handle network events
    socket.on(EventConstants.IO_DISCONNECT, function(){
      console.log("client id [" + socket.client.id + "] has disconnected.");
      handlers.io_disconnect(socket);
    });

    // Handle application related events
    socket.on(EventConstants.FC_SUBSCRIBE, function(data){
      console.log("client id[" + socket.client.id + "] has requested FC_SUBSCRIBE.")
      handlers.fc_subscribe(socket, data);
    });
  });

  http_server.listen(NetConstants.SERVER_PORT, function(){
    console.log('chat server listening on *:3365');
  });
}
