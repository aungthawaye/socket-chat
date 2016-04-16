/**
 * AUTHOR   : Aung Thaw Aye
 * EMAIL    : aungthawaye@gnomesys.com
 */

exports.handle = function(socket) {
    console.log("handling IO_DISCONNECT for client : " + socket.client.id);
}
