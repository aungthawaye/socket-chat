/**
 * AUTHOR   : Aung Thaw Aye
 * EMAIL    : aungthawaye@gnomesys.com
 */

"use strict";

exports.handle = function(socket) {
    console.log("handling IO_DISCONNECT for client : " + socket.client.id);
}
