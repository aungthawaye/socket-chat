/**
 * AUTHOR   : Aung Thaw Aye
 * EMAIL    : aungthawaye@gnomesys.com
 */

/*
    Model for FC_SUBSCRIBE http request.
*/

"use strict";

const common_model = require("../common_model");
const error = require("../../error");
const messages = require("../../messages");

const CommonMessages = messages.CommonMessages;
const ApplicationError = error.ApplicationError;

function FcSubscribeRequest(data) {
    this.data = data || {};
    // This object's JSON is as follow :
    /*
        {
            userId: "theuserid",
            status: "O"
        }
        
        'status' must be one of 
            O : Online
            F : Offline
            H : Hidden
    */
}

// Inherits from CommonModel
FcSubscribeRequest.prototype = new common_model.CommonModel();

// Validate whether user passed the required data for this object.
FcSubscribeRequest.prototype.validate = function () {
    if (this.data.userId === undefined
        || this.data.userId === null
        || this.data.status === undefined
        || (this.data.status !== "O" 
            && this.data.status !== "F" 
            && this.data.status !== "H")) {
            
        // Found some properties are missing or values are invalid.

        throw new ApplicationError({
            errorCode: CommonMessages.ERROR_INVALID_VALUE.code,
            errorMessage: CommonMessages.ERROR_INVALID_VALUE.message
        });
    }
}

exports.FcSubscribeRequest = FcSubscribeRequest;

