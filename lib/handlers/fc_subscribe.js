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
            response_status     : "S",      // It will be one of 'S' success or 'F' failure
            response_code       : "F001",   // It will be null or blank, if status is 'F'
            response_message    : "The failure message will be here."
        }
        data        : {
            user_id     : "sample_user_id",     // It's the same user id sent from Client.
            socket_id   : "socketioclientid"    // It's the ID of socket.client.id
        }
    }

*/
const constants = require("../constants.js");
const logger = require("../logger.js").Logger;
const messages = require("../messages.js");
const fc_subscribe_request = require("../models/io_request/fc_subscribe_request.js");


const EventConstants = constants.EventConstants;
const CommonMessages = messages.CommonMessages;
const FcSubscribeRequest = fc_subscribe_request.FcSubscribeRequest;


exports.handle = function (socket, data) {

    logger.log("info", "*** executing fc_subscribe.handle method");
    logger.log("info", "*** incoming param : socket (%j) , data (%j)", socket, data, {});
    logger.log("info", "*** socket information : client id (%s)", socket.client.id, {});

    // To indicate this request is processed successfully or not
    var response_status = "S";
    var response_message = "";
    var response_code = "";

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
        response_status = "F"; // Failure
        response_message = error.error_message;
        response_code = error.error_code;

        // Inform about this back to client throught FS_SUBSCRIBE
        socket.emit(EventConstants.FS_SUBSCRIBE, {});

        return;
    }

    var socket_id = socket.client.id;
    var user_id = data.user_id;

    // TODO: To save client's information in Client Cache

    logger.log("info", "*** finish executing fc_subscribe.handle method");
}
