var express = require('express');
var async   = require('async');
var router  = express.Router();
var Eloqua  = require('eloqua-request');
var _ = require('underscore');
var config = require('../config');

var LiveChatApi = require('livechatapi').LiveChatApi;
var api = new LiveChatApi(config.liveChatUsername, config.liveChatPassword);
var eloqua = new Eloqua(config.eloquaCompany, config.eloquaUsername, config.eloquaPassword);
 
/*****************************************************************************
* Middleware Endpoints
****************************************************************************/

router.get('/v1/', function (req, res) 
{
	console.log("/v1/");
	api.visitors.list(function(visitor_data)
	{	
		console.log("api.visitors.list");
		if (visitor_data.length > 0)
		{
			getAdditonalData("mail@relatedpixels.com", visitor_data[0].id, function(data)
			{ 
				res.send(data);
			});
		}
		else
		{
			res.send("no visitors");
		}
	});	
});



function getAdditonalData(email, id, f_callback)
{
	console.log("getAdditonalData("+email+","+id+")")
	async.parallel(
	[
	    function(callback)
	    {  	
	    	if(email != "" && email != undefined)
	    	{
				eloqua.get('/API/REST/2.0/data/contacts?search='+email+'&count=1&page=1&depth=complete', function(err, response)
				{
					console.log("err:".err);
					console.log("response: %j", response);
					var eloquaData = {};
					if(response != null)
					{
						if(response["elements"][0])
						{
							var d = response["elements"][0];

							if(d["firstName"])
							{
								eloquaData["EQ FirstName"] = d["firstName"];
							}

							if(d["lastName"])
							{
								eloquaData["EQ LastName"] = d["lastName"];
							}

							if(d["businessPhone"])
							{
								eloquaData["EQ BusinessPhone"] = d["businessPhone"];
							}

							if(d["company"])
							{
								eloquaData["EQ Company"] = d["company"];
							}
						}
					}
			  		//res.send("hello xx"+response);
			  		callback(null, eloquaData);
				});
			}
			else
			{
				callback(null, {});
			}
	    },
	    function(callback)
	    {    
			//console.log(data);
			//console.log(data[0].id);
			getIPbyID(id, function(ip)
			{
				//ip = "216.104.22.130";
				//ip = "91.23.79.61";
				console.log("ip:"+ ip);
				getLeadenhancerData(ip, function(data)
				{
					console.log("lh data:"+data);
					var leadenhancerData = {};

					//leadenhancerData["a"] = "b";
					var d = data[0];
					if(d["name"])
					{
						leadenhancerData["LH Company"] = d["name"];
					}
					if(d["duns"])
					{
						leadenhancerData["LH Duns"] = d["duns"];
					}
					if(d["noofemployees"])
					{
						leadenhancerData["LH #Employees"] = d["noofemployees"];
					}
					if(d["sales"])
					{
						leadenhancerData["LH Sales"] = d["sales"];
					}

					if(d["address"])
					{
						var address = d["address"];
						if(address["city"])
						{
							leadenhancerData["LH City"] = address["city"];
						}

						if(address["region"])
						{
							leadenhancerData["LH Region"] = address["region"];
						}

						if(address["country"])
						{
							leadenhancerData["LH Country"] = address["country"];
						}
					}

					//console.log(data);
					//console.log("--->"+d[0]["name"]);

					//console.log(leadenhancerData);
					
					callback(null, leadenhancerData);
				});
			});
	    }
	],
	function(err, results)
	{
	    var target = {};
		_.extend(target, results[0], results[1]);
	    f_callback(target);
	});
}


function getLeadenhancerData(ip, callback)
{
	var http = require('http');

	//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
	var options = 
	{
	  host: 'openapi.leadenhancer.com',
	  path: '/v1/leadopenapi/organisations.json?ip='+ip+'&token='+config.leadEnhancerToken
	};

	mycallback = function(response) 
	{
	  var str = '';

	  //another chunk of data has been recieved, so append it to `str`
	  response.on('data', function (chunk) 
	  {
	    str += chunk;
	  });

	  //the whole response has been recieved, so we just print it out here
	  response.on('end', function () 
	  {
	  	callback(JSON.parse(str));
	   //console.log(str);
	  });
	}
	http.request(options, mycallback).end();
}
 
function getIPbyID(id, callback)
{
	var ip = "11";
	console.log("getIPbyID("+id+", &callback);");
	api.visitors.list( function(data)
	{
		console.log("current visitors #"+data.length);
		//console.log(data);
		//console.log(data[0].id);
		for(var i = 0; i < data.length; i++)
		{
			console.log(data[i].id + " "+data[i].name);
			if(data[i].id == id)
			{
				return callback(data[i].ip);
			}
		}

		return callback(0);
	});
}


router.post('/v1/webhooks', function(req, res)
{
	var event_type 	= req.body.event_type;  
  	var token 		= req.body.token;  
  	var license_id 	= req.body.license_id; 
  	var visitor_id 	= req.body.visitor.id; 
  	var visitor_email 	= req.body.visitor.email; 
  	console.log(req.body);

  	var output = "";
  	output += "event_type: "+event_type+" <br>";
  	output += "token: "+token+" <br>";
  	output += "license_id: "+license_id+" <br>";
  	output += "visitor_id: "+visitor_id+" <br>";

  	if(event_type == "chat_started")
  	{
	  	//getAdditonalData("mail@relatedpixels.com", visitor_id, function(data)
	  	getAdditonalData(visitor_email, visitor_id, function(data)
		{ 
			params = {};

			params["license_id"] = license_id;
			params["token"] = token;
			params["id"] = visitor_id;
			params["fields "] = data;
			console.log(params);
			api.visitors.addCustomVisitorDetails(visitor_id, params,function(response)
			{
				console.log(response);
				res.send(response);
			});		
		});
	}
});


module.exports = router;
