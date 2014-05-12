var express 	 = require('express'),
db 				 = {},
app 			 = express.createServer(),
service_document = require('./lib/service_document'),
middle 			 = require('./lib/route_db_middleware'),
renderer 		 = require('./lib/route_rendering_middleware'),
port 			 = process.env.PORT || 8080;
 
/*****************************************************************************
* Application Settings
****************************************************************************/
app.configure(function() 
{
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.logger());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.errorHandler({ showStack: true, dumpExceptions: true }));
	app.use(express.static(__dirname + '/public'));
});
 
/*****************************************************************************
* Middleware Endpoints
****************************************************************************/
app.post('/components/create/:guid', middle.createInstance(db), function (req, res) 
{ 
	res.send(req.message); 
});
 
app.post('/components/configure/:guid?', middle.configureInstance(db), function (req, res) 
{ 
	res.send(req.message); 
});
 
app.del('/components/remove/:guid?', middle.removeInstance(db), function (req, res) 
{ 
	res.send(req.message); 
});
 
app.get('/components/preview/:guid?', middle.previewInstance(db), function (req, res) 
{ 
	res.send(req.message); 
});
 
app.get('/components/render/:guid?', middle.renderInstance(db), function (req, res) 
{
	res.send(req.message);
});
 
/*****************************************************************************
* Non Middleware Endpoints
****************************************************************************/
app.get('/', function (req, res) 
{
	res.send(service_document);
});
 
app.get('/service_document', function (req, res) 
{
	res.send(service_document);
});
 
app.listen(port, function() 
{ 
	console.log("Listening on " + port); 
});