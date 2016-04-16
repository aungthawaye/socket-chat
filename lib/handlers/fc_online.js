/**
 * AUTHOR   : Aung Thaw Aye
 * EMAIL    : aungthawaye@gnomesys.com
 */

/*
  To handle FC_ONLINE event. When server receives this event, server will update
  client's current status to ONLINE. If server cannot find the client in the registered client list,
  then throw ERROR.

  handler method's param:

    socket  : the socketio's socket
    data    : the JSON object with following format.

      {
        user_id   : "youruseid",
        status    : "O"
      }

    status could be one of
      "O" : Online
      "F" : Offline
      "H" : Hidden
*/
exports.handle = function(socket, data) {
    console.console.log("handling FC_ONLINE for client : " + socket.client.id);
    // Update client's current status in Client Cache
}
