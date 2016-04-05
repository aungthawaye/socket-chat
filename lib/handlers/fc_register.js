/*
  To handle incoming FC_REGISTER event. Client must pass user_id in 'data'.

  socket : the socket.io's Socket
  data : the JSON object with following format.

        {
          user_id : "sample_user_id"
        }
*/
exports.handleRegister = function(socket, data){
  console.log('handling FC_REGISTER for client : ' + socket.client.id);
}
