var express = require('express');
var router  = express.Router();

var db 				 = {};
var service_document = require('../lib/service_document');
var middle 	= require('../lib/route_db_middleware');
/*****************************************************************************
* Middleware Endpoints
****************************************************************************/
router.post('/components/create/:guid', middle.createInstance(db), function (req, res) 
{ 
	res.send(req.message); 
});
 
router.get('/components/configure/:guid?', middle.configureInstance(db), function (req, res) 
{ 
	//res.send(req.message); 
	res.render('configpage', 
		{ 
			title: 'Config', 
			id : req.params.guid,
			assetId : req.query.assetId,
			contactId : req.query.contactId,
		});
});
 
router.get('/components/remove/:guid?', middle.removeInstance(db), function (req, res) 
{ 
	res.send(req.message); 
});
 
router.get('/components/preview/:guid?', middle.previewInstance(db), function (req, res) 
{ 
	res.render('preview', 
	{ 
		title: 'Preview', 
		id : req.params.guid,
		assetId : req.query.assetId,
		contactId : req.query.contactId,
		visitorId : req.query.visitorId,
	});
});
 
router.get('/components/render/:guid?', middle.renderInstance(db), function (req, res) 
{
	res.render('preview', 
	{ 
		title: 'Render', 
		id : req.params.guid,
		assetId : req.query.assetId,
		contactId : req.query.contactId,
		visitorId : req.query.visitorId,
	});
});
 
/*****************************************************************************
* Non Middleware Endpoints
****************************************************************************/
router.get('/', function (req, res) 
{
	res.send(service_document);
});
 
router.get('/service_document', function (req, res) 
{
	res.send(service_document);
});


module.exports = router;
