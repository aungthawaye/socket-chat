/**
 * AUTHOR   : Aung Thaw Aye
 * EMAIL    : aungthawaye@gnomesys.com
 */

/*
    Custom application error class.
*/


"use strict";

const util = require("util");

function ApplicationError(settings) {
    Error.call(this); //super constructor
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.errorCode = settings.errorCode || "";
    this.errorMessage = settings.errorMessage || "";
}

// inherit from Error
util.inherits(ApplicationError, Error);

exports.ApplicationError = ApplicationError;
