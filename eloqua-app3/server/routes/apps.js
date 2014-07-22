'use strict';

module.exports = function(app) 
{
    // Home route
    var apps = require('../controllers/apps');
   // var db 				 = {};
//	var service_document = require('../lib/service_document');
//	var middle 	= require('../lib/route_db_middleware');
	var mongoose = require('mongoose');
	var EloquaApp = mongoose.model('EloquaApp');

    app.route('/apps').get(apps.render);


    app.route('/apps').get(function(req, res)
    {
		res.send('hello <br>');
    });

    // App

  	app.route('/apps/create/?').post(function (req, res) 
	{ 
		console.log('/apps/create/:InstanceId:AssetId:SiteName');
		console.log(req.query.instance+ ' '+ req.query.asset+ ' ' +req.query.site);

		var app_id = req.query.siteid+':'+req.query.installid;

		EloquaApp.findOne(
		{
            instanceid: app_id
        }, function(err, eapp) 
        {
        	if (err) 
        	{
                return err;
            }
            if (!eapp) 
            {
	            var app = new EloquaApp(
				{
					//name: 'app1',
					instanceid 	: app_id,
					site 		: req.query.site,
					site_id		: req.query.siteid,
					install_id	: req.query.installid
				});
				app.save(function(err)
		        {
		            if (err) console.log(err);
		            console.log('saved');
		        });
			}
        });


		res.send('<br><br>!!!'); 
	});  	

	app.route('/apps/status/').get(function (req, res) 
	{ 
		console.log('/apps/status');

		res.send('yes'); 
	});

	// Action Service
    app.route('/apps/components/create/:guid').post(function (req, res) 
	{ 
		console.log('/apps/components/create/:guid');

		res.send('<br><br>'+req.message); 
	});


    // Menu Service
	app.route('/apps/menu/callout/').post(function (req, res) 
	{ 
		console.log('/apps/menu/callout/');
		console.log(req.body.siteId);

		res.send('<br><br>'+req.message); 
	});


	// Decision Service
	app.route('/apps/menu/decide/create?').post(function (req, res) 
	{ 
		console.log('/apps/menu/decide/create/');
		console.log(req.query.instance+ ' ');

		var dto =
		    {
		       	'recordDefinition' :
		        {
		            'ContactID' : '{{Contact.Id}}',
		            'EmailAddress' : '{{Contact.Field(C_EmailAddress)}}'
		        }
		    };


		res.send(dto);
	});

	app.route('/apps/menu/decide/config?').post(function (req, res) 
	{ 
		console.log('/apps/menu/decide/config/');


		res.send('x');
	});

	app.route('/apps/menu/decide/delete?').post(function (req, res) 
	{ 
		console.log('/apps/menu/decide/delete/');

		res.send('x');
	});

/*	 
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
	 */
	/*****************************************************************************
	* Non Middleware Endpoints
	****************************************************************************/
	/*
	router.get('/', function (req, res) 
	{
		res.send(service_document);
	});
	 
	router.get('/service_document', function (req, res) 
	{
		res.send(service_document);
	});*/

};
