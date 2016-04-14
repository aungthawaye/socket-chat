/*
  To handle incoming FC_REGISTER event. Client must pass user_id in 'data'.

  socket : the socket.io's Socket
  data : the JSON object with following format.

        {
          user_id : "sample_user_id"
          status : "O"
        }

  status could be one of
    "O" : Online
    "F" : Offline
    "H" : Hidden
*/
exports.handle = function(socket, data){
  console.log('handling FC_SUBSCRIBE for client : ' + socket.client.id);
  console.log('subscribed client with user_id : ' + data.user_id + ' and status : ' + data.status);
}
