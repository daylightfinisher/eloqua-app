var express 		= require('express');
var path 			= require('path');
var favicon 		= require('static-favicon');
var logger 			= require('morgan');
var cookieParser 	= require('cookie-parser');
var bodyParser 		= require('body-parser');

var routes 			= require('./routes/index');
var users 			= require('./routes/users');
var routes_livechatinc		= require('./routes/livechatinc_routes');
//var routes_eloqua 			= require('./routes/eloqua_routes');


var renderer 		 = require('./lib/route_rendering_middleware');

var app = express();
 
/*****************************************************************************
* Application Settings
****************************************************************************/
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(favicon());
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/users', users);
app.use('/apps/livechatinc', routes_livechatinc);
//app.use('/apps/eloqua', routes_eloqua);

 
module.exports = app;