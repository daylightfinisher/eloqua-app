'use strict';

var _ = require('underscore');
var insertRecord, fetchRecord, updateRecord, deleteRecord;
 
insertRecord = function(db, req) 
{
	db[req.params.guid] = '{}';
	return 'We have inserted a record for the instance represented by the GUID: ' + req.params.guid;
};
 
fetchRecord = function(db, req) 
{
	return db[req.params.guid];
};
 
updateRecord = function(db, req) 
{
	db[req.params.guid] = JSON.stringify({config: _.extend(req.body, req.query)});
	return db[req.params.guid];
};
 
deleteRecord = function(db, req) 
{
	delete db[req.params.guid];
	return 'We have removed an instance for you using ' + req.params.guid + ' as the ID';
};
 
module.exports = 
{
	createInstance: function(db) 
	{ 
 		return function(req, res, next) 
 		{
      		if (!req.params.guid) 
      		{
      			return next(new Error('Failed to create an instance... No GUID Supplied'));
      		}

      		req.message = insertRecord(db, req);
      		next();
      	};	
	},
	configureInstance: function(db) 
	{ 
		return function(req, res, next) 
		{
	    	if (!req.params.guid) 
	    	{	
	    		return next(new Error('Failed to configure an instance... No GUID Supplied'));
	    	}

	    	req.message = updateRecord(db, req);
	      	next();
	  };
	},
	removeInstance: function(db) 
	{ 
		return function(req, res, next) 
		{
      		if (!req.params.guid)
      		{
      			return next(new Error('Failed to remove an instance... No GUID Supplied'));
      		}

      		req.message = deleteRecord(db, req);
      		next();
  		};
	},
	previewInstance: function(db) 
	{ 
		return function(req, res, next) 
		{
			console.log('previewInstance');
	      	if (!req.params.guid) 
	      	{	
	      		return next(new Error('Failed to preview an instance... No GUID Supplied'));
	      	}

	    	//var res = fetchRecord(db, req);
	    	//console.log(req);
	    	//console.log(res);
	    	//req.message = res.componentImage;
	    	next();
	  };
	},
	renderInstance: function(db) 
	{ 
		return function(req, res, next) 
		{
      		if (!req.params.guid) 
      		{
      			return next(new Error('Failed to render an instance... No GUID Supplied'));
      		}
/*
		    var res = fetchRecord(db, req), tmp = req.query;
		    if (res) 
		    {	
		    	var parsed = JSON.parse(res);
		    }

		    if (_.isEmpty(parsed))
		    {
		    	msg = _.extend(parsed, {config: req.query});
		    }

		    if (!_.isEmpty(parsed))
		    {
		    	msg = parsed;
		    }*/
		    var tmp = {};
		    tmp.comments = '';
		    req.message = {config: tmp};
    		next();
  		};
	}
};
