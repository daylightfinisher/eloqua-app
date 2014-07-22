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
    instanceid: 
    { 
        type: String, 
        unique: true,
        required: true
    },
    site:
    {
    	type: String
    },
    site_id:
    {
    	type: String
    },
    install_id:
    {
    	type: String
    },


    description: String
});




mongoose.model('EloquaApp', EloquaAppSchema);
