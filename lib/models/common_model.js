/**
 * AUTHOR   : Aung Thaw Aye
 * EMAIL    : aungthawaye@gnomesys.com
 */

/*
    The parent class of all the models. It has get & set methods to populate
    data.
*/
"use strict"

function CommonModel(data) {
    this.data = data || {};
}

CommonModel.prototype.get = function(field) {
    return this.data[field];
}

CommonModel.prototype.set = function(field, value) {
    this.data[field] = value;
}

exports.CommonModel = CommonModel;
