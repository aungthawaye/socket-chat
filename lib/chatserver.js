/**
 * AUTHOR   : Aung Thaw Aye
 * EMAIL    : aungthawaye@gnomesys.com
 */


"use strict";

const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const redis = require("redis");
const socketio_redis = require('socket.io-redis')
const constants = require('./constants');
const handlers = require('./handlers/handlers');
const redis_service = require("./services/redis_service");

const NetConstants = constants.NetConstants;
const DirConstants = constants.DirConstants;
const PageConstants = constants.PageConstants;
const UrlPathConstants = constants.UrlPathConstants;
const EventConstants = constants.EventConstants;




/* To initialize all the configurations and start the server */
exports.start = function () {
    // Initialize express, http and socket.io
    var app = express();
    var httpServer = http.Server(app);
    var io = socketio(httpServer);

    var sub = redis_service.RedisService.sub;
    var pub = redis_service.RedisService.pub;


    var redisAdapter = socketio_redis({
        host: NetConstants.REDIS_HOSTNAME,
        port: NetConstants.REDIS_PORT,
        subClient: redis.createClient(NetConstants.REDIS_PORT, NetConstants.REDIS_HOSTNAME, { return_buffers: true }),
        pubClient: redis.createClient(NetConstants.REDIS_PORT, NetConstants.REDIS_HOSTNAME)
    });

    /* Redis subscriber client will subscribe 'chat' channel. */
    sub.subscribe(NetConstants.CHAT_CHANNEL, function (err) { });

    // Map the URL to express
    app.get(UrlPathConstants.HOME_PAGE, function (req, res) {
        res.sendFile(PageConstants.HTML_HOME_PAGE);
    });

    // Use redis for multiple node socketio servers.
    io.adapter(redisAdapter);

    io.on(EventConstants.IO_CONNECTION, function (socket) {

        console.log("incoming connection from client id : " + socket.client.id);

        // Handle network events
        socket.on(EventConstants.IO_DISCONNECT, function () {
            console.log("client id [" + socket.client.id + "] has disconnected.");
            handlers.io_disconnect(socket);
        });

        // Handle application related events
        socket.on(EventConstants.FC_SUBSCRIBE, function (data) {
            console.log("client id[" + socket.client.id + "] has requested FC_SUBSCRIBE.")

            var room = io.sockets.adapter.rooms['3366'];
            console.log("room : " + room);
            if (room)
                console.log("before : client count : " + io.sockets.adapter.rooms['3366'].length);
            else
                console.log("before : client count : no one in room");
            //handlers.fc_subscribe(socket, data);
            socket.join("3366");

            console.log("after : client count : " + io.sockets.adapter.rooms['3366'].length);
            /**
             * DEBUGGIN PURPOSE
             */
            socket.to("3365").emit("message", "3366 sends message to 3365.");
        });

        socket.on(EventConstants.FC_ONLINE, function (data) {

        });
    });

    /** 
     * Redis related events from pub/sub
     */
    sub.on(EventConstants.REDIS_MESSAGE, function (channel, data) {
        console.log("got message in channel : " + channel);


        var ns = io.of("/");
        for (var id in ns.connected) {
            console.log("client : " + id);
        }

        io.emit("message", data + " from " + redisAdapter.uid);
    });


    httpServer.listen(NetConstants.SERVER_PORT, function () {
        console.log('chat server listening on *:' + NetConstants.SERVER_PORT);
    });
}
