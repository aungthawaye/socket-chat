/**
 * AUTHOR   : Aung Thaw Aye
 * EMAIL    : aungthawaye@gnomesys.com
 */

"use strict";

const constants = require("./constants");
const winston = require("winston");

const DirConstants = constants.DirConstants;
const logger = new(winston.Logger)({
    transports: [
        new(winston.transports.Console)(),
        new(winston.transports.File)({
            filename: DirConstants.LOG_DIR
        })
    ]
});
exports.Logger = logger
