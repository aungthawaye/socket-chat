/**
 * AUTHOR   : Aung Thaw Aye
 * EMAIL    : aungthawaye@gnomesys.com
 */

"use strict";

const path = require("path");
const os = require("os");

// Root directory of this application
const ROOT_DIR = path.normalize(__dirname + "/../");

exports.NetConstants = {
    SERVER_PORT: 3366,
    REDIS_HOSTNAME: "localhost",
    REDIS_PORT: 6379,
    CHAT_CHANNEL: "chat"
}

exports.DirConstants = {
    ROOT_DIR: ROOT_DIR,
    HTML_DIR: ROOT_DIR + "html",
    LOG_DIR: os.homedir() + "/log/nodejs/socket-chat/server.log"
}

exports.PageConstants = {
    HTML_HOME_PAGE: ROOT_DIR + "html" + "/index.html"
}

exports.UrlPathConstants = {
    /*
      URL path names:
    */
    HOME_PAGE: "/",
    CHAT_ROOM_PAGE: "/room"
}

exports.EventConstants = {
    /*
      Followings are socketio related event names
    */
    IO_CONNECTION: "connection",
    IO_DISCONNECT: "disconnect",
    
    /*
      Followings are for redis related events
    */
    REDIS_MESSAGE: "message",

    /*
      Followings are the events sent from Client
    */
    FC_SUBSCRIBE: "fc_subscribe", // when client subscribes for chat
    FC_UNSUBSCRIBE: "fc_unsubscribe", // when client unsubscribes for chat
    FC_JOIN_ROOM: "fc_join_room", // when client joins chat room
    FC_LEAVE_ROOM: "fc_leave_room", // when client wants to leave current chat room
    FC_SEND_MSG: "fc_send_msg", // when client sends message to another client
    FC_BROADCAST_MSG: "fc_broadcast_msg", // when client broadcast message to other clients in chat room
    FC_ONLINE: "fc_online", // when client comes online
    FC_OFFLINE: "fc_offline", // when client goes offline

    FS_SUBSCRIBE: "fs_subscribe", // to respond FC_SUBSCRIBE
    FS_UNSUBSCRIBE: "fs_unsubscribe", // to respond FC_UNSUBSCRIBE
    FS_JOIN_ROOM: "fs_join_room", // to respond FC_JOIN_ROOM
    FS_LEAVE_ROOM: "fs_leave_room", // to respond FC_LEAVE_ROOM
    FS_SEND_MSG: "fs_send_msg", //
    FS_BROADCAST_MSG: "fs_broadcast_msg", //
    FS_ONLINE: "fs_online", //
    FS_OFFLINE: "fs_offline", //
}
