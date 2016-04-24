/**
 * AUTHOR   : Aung Thaw Aye
 * EMAIL    : aungthawaye@gnomesys.com
 */

/*
    Client to interface with Redis.
*/

"use strict";

const redis = require("redis");
const constants = require("../constants");

const NetConstants = constants.NetConstants;
const store = redis.createClient({ "host": NetConstants.REDIS_HOSTNAME, "port": NetConstants.REDIS_PORT });
const sub = redis.createClient(NetConstants.REDIS_PORT, NetConstants.REDIS_HOSTNAME);
const pub = redis.createClient(NetConstants.REDIS_PORT, NetConstants.REDIS_HOSTNAME);

exports.RedisService = {
    store: store,
    pub: pub,
    sub: sub
}