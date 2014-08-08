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
	var async   = require('async');
	var https = require('https');
	var querystring = require('querystring');

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
    app.route('/apps/components/create?').post(function (req, res) 
	{ 
		console.log('/apps/components/create/:guid');
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

	app.route('/apps/components/config?').get(function (req, res) 
	{ 
		console.log('/apps/components/config');

		res.send('<br><br><br><br> hello'+req.message); 
	});    

	app.route('/apps/components/delete?').delete(function (req, res) 
	{ 
		console.log('/apps/components/delete');

		res.send('<br><br>'+req.message); 
	});	

	app.route('/apps/components/notify?').post(function (req, res) 
	{ 
		console.log('/apps/components/notify');
		console.log(req.query.instance+ ' ');
		console.log(req.query.asset+ ' ');
		console.dir(req.body);


		res.status(204); 
		res.send();

		async.waterfall([
		    function(callback)
		    {
		    	var post_data = querystring.stringify(
		    	{
			  		'name': 'Bulk Import Example',
			  		'fields': 
			  		{
			  			'email': '{{Contact.Field(C_EmailAddress)}}'
			  		},
			  		'syncActions': 
			  		{
			  			'destination': '{{ActionInstance('+req.query.instance+')}}',
			  			'action': 'setStatus',
			  			'status': 'complete'
			  		},
			  		'identifierFieldName': 'email'
			  	});

		    	var options = 
	            {
	              	host: 'secure.eloqua.com',
	              	port: 443,
	              	path: '/api/bulk/2.0/contacts/imports',
	              	headers: 
	              	{
		          		'Content-Type': 'application/json',
		          		'Content-Length': post_data.length
		      		}
	            };

	           	var post_req = https.get(options, function(res) 
		            {
			            console.log('Got response: ' + res.statusCode);
			            res.on('data', function(chunk) 
			            {
			            	console.log('response: ' + chunk);

			            });
			            res.on('error', function(e) 
			            {
			            	console.log('Got error: ' + e.message);
			            	console.dir(e);
			            });
		        	});
			    post_req.write(post_data);
  				post_req.end();
			    callback(null, 'one', 'two');

		    },
		    function(arg1, arg2, callback){
		      // arg1 now equals 'one' and arg2 now equals 'two'
		        callback(null, 'three');
		    },
		    function(arg1, callback){
		        // arg1 now equals 'three'
		        callback(null, 'done');
		    }
		], function (err, result) 
		{
	   		// result now equals 'done'  
	   		console.error('async error');
	   		console.log(result);
	   		console.log(err);
		});


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
