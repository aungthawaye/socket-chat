/**
 * AUTHOR   : Aung Thaw Aye
 * EMAIL    : aungthawaye@gnomesys.com
 */

"use strict";

function CommonResponse(body) {
    this.response = {
        responseStatus: "",
        responseCode: "",
        responseMessage: ""
    };
    this.body = body || {};
}


CommonResponse.prototype.getResponse = function () {
    return this.response;
}

CommonResponse.prototype.setResponse = function (response) {
    this.response = response || {};
}

CommonResponse.prototype.getBody = function () {
    return this.body;
}

CommonResponse.prototype.setBody = function (body) {
    this.body = body || body;
}

exports.CommonResponse = CommonResponse;