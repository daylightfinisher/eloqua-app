'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    passport = require('passport'),
    logger = require('mean-logger');
var http = require('http');
var https = require('https');
var fs = require('fs');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Initializing system variables
var config = require('./server/config/config');
var db = mongoose.connect(config.db);

// Bootstrap Models, Dependencies, Routes and the app as an express app
var app = require('./server/config/system/bootstrap')(passport, db);


var options = {
  key: fs.readFileSync('server/keys/localhost.private.pem'),
  cert: fs.readFileSync('server/keys/localhost.public.pem')
};


var httpServer = http.createServer(app);
var httpsServer =https.createServer(options, app);

// Start the app by listening on <port>, optional hostname
httpServer.listen(config.port, config.hostname);
httpsServer.listen(config.sslport, config.hostname);
console.log('Mean app started on port ' + config.port + ' (' + process.env.NODE_ENV + ')');

// Initializing logger
logger.init(app, passport, mongoose);

// Expose app
exports = module.exports = app;
