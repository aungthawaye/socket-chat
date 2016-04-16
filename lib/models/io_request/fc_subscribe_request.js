/**
 * AUTHOR   : Aung Thaw Aye
 * EMAIL    : aungthawaye@gnomesys.com
 */

/*
    Model for FC_SUBSCRIBE http request.
*/
const model = require("../common_model.js");
const error = require("../../error");
const messages = require("../../messages.js");

const CommonMessages = messages.CommonMessages;
const ApplicationError = error.ApplicationError;

function FcSubscribeRequest(data) {
    this.data = data || {};
    // This object's JSON is as follow :
    /*
        {
            user_id: "theuserid",
            status: "O"
        }
        
        'status' must be one of 
            O : Online
            F : Offline
            H : Hidden
    */
}

// Inherits from CommonModel
FcSubscribeRequest.prototype = new model.CommonModel();

// Validate whether user passed the required data for this object.
FcSubscribeRequest.prototype.validate = function () {
    if (this.data.user_id == undefined
        || this.data.user_id == null
        || this.data.status == undefined
        || (this.data.status != "O" && this.data.status != "F" && this.data.status != "H")) {
            
        // Found some properties are missing or values are invalid.

        throw new ApplicationError({
            error_code: CommonMessages.ERROR_INVALID_VALUE.code,
            error_message: CommonMessages.ERROR_INVALID_VALUE.message
        });
    }
}

exports.FcSubscribeRequest = FcSubscribeRequest;

