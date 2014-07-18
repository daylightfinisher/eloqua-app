'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    //crypto = require('crypto');
 

/**
 * User Schema
 */
var EloquaAppSchema = new Schema(
{
    name: {
        type: String,
        required: true,
    },
    InstanceId:
    {
        type: String,
        required: true,
        index: true
    }

});




mongoose.model('EloquaApp', EloquaAppSchema);
