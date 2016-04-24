/**
 * AUTHOR   : Aung Thaw Aye
 * EMAIL    : aungthawaye@gnomesys.com
 */

/*
    To handle incoming FC_SUBSCRIBE event. Client must pass user_id in 'data'.

    socket  : the socket.io's Socket
    data    : the JSON object with following format.

    {
        user_id   : "sample_user_id"
        status    : "O"
    }

    status could be one of
        "O" : Online
        "F" : Offline
        "H" : Hidden
        
    For ref: please see "models/fc_subscribe_request.js"

    Server will response following data:

    {
        response    : {
            responseStatus     : "S",      // It will be one of 'S' success or 'F' failure
            responseCode       : "F001",   // It will be null or blank, if status is 'F'
            responseMessage    : "The failure message will be here."
        }
        data        : {
            userId     : "sample_user_id",     // It's the same user id sent from Client.
            socketId   : "socketioclientid"    // It's the ID of socket.client.id
        }
    }

*/

"use strict";

const constants = require("../constants");
const logger = require("../logger").Logger;
const messages = require("../messages");
const models = require("../models/models");
const redis_service = require("../services/redis_service");


const EventConstants = constants.EventConstants;
const CommonMessages = messages.CommonMessages;
const FcSubscribeRequest = models.FcSubscribeRequest;
const RedisService = redis_service.RedisService;


exports.handle = function (socket, data) {

    logger.log("info", "*** executing fc_subscribe.handle method");
    logger.log("info", "*** incoming param : socket (%j) , data (%j)", socket, data, {});
    logger.log("info", "*** socket information : client id (%s)", socket.client.id, {});

    // To indicate this request is processed successfully or not
    var responseStatus = "S";
    var responseMessage = "";
    var responseCode = "";

    // Verify data json is in correct format or not
    var request = new FcSubscribeRequest(data);

    logger.log("info", "*** request : (%j)", request, {});

    // Validate whether inputs are fine or not.
    try {
        request.validate();
    } catch (error) {
        logger.log("error", "*** error occurred : error (%j)", error, {});
        logger.log("info", "*** finish executing fc_subscribe.handle method");

        // Here error is simple. It is ApplicationError thrown from validate method.
        responseStatus = "F"; // Failure
        responseMessage = error.errorMessage;
        responseCode = error.errorCode;

        // Inform about this back to client throught FS_SUBSCRIBE
        socket.emit(EventConstants.FS_SUBSCRIBE, {});

        return;
    }

    var socketId = socket.client.id;
    var userId = data.userId;

    // TODO: To save client's information in Client Cache
    logger.log("info", "*** saving client info in redis for userId [" + userId + "]...");
    RedisService.save(userId, { "somedata": "somevalue" }, function (err, result) {
        console.log("inside callback : " + err + " " + result);
    });
    logger.log("info", "*** finish executing fc_subscribe.handle method");
}
